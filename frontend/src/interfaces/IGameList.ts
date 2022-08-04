import { HIDDEN_CARDS_MODE } from "../../../backend/interfaces/IGameOptions";
import { RULES } from "./IGameOptions";

export interface IRules {
  ruleList: RULES[],
  hiddenCardsMode: HIDDEN_CARDS_MODE,
}

export interface IGameListItem {
  id: string,
  rules: IRules,
  humanPlayers: string[],
  imInTheGame: boolean,
}

export interface IGetGameListRequest {
  myId: string,
}

export interface IGetGameListResponse {
  games: IGameListItem[],
}
