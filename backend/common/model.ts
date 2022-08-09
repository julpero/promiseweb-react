import { IGameOptions, IHumanPlayer } from "../interfaces/IGameOptions";
import { RULES } from "../../frontend/src/interfaces/IGameOptions";

export const playersToArr = (players: IHumanPlayer[]): string[] => {
  const playerArr: string[] = players.map(player => player.name);

  return playerArr;
};

export const rulesToArr = (gameOptions: IGameOptions): RULES[] => {
  const rulesArr: RULES[] = [];

  if (!gameOptions.evenPromisesAllowed) rulesArr.push(RULES.noEvenPromisesAllowed);
  if (!gameOptions.visiblePromiseRound) rulesArr.push(RULES.hiddenPromiseRound);
  if (gameOptions.onlyTotalPromise) rulesArr.push(RULES.onlyTotalPromise);
  if (!gameOptions.freeTrump) rulesArr.push(RULES.mustPlayTrump);
  if (gameOptions.hiddenTrump) rulesArr.push(RULES.hiddenTrump);
  if (gameOptions.speedPromise) rulesArr.push(RULES.speedPromise);
  if (gameOptions.privateSpeedGame) rulesArr.push(RULES.privateSpeedGame);
  if (gameOptions.opponentPromiseCardValue) rulesArr.push(RULES.opponentPromiseCardValue);
  if (gameOptions.opponentGameCardValue) rulesArr.push(RULES.opponentGameCardValue);

  return rulesArr;
};

/*
export const rulesToArr = (gameOptions: IGameOptions): string[] => {
  const rulesArr: string[] = [];
  if (!gameOptions.evenPromisesAllowed) rulesArr.push("No even promises");
  if (!gameOptions.visiblePromiseRound) rulesArr.push("Hidden promise round");
  if (gameOptions.onlyTotalPromise) rulesArr.push("Show only total promise");
  if (!gameOptions.freeTrump) rulesArr.push("Must play trump");
  if (gameOptions.hiddenTrump) rulesArr.push("Hidden trump when promising");
  if (gameOptions.speedPromise) rulesArr.push("Speed promise round");
  if (gameOptions.privateSpeedGame) rulesArr.push("Speed game");
  if (gameOptions.opponentPromiseCardValue) rulesArr.push("Hand");

  return rulesArr;
}
*/
