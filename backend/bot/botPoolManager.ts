import Piscina from "piscina";
import path from "path";
import {
  IuiGetRoundResponse,
  IuiPlayCardRequest,
} from "../../frontend/src/interfaces/IuiPlayingGame";

export class BotPoolManager {
  private pool: Piscina;

  constructor() {
    this.pool = new Piscina({
      // Point to the compiled JS file in production
      filename: path.resolve(__dirname, "botWorker.js"),
      // Automatically scales to the number of CPU cores
      minThreads: 2,
      maxThreads: 4
    });
  }

  public async getBotMove(state: IuiGetRoundResponse): Promise<IuiPlayCardRequest> {
    try {
      // Offload task to the next available worker in the pool
      const result: IuiPlayCardRequest = await this.pool.run(state);
      return result;
    } catch (err) {
      console.error("Worker Pool Error:", err);
      // Fallback logic if the worker fails
      return null as unknown as IuiPlayCardRequest;
    }
  }
}

// Export a singleton instance
export const botPool = new BotPoolManager();
