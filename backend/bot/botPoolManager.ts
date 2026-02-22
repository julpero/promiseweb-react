import Piscina from "piscina";
import path from "path";
import { IBotCardPlay, IBotCardPlayResponse, IBotPromise, IBotPromiseResponse, IBotTask } from "../interfaces/IBot";
import io from "socket.io-client";
import { IuiMakePromiseRequest } from "../../frontend/src/interfaces/IuiPlayingGame";

const isDevelopment = process.env.NODE_ENV === "development";
console.log(process.env.NODE_ENV);
console.log("BotPoolManager is running in", isDevelopment ? "development" : "production", "mode");
// In production, __dirname is 'dist/bot'.
// We want to point to 'botWorker.js' in that same folder.
const workerFileName = path.resolve(
  __dirname,
  "worker-loader.js"
);

const socket = io(process.env.SOCKET_SERVER_URL || "http://localhost:5000", {
  reconnection: true,
});

export class BotPoolManager {
  private pool: Piscina;

  constructor() {
    this.pool = new Piscina({
      // Point to the compiled JS file in production
      filename: workerFileName,
      // Automatically scales to the number of CPU cores
      minThreads: 2,
      maxThreads: 4,
      env: process.env,
    });
  }

  public async getBotPromise(botPromise: IBotPromise): Promise<void> {
    try {
      // Offload task to the next available worker in the pool
      console.log("Submitting bot promise task to worker pool with game state:", botPromise.game);
      const botTask = { task: "promise", botPromise } as IBotTask;
      const result: IBotPromiseResponse = await this.pool.run(botTask);
      console.log("Bot promise result from worker pool:", result);
      socket.emit("make bot promise", {
        promise: result.promise,
        gameId: botPromise.gameId,
        roundInd: 0,
        isSpeedPromise: false,
        userName: botPromise.botName,
        uuid: "",
      } as IuiMakePromiseRequest );
      return;
    } catch (err) {
      console.error("Worker Pool Error:", err);
      // Fallback logic if the worker fails
      return;
    }
  }

  public async getBotCardPlay(botCardPlay: IBotCardPlay): Promise<void> {
    try {
      // Offload task to the next available worker in the pool
      console.log("Submitting bot card play task to worker pool with game state:", botCardPlay.game);
      const botTask = { task: "play", botCardPlay } as IBotTask;
      const result: IBotCardPlayResponse = await this.pool.run(botTask);
      console.log("Bot card play result from worker pool:", result);
      return;
    } catch (err) {
      console.error("Worker Pool Error:", err);
      // Fallback logic if the worker fails
      return;
    }
  }
}

// Export a singleton instance
export const botPool = new BotPoolManager();
