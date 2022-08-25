import { Suite } from "card-games-typescript";
import { winnerOfPlay } from "../backend/common/common";
import { ICard, ICardPlayed, IPlayer } from "../backend/interfaces/IGameOptions";

describe("testing winner of play", () => {
  test("testing hands with one hit", () => {
    const trumpSuite: Suite = "hearts";
    const playedCards: ICardPlayed[] = [
      {
        playerId: "player-1",
        name: "player1",
        card: {
          suite: "hearts",
          value: 5,
          rank: "5",
        } as ICard,
        playedTime: 0,
        playStarted: 1,
      } as ICardPlayed
    ];
    const expectedWinner = {
      playerId: "player-1",
      name: "player1",
    } as IPlayer;
    expect(winnerOfPlay(playedCards, trumpSuite)).toStrictEqual(expectedWinner);
  });

  test("testing hands with two hit", () => {
    const trumpSuite = "hearts";
    const playedCards: ICardPlayed[] = [
      {
        playerId: "player-1",
        name: "player1",
        card: {
          suite: "spades",
          value: 10,
          rank: "10",
        },
        playedTime: 0,
        playStarted: 1,
      },
      {
        playerId: "player-2",
        name: "player2",
        card: {
          suite: "hearts",
          value: 5,
          rank: "5",
        },
        playedTime: 0,
        playStarted: 1,
      },
    ];
    const expectedWinner = {
      playerId: "player-2",
      name: "player2",
    };
    expect(winnerOfPlay(playedCards, trumpSuite)).toStrictEqual(expectedWinner);
  });

  test("testing hands with hits without trump", () => {
    const trumpSuite = "hearts";
    const playedCards: ICardPlayed[] = [
      {
        playerId: "player-1",
        name: "player1",
        card: {
          suite: "spades",
          value: 4,
          rank: "4",
        },
        playedTime: 0,
        playStarted: 1,
      },
      {
        playerId: "player-2",
        name: "player2",
        card: {
          suite: "spades",
          value: 5,
          rank: "5",
        },
        playedTime: 0,
        playStarted: 1,
      },
      {
        playerId: "player-3",
        name: "player3",
        card: {
          suite: "spades",
          value: 3,
          rank: "3",
        },
        playedTime: 0,
        playStarted: 1,
      },
    ];
    const expectedWinner = {
      playerId: "player-2",
      name: "player2",
    };
    expect(winnerOfPlay(playedCards, trumpSuite)).toStrictEqual(expectedWinner);
  });

  test("testing hands with hits without trump 2", () => {
    const trumpSuite = "hearts";
    const playedCards: ICardPlayed[] = [
      {
        playerId: "player-1",
        name: "player1",
        card: {
          suite: "spades",
          value: 4,
          rank: "4",
        },
        playedTime: 0,
        playStarted: 1,
      },
      {
        playerId: "player-2",
        name: "player2",
        card: {
          suite: "spades",
          value: 5,
          rank: "5",
        },
        playedTime: 0,
        playStarted: 1,
      },
      {
        playerId: "player-3",
        name: "player3",
        card: {
          suite: "diamonds",
          value: 13,
          rank: "K",
        },
        playedTime: 0,
        playStarted: 1,
      },
    ];
    const expectedWinner = {
      playerId: "player-2",
      name: "player2",
    };
    expect(winnerOfPlay(playedCards, trumpSuite)).toStrictEqual(expectedWinner);
  });

  test("testing hands with hits with highest trump", () => {
    const trumpSuite = "hearts";
    const playedCards: ICardPlayed[] = [
      {
        playerId: "player-1",
        name: "player1",
        card: {
          suite: "spades",
          value: 4,
          rank: "4",
        },
        playedTime: 0,
        playStarted: 1,
      },
      {
        playerId: "player-2",
        name: "player2",
        card: {
          suite: "hearts",
          value: 5,
          rank: "5",
        },
        playedTime: 0,
        playStarted: 1,
      },
      {
        playerId: "player-3",
        name: "player3",
        card: {
          suite: "spades",
          value: 13,
          rank: "K",
        },
        playedTime: 0,
        playStarted: 1,
      },
      {
        playerId: "player-4",
        name: "player4",
        card: {
          suite: "hearts",
          value: 13,
          rank: "K",
        },
        playedTime: 0,
        playStarted: 1,
      },
      {
        playerId: "player-5",
        name: "player5",
        card: {
          suite: "spades",
          value: 14,
          rank: "A",
        },
        playedTime: 0,
        playStarted: 1,
      },
    ];
    const expectedWinner = {
      playerId: "player-4",
      name: "player4",
    };
    expect(winnerOfPlay(playedCards, trumpSuite)).toStrictEqual(expectedWinner);
  });
});
