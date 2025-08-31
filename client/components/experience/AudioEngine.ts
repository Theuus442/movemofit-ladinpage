export type Phase = "idle" | "awakening" | "rhythm";

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain!: GainNode;
  private analyser!: AnalyserNode;
  private beatIntervalId: number | null = null;
  private tempoBPM = 46; // initial heartbeat tempo
  private phase: Phase = "idle";
  private melodyIntervalId: number | null = null;

  private createContext() {
    if (this.ctx) return;
    // Safari uses webkit prefix
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    this.ctx = new Ctx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.8;

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 1024;
    this.analyser.smoothingTimeConstant = 0.85;

    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  async resume() {
    this.createContext();
    if (!this.ctx) return;
    if (this.ctx.state !== "running") await this.ctx.resume();
  }

  getAnalyser() {
    this.createContext();
    return this.analyser;
  }

  setPhase(next: Phase) {
    if (this.phase === next) return;
    this.phase = next;
  }

  startHeartbeat() {
    this.createContext();
    if (!this.ctx) return;
    this.stopAll();
    this.phase = "idle";
    this.scheduleHeartbeat();
  }

  boostHeartbeat(durationMs = 2000) {
    // Temporarily increase tempo for awakening
    const original = this.tempoBPM;
    this.tempoBPM = Math.min(110, original * 2.2);
    window.setTimeout(() => {
      this.tempoBPM = 120; // transition to rhythm tempo baseline
      this.phase = "rhythm";
      this.startRhythmLayer();
    }, durationMs);
  }

  private scheduleHeartbeat() {
    if (!this.ctx) return;
    const schedule = () => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const secPerBeat = 60 / this.tempoBPM;
      // Lub-dub: two close kicks
      this.kick(now);
      this.kick(now + 0.22);
      const next = secPerBeat;
      this.beatIntervalId = window.setTimeout(schedule, next * 1000) as unknown as number;
    };
    schedule();
  }

  private startRhythmLayer() {
    if (!this.ctx) return;
    // Simple melodic arpeggio with lowpass filter to feel deep/techno
    const baseFreq = 110; // A2
    const scale = [0, 3, 5, 7, 10, 12, 15];
    const lpf = this.ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.value = 1200;
    lpf.Q.value = 0.8;
    const osc = this.ctx.createOscillator();
    osc.type = "sawtooth";
    const oscGain = this.ctx.createGain();
    oscGain.gain.value = 0.0;
    osc.connect(oscGain).connect(lpf).connect(this.masterGain);
    osc.start();

    let step = 0;
    const scheduleMelody = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const note = scale[step % scale.length];
      const freq = baseFreq * Math.pow(2, note / 12);
      try {
        // Some browsers throw on exponential with 0
        osc.frequency.cancelScheduledValues(t);
        osc.frequency.setValueAtTime(Math.max(1, freq), t);
      } catch {}
      const g = oscGain.gain;
      g.cancelScheduledValues(t);
      g.setValueAtTime(0.0, t);
      g.linearRampToValueAtTime(0.08, t + 0.02);
      g.linearRampToValueAtTime(0.0, t + 0.3);
      step++;
    };

    const intervalMs = 300; // ~1/8 notes at 100-120 bpm
    this.melodyIntervalId = window.setInterval(scheduleMelody, intervalMs) as unknown as number;
  }

  private kick(time: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -24;
    comp.knee.value = 30;
    comp.ratio.value = 12;
    comp.attack.value = 0.003;
    comp.release.value = 0.25;

    osc.type = "sine";
    osc.frequency.setValueAtTime(160, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);

    gain.gain.setValueAtTime(1, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.13);

    osc.connect(gain).connect(comp).connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.14);
  }

  getLevel(): number {
    this.createContext();
    const analyser = this.analyser;
    if (!analyser) return 0;
    const arr = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(arr);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      const v = (arr[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / arr.length);
    return Math.min(1, rms * 2.5);
  }

  fadeOutAndStop(duration = 0.8) {
    if (!this.ctx) return Promise.resolve();
    const ctx = this.ctx;
    const g = this.masterGain.gain;
    const now = ctx.currentTime;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.exponentialRampToValueAtTime(0.0001, now + duration);
    return new Promise<void>((resolve) => {
      window.setTimeout(() => {
        this.stopAll();
        resolve();
      }, duration * 1000 + 50);
    });
  }

  stopAll() {
    if (this.beatIntervalId) window.clearTimeout(this.beatIntervalId);
    if (this.melodyIntervalId) window.clearInterval(this.melodyIntervalId);
    this.beatIntervalId = null;
    this.melodyIntervalId = null;
  }
}
