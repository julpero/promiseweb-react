import Piscina from "piscina";
import path from "path";
import { IBotCardPlay, IBotCardPlayResponse, IBotMakePromiseRequest, IBotPlayCardRequest, IBotPromise, IBotPromiseResponse, IBotTask } from "../interfaces/IBot";
import io from "socket.io-client";
import { roundToPlayer } from "../actions/playingGame";
import { IGameOptions } from "../interfaces/IGameOptions";

// In production, __dirname is 'dist/bot'.
// We want to point to 'botWorker.js' in that same folder.
const workerFileName = path.resolve(
  __dirname,
  "worker-loader.js"
);

const socketEndpoint = process.env.SOCKET_SERVER_URL || "http://localhost:5000";
console.log("Connecting bot worker to socket server at:", socketEndpoint);
const socket = io(socketEndpoint, {
  reconnection: true,
});
console.log("Bot worker socket connection status:", socket.connected ? "connected" : "not connected");

const simulateThinkingTimePromise = 1500;
const simulateThinkingTimeCard = 4000;

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
    console.log("Submitting bot promise task to worker pool with game state...");

    try {
      // Offload task to the next available worker in the pool
      const botTask = { task: "promise", botPromise } as IBotTask;
      const result: IBotPromiseResponse = await this.pool.run(botTask);
      console.log("Bot promise result from worker pool:", result);
      const thisTimeOut = result.success ? simulateThinkingTimePromise / 8 : simulateThinkingTimePromise; // If the bot failed to get a good promise, respond faster with fallback logic
      setTimeout(() => {
        socket.emit("make bot promise", {
          promise: result.promise,
          gameId: botPromise.gameId,
          roundInd: botPromise.roundInd,
          isSpeedPromise: false,
          userName: botPromise.botName,
          uuid: "",
          promiseLogic: result.promiseLogic,
          promiseChatMessage: result.promiseChatMessage,
        } as IBotMakePromiseRequest);
      }, thisTimeOut); // Simulate thinking time
      return;
    } catch (err) {
      console.error("Worker Pool Error:", err);
      // Fallback logic if the worker fails
      setTimeout(() => {
        socket.emit("make bot promise", {
          // random promise between 0 and count of cards in this round for this bot
          promise: Math.floor(Math.random() * ((botPromise.game as IGameOptions).game.rounds[botPromise.roundInd].cardsInRound + 1)),
          gameId: botPromise.gameId,
          roundInd: botPromise.roundInd,
          isSpeedPromise: false,
          userName: botPromise.botName,
          uuid: "",
          promiseLogic: "Fallback logic",
          promiseChatMessage: "Sorry, I had a brain fart and promised a random number!",
        } as IBotMakePromiseRequest);
      }, simulateThinkingTimePromise); // Simulate thinking time
      return;
    }
  }

  public async getBotCardPlay(botCardPlay: IBotCardPlay): Promise<void> {
    console.log("Submitting bot card play task to worker pool...");
    const myRound = roundToPlayer(botCardPlay.game as IGameOptions, botCardPlay.roundInd, botCardPlay.botName || "unknown_bot");

    try {
      // Offload task to the next available worker in the pool
      const botTask = { task: "play", botCardPlay } as IBotTask;
      const result: IBotCardPlayResponse = await this.pool.run(botTask);
      console.log("Bot card play result from worker pool:", result);
      const thisTimeOut = result.success ? simulateThinkingTimeCard / 8 : simulateThinkingTimeCard; // If the bot failed to get a good card, respond faster with fallback logic
      setTimeout(() => {
        socket.emit("play bot card", {
          gameId: botCardPlay.gameId,
          card: result.card,
          roundInd: botCardPlay.roundInd,
          userName: botCardPlay.botName,
          uuid: "",
          isSpeedPlay: false,
          cardPlayLogic: result.cardLogic,
          cardPlayChatMessage: result.cardChatMessage,
        } as IBotPlayCardRequest);
      }, thisTimeOut); // Simulate thinking time
      return;
    } catch (err) {
      console.error("Worker Pool Error:", err);
      // Fallback logic if the worker fails
      const randomCard = myRound.playableCards.length > 0 ? myRound.myCards[myRound.playableCards[Math.floor(Math.random() * myRound.playableCards.length)]] : null;
      setTimeout(() => {
        socket.emit("play bot card", {
          gameId: botCardPlay.gameId,
          card: randomCard,
          roundInd: botCardPlay.roundInd,
          userName: botCardPlay.botName,
          uuid: "",
          isSpeedPlay: false,
          cardPlayLogic: "Fallback logic",
          cardPlayChatMessage: "Sorry, I had a brain fart and played a random card!",
        } as IBotPlayCardRequest);
      }, simulateThinkingTimeCard); // Simulate thinking time
      return;
    }
  }
}

// Export a singleton instance
export const botPool = new BotPoolManager();
