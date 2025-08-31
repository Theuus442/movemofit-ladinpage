import serverless from "serverless-http";
import { createServer } from "../server";

// Wrap our Express app into a Vercel serverless function
const app = createServer();
export default serverless(app);
