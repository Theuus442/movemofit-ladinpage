export type ThemeKey = "forca" | "resistencia" | "equilibrio";

export class AudioOrchestrator {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private analyser!: AnalyserNode;

  // layers
  private ambientNoise!: AudioBufferSourceNode;
  private ambientGain!: GainNode;
  private bassOsc!: OscillatorNode;
  private bassGain!: GainNode;
  private lpf!: BiquadFilterNode;
  private heartbeatTimer: number | null = null;

  private sfxGain!: GainNode;
  private currentTheme: ThemeKey = "forca";

  private ensure() {
    if (this.ctx) return;
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    this.ctx = new Ctx();

    this.master = this.ctx.createGain();
    this.master.gain.value = 0.9;

    this.lpf = this.ctx.createBiquadFilter();
    this.lpf.type = "lowpass";
    this.lpf.frequency.value = 16000;

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.85;

    this.master.connect(this.lpf).connect(this.analyser).connect(this.ctx.destination);

    // SFX bus
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.35;
    this.sfxGain.connect(this.master);
  }

  async start() {
    this.ensure();
    if (!this.ctx) return;
    if (this.ctx.state !== "running") await this.ctx.resume();
    this.setupAmbient();
    this.setupBass();
    this.restartHeartbeat(52);
  }

  private setupAmbient() {
    if (!this.ctx) return;
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 2, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.6; // noise
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 420;
    filter.Q.value = 0.9;

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.value = 0.08;

    noise.connect(filter).connect(this.ambientGain).connect(this.master);
    noise.start();
    this.ambientNoise = noise;
  }

  private setupBass() {
    if (!this.ctx) return;
    this.bassOsc = this.ctx.createOscillator();
    this.bassOsc.type = "sawtooth";
    this.bassOsc.frequency.value = 55; // A1
    this.bassGain = this.ctx.createGain();
    this.bassGain.gain.value = 0.0;
    const lpf = this.ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.value = 350;

    this.bassOsc.connect(lpf).connect(this.bassGain).connect(this.master);
    this.bassOsc.start();
  }

  private restartHeartbeat(bpm: number) {
    if (!this.ctx) return;
    if (this.heartbeatTimer) window.clearTimeout(this.heartbeatTimer);
    const schedule = () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      this.kick(t);
      this.kick(t + 0.22);
      const next = 60 / bpm;
      this.heartbeatTimer = window.setTimeout(schedule, next * 1000) as unknown as number;
    };
    schedule();
  }

  private kick(time: number) {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(160, time);
    o.frequency.exponentialRampToValueAtTime(55, time + 0.12);
    g.gain.setValueAtTime(0.9, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.13);
    o.connect(g).connect(this.master);
    o.start(time);
    o.stop(time + 0.14);
  }

  setTheme(theme: ThemeKey) {
    this.currentTheme = theme;
    // adjust tonal/tempo characteristics
    if (!this.ctx) return;
    if (theme === "forca") {
      this.bassGain.gain.value = Math.max(this.bassGain.gain.value, 0.25);
      this.lpf.frequency.value = 12000;
      this.restartHeartbeat(60);
    } else if (theme === "resistencia") {
      this.bassGain.gain.value = 0.18;
      this.lpf.frequency.value = 14000;
      this.restartHeartbeat(100);
    } else {
      // equilibrio: airy
      this.bassGain.gain.value = 0.1;
      this.lpf.frequency.value = 16000;
      this.restartHeartbeat(72);
    }
  }

  setProgress(p: number) {
    if (!this.ctx) return;
    const pp = Number.isFinite(p) ? Math.min(1, Math.max(0, p)) : 0;
    if (!this.ambientGain || !this.bassGain || !this.lpf) return;
    this.ambientGain.gain.value = 0.12 - 0.06 * pp;
    const base = this.currentTheme === "forca" ? 0.22 : this.currentTheme === "resistencia" ? 0.16 : 0.1;
    this.bassGain.gain.value = Math.min(base + pp * 0.35, 0.5);
    this.lpf.frequency.value = 5000 + pp * 11000;
  }

  playHover() {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "triangle";
    o.frequency.value = 520;
    g.gain.value = 0.0;
    o.connect(g).connect(this.sfxGain);
    o.start();
    const t = this.ctx.currentTime;
    g.gain.linearRampToValueAtTime(0.25, t + 0.02);
    o.frequency.exponentialRampToValueAtTime(820, t + 0.15);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    o.stop(t + 0.22);
  }

  playClick() {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "square";
    o.frequency.value = 320;
    o.connect(g).connect(this.sfxGain);
    const t = this.ctx.currentTime;
    g.gain.setValueAtTime(0.35, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    o.start(t);
    o.stop(t + 0.13);
  }

  swell() {
    if (!this.ctx) return;
    const g = this.master.gain;
    const now = this.ctx.currentTime;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(1.1, now + 0.12);
    g.exponentialRampToValueAtTime(0.9, now + 0.6);
  }

  level(): number {
    if (!this.analyser) return 0;
    const arr = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(arr);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) sum += arr[i];
    return sum / (arr.length * 255);
  }
}
