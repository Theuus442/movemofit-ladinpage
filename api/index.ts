import { createServer } from "../server";

const app = createServer();

export default function handler(req: unknown, res: unknown) {
  return (app as any)(req as any, res as any);
}
