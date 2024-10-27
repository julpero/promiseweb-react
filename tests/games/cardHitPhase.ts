import { IGameOptions } from "../../backend/interfaces/IGameOptions";
export const firstRoundFirstPlayer: IGameOptions = {
  "humanPlayersCount": 3,
  "botPlayersCount": 0,
  "startRound": 6,
  "turnRound": 5,
  "endRound": 6,
  "adminName": "Eka",
  "password": "",
  "gameStatus": 1,
  "humanPlayers": [
    {
      "name": "Eka",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": []
      },
    },
    {
      "name": "Vika",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": []
      },
    },
    {
      "name": "Toka",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": []
      },
    }
  ],
  "createDateTime": new Date("2022-09-27T05:27:19.345+00:00"),
  "evenPromisesAllowed": false,
  "visiblePromiseRound": false,
  "onlyTotalPromise": false,
  "freeTrump": true,
  "hiddenTrump": false,
  "speedPromise": false,
  "privateSpeedGame": false,
  "opponentPromiseCardValue": false,
  "opponentGameCardValue": false,
  "thisIsDemoGame": true,
  "hiddenCardsMode": 0,
  "bonusNonEvenPromise": false,
  "rePromise": false,
  "hiddenRePromise": false,
  "game": {
    "playerOrder": [
      {
        "name": "Eka",
        "type": "human",
      },
      {
        "name": "Vika",
        "type": "human",
      },
      {
        "name": "Toka",
        "type": "human",
      }
    ],
    "rounds": [
      {
        "roundIndex": 0,
        "cardsInRound": 6,
        "dealerPositionIndex": 0,
        "starterPositionIndex": 1,
        "roundPlayers": [
          {
            "name": "Eka",
            "cards": [
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "promise": 1,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": 1664262214066,
            "promiseMade": 1664262743053,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Vika",
            "cards": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "promise": 2,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": 1664256450988,
            "promiseMade": 1664262189283,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Toka",
            "cards": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              }
            ],
            "promise": 2,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": 1664262191683,
            "promiseMade": 1664262211666,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "clubs",
          "value": 14,
          "rank": "A",
        },
        "totalRePromise": null, "totalPromise": 5,
        "cardsPlayed": [
          []
        ],
        "roundStatus": 1,
      },
      {
        "roundIndex": 1,
        "cardsInRound": 5,
        "dealerPositionIndex": 1,
        "starterPositionIndex": 2,
        "roundPlayers": [
          {
            "name": "Eka",
            "cards": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Vika",
            "cards": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Toka",
            "cards": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "hearts",
          "value": 6,
          "rank": "6",
        },
        "totalRePromise": null, "totalPromise": null,
        "cardsPlayed": [
          []
        ],
        "roundStatus": 0,
      },
      {
        "roundIndex": 2,
        "cardsInRound": 6,
        "dealerPositionIndex": 2,
        "starterPositionIndex": 0,
        "roundPlayers": [
          {
            "name": "Eka",
            "cards": [
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Vika",
            "cards": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Toka",
            "cards": [
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "clubs",
          "value": 6,
          "rank": "6",
        },
        "totalRePromise": null, "totalPromise": null,
        "cardsPlayed": [
          []
        ],
        "roundStatus": 0,
      }
    ],
    "lastTimeStamp": 1664262743053,
  },
  "gameStarted": new Date("2022-09-27T05:27:28.588+00:00"),
};

export const firstRoundSecondPlayer: IGameOptions = {
  "humanPlayersCount": 3,
  "botPlayersCount": 0,
  "startRound": 6,
  "turnRound": 5,
  "endRound": 6,
  "adminName": "Eka",
  "password": "",
  "gameStatus": 1,
  "humanPlayers": [
    {
      "name": "Eka",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": []
      },
    },
    {
      "name": "Vika",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": []
      },
    },
    {
      "name": "Toka",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": []
      },
    }
  ],
  "createDateTime": new Date("2022-09-27T05:27:19.345+00:00"),
  "evenPromisesAllowed": false,
  "visiblePromiseRound": false,
  "onlyTotalPromise": false,
  "freeTrump": true,
  "hiddenTrump": false,
  "speedPromise": false,
  "privateSpeedGame": false,
  "opponentPromiseCardValue": false,
  "opponentGameCardValue": false,
  "thisIsDemoGame": true,
  "hiddenCardsMode": 0,
  "bonusNonEvenPromise": false,
  "rePromise": false,
  "hiddenRePromise": false,
  "game": {
    "playerOrder": [
      {
        "name": "Eka",
        "type": "human",
      },
      {
        "name": "Vika",
        "type": "human",
      },
      {
        "name": "Toka",
        "type": "human",
      }
    ],
    "rounds": [
      {
        "roundIndex": 0,
        "cardsInRound": 6,
        "dealerPositionIndex": 0,
        "starterPositionIndex": 1,
        "roundPlayers": [
          {
            "name": "Eka",
            "cards": [
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "promise": 1,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": 1664262214066,
            "promiseMade": 1664262743053,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Vika",
            "cards": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "promise": 2,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": 1664256450988,
            "promiseMade": 1664262189283,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Toka",
            "cards": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              }
            ],
            "promise": 2,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": 1664262191683,
            "promiseMade": 1664262211666,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "clubs",
          "value": 14,
          "rank": "A",
        },
        "totalRePromise": null, "totalPromise": 5,
        "cardsPlayed": [
          [
            {
              "name": "Vika",
              "card": {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664264442688,
              "playStarted": 1664262743053,
            }
          ]
        ],
        "roundStatus": 1,
      },
      {
        "roundIndex": 1,
        "cardsInRound": 5,
        "dealerPositionIndex": 1,
        "starterPositionIndex": 2,
        "roundPlayers": [
          {
            "name": "Eka",
            "cards": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Vika",
            "cards": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Toka",
            "cards": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "hearts",
          "value": 6,
          "rank": "6",
        },
        "totalRePromise": null, "totalPromise": null,
        "cardsPlayed": [
          []
        ],
        "roundStatus": 0,
      },
      {
        "roundIndex": 2,
        "cardsInRound": 6,
        "dealerPositionIndex": 2,
        "starterPositionIndex": 0,
        "roundPlayers": [
          {
            "name": "Eka",
            "cards": [
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Vika",
            "cards": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Toka",
            "cards": [
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "clubs",
          "value": 6,
          "rank": "6",
        },
        "totalRePromise": null, "totalPromise": null,
        "cardsPlayed": [
          []
        ],
        "roundStatus": 0,
      }
    ],
    "lastTimeStamp": 1664264442688,
  },
  "gameStarted": new Date("2022-09-27T05:27:28.588+00:00"),
  "gameStatistics": {
    "generated": 1664264442694,
    "playersStatistics": [
      {
        "playerName": "Eka",
        "totalPoints": 0,
        "totalKeeps": 0,
        "bigPointsByZero": 0,
        "bigZeroKeepPromisesCount": 0,
        "bigZeroFailPromisesCount": 0,
        "smallPointsNotZero": 0,
        "smallNotZeroKeepPromisesCount": 0,
        "smallNotZeroFailPromisesCount": 0,
        "totalPointsBig": 0,
        "totalPointsSmall": 0,
        "totalKeepsBig": 0,
        "totalKeepsSmall": 0,
        "pointsPerKeeps": 0,
        "position": 1,
        "scorePoints": 0.6666666666666666,
        "trumpsInGame": 5,
        "bigsCardsInGame": 5,
        "smallCardsInGame": 3,
        "otherCardsInGame": 4,
        "playTime": 0,
        "promiseTime": 528987,
        "pointsPerRound": [
          0,
          0,
          0
        ],
        "evenBreakingPointsPerRound": [
          0,
          0,
          0
        ],
        "cumulativePointsPerRound": [
          0,
          0,
          0
        ],
      },
      {
        "playerName": "Toka",
        "totalPoints": 0,
        "totalKeeps": 0,
        "bigPointsByZero": 0,
        "bigZeroKeepPromisesCount": 0,
        "bigZeroFailPromisesCount": 0,
        "smallPointsNotZero": 0,
        "smallNotZeroKeepPromisesCount": 0,
        "smallNotZeroFailPromisesCount": 0,
        "totalPointsBig": 0,
        "totalPointsSmall": 0,
        "totalKeepsBig": 0,
        "totalKeepsSmall": 0,
        "pointsPerKeeps": 0,
        "position": 2,
        "scorePoints": 0.3333333333333333,
        "trumpsInGame": 3,
        "bigsCardsInGame": 3,
        "smallCardsInGame": 3,
        "otherCardsInGame": 8,
        "playTime": 0,
        "promiseTime": 19983,
        "pointsPerRound": [
          0,
          0,
          0
        ],
        "evenBreakingPointsPerRound": [
          0,
          0,
          0
        ],
        "cumulativePointsPerRound": [
          0,
          0,
          0
        ],
      },
      {
        "playerName": "Vika",
        "totalPoints": 0,
        "totalKeeps": 0,
        "bigPointsByZero": 0,
        "bigZeroKeepPromisesCount": 0,
        "bigZeroFailPromisesCount": 0,
        "smallPointsNotZero": 0,
        "smallNotZeroKeepPromisesCount": 0,
        "smallNotZeroFailPromisesCount": 0,
        "totalPointsBig": 0,
        "totalPointsSmall": 0,
        "totalKeepsBig": 0,
        "totalKeepsSmall": 0,
        "pointsPerKeeps": 0,
        "position": 3,
        "scorePoints": 0,
        "trumpsInGame": 7,
        "bigsCardsInGame": 2,
        "smallCardsInGame": 5,
        "otherCardsInGame": 3,
        "playTime": 1699635,
        "promiseTime": 5738295,
        "pointsPerRound": [
          0,
          0,
          0
        ],
        "evenBreakingPointsPerRound": [
          0,
          0,
          0
        ],
        "cumulativePointsPerRound": [
          0,
          0,
          0
        ],
      }
    ],
    "winnerName": "",
    "winnerPoints": 0,
    "roundsPlayed": 0,
    "bigRoundsPlayed": 0,
    "smallRoundsPlayed": 0,
    "cardsHit": 1,
    "spurtAndMelt": {
      "spurtGap": null,
      "spurtFrom": null,
      "meltGap": null,
      "meltFrom": null,
      "melter": null,
    },
  }
};

export const firstRoundSecondHitFirstPlayer: IGameOptions = {
  "humanPlayersCount": 3,
  "botPlayersCount": 0,
  "startRound": 6,
  "turnRound": 5,
  "endRound": 6,
  "adminName": "Eka",
  "password": "",
  "gameStatus": 1,
  "humanPlayers": [
    {
      "name": "Eka",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": []
      },
    },
    {
      "name": "Vika",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": []
      },
    },
    {
      "name": "Toka",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": []
      },
    }
  ],
  "createDateTime": new Date("2022-09-27T05:27:19.345+00:00"),
  "evenPromisesAllowed": false,
  "visiblePromiseRound": false,
  "onlyTotalPromise": false,
  "freeTrump": true,
  "hiddenTrump": false,
  "speedPromise": false,
  "privateSpeedGame": false,
  "opponentPromiseCardValue": false,
  "opponentGameCardValue": false,
  "thisIsDemoGame": true,
  "hiddenCardsMode": 0,
  "bonusNonEvenPromise": false,
  "rePromise": false,
  "hiddenRePromise": false,
  "game": {
    "playerOrder": [
      {
        "name": "Eka",
        "type": "human",
      },
      {
        "name": "Vika",
        "type": "human",
      },
      {
        "name": "Toka",
        "type": "human",
      }
    ],
    "rounds": [
      {
        "roundIndex": 0,
        "cardsInRound": 6,
        "dealerPositionIndex": 0,
        "starterPositionIndex": 1,
        "roundPlayers": [
          {
            "name": "Eka",
            "cards": [
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "promise": 1,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": 1664262214066,
            "promiseMade": 1664262743053,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Vika",
            "cards": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "promise": 2,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": 1664256450988,
            "promiseMade": 1664262189283,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Toka",
            "cards": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
            ],
            "promise": 2,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": 1664262191683,
            "promiseMade": 1664262211666,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "clubs",
          "value": 14,
          "rank": "A",
        },
        "totalRePromise": null, "totalPromise": 5,
        "cardsPlayed": [
          [
            {
              "name": "Vika",
              "card": {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664264442688,
              "playStarted": 1664262743053,
            },
            {
              "name": "Toka",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664265290453,
              "playStarted": 1664264443788,
            },
            {
              "name": "Eka",
              "card": {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664265306102,
              "playStarted": 1664265291553,
            },
          ],
          [],
        ],
        "roundStatus": 1,
      },
      {
        "roundIndex": 1,
        "cardsInRound": 5,
        "dealerPositionIndex": 1,
        "starterPositionIndex": 2,
        "roundPlayers": [
          {
            "name": "Eka",
            "cards": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Vika",
            "cards": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Toka",
            "cards": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "hearts",
          "value": 6,
          "rank": "6",
        },
        "totalRePromise": null, "totalPromise": null,
        "cardsPlayed": [
          []
        ],
        "roundStatus": 0,
      },
      {
        "roundIndex": 2,
        "cardsInRound": 6,
        "dealerPositionIndex": 2,
        "starterPositionIndex": 0,
        "roundPlayers": [
          {
            "name": "Eka",
            "cards": [
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Vika",
            "cards": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Toka",
            "cards": [
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "clubs",
          "value": 6,
          "rank": "6",
        },
        "totalRePromise": null, "totalPromise": null,
        "cardsPlayed": [
          []
        ],
        "roundStatus": 0,
      }
    ],
    "lastTimeStamp": 1664265306102,
  },
  "gameStarted": new Date("2022-09-27T05:27:28.588+00:00"),
  "gameStatistics": {
    "generated": 1664265306105,
    "playersStatistics": [
      {
        "playerName": "Eka",
        "totalPoints": 0,
        "totalKeeps": 0,
        "bigPointsByZero": 0,
        "bigZeroKeepPromisesCount": 0,
        "bigZeroFailPromisesCount": 0,
        "smallPointsNotZero": 0,
        "smallNotZeroKeepPromisesCount": 0,
        "smallNotZeroFailPromisesCount": 0,
        "totalPointsBig": 0,
        "totalPointsSmall": 0,
        "totalKeepsBig": 0,
        "totalKeepsSmall": 0,
        "pointsPerKeeps": 0,
        "position": 1,
        "scorePoints": 0.6666666666666666,
        "trumpsInGame": 5,
        "bigsCardsInGame": 5,
        "smallCardsInGame": 3,
        "otherCardsInGame": 4,
        "playTime": 14549,
        "promiseTime": 528987,
        "pointsPerRound": [
          0,
          0,
          0
        ],
        "evenBreakingPointsPerRound": [
          0,
          0,
          0
        ],
        "cumulativePointsPerRound": [
          0,
          0,
          0
        ],
      },
      {
        "playerName": "Toka",
        "totalPoints": 0,
        "totalKeeps": 0,
        "bigPointsByZero": 0,
        "bigZeroKeepPromisesCount": 0,
        "bigZeroFailPromisesCount": 0,
        "smallPointsNotZero": 0,
        "smallNotZeroKeepPromisesCount": 0,
        "smallNotZeroFailPromisesCount": 0,
        "totalPointsBig": 0,
        "totalPointsSmall": 0,
        "totalKeepsBig": 0,
        "totalKeepsSmall": 0,
        "pointsPerKeeps": 0,
        "position": 2,
        "scorePoints": 0.3333333333333333,
        "trumpsInGame": 3,
        "bigsCardsInGame": 3,
        "smallCardsInGame": 3,
        "otherCardsInGame": 8,
        "playTime": 846665,
        "promiseTime": 19983,
        "pointsPerRound": [
          0,
          0,
          0
        ],
        "evenBreakingPointsPerRound": [
          0,
          0,
          0
        ],
        "cumulativePointsPerRound": [
          0,
          0,
          0
        ],
      },
      {
        "playerName": "Vika",
        "totalPoints": 0,
        "totalKeeps": 0,
        "bigPointsByZero": 0,
        "bigZeroKeepPromisesCount": 0,
        "bigZeroFailPromisesCount": 0,
        "smallPointsNotZero": 0,
        "smallNotZeroKeepPromisesCount": 0,
        "smallNotZeroFailPromisesCount": 0,
        "totalPointsBig": 0,
        "totalPointsSmall": 0,
        "totalKeepsBig": 0,
        "totalKeepsSmall": 0,
        "pointsPerKeeps": 0,
        "position": 3,
        "scorePoints": 0,
        "trumpsInGame": 7,
        "bigsCardsInGame": 2,
        "smallCardsInGame": 5,
        "otherCardsInGame": 3,
        "playTime": 1699635,
        "promiseTime": 5738295,
        "pointsPerRound": [
          0,
          0,
          0
        ],
        "evenBreakingPointsPerRound": [
          0,
          0,
          0
        ],
        "cumulativePointsPerRound": [
          0,
          0,
          0
        ],
      }
    ],
    "winnerName": "",
    "winnerPoints": 0,
    "roundsPlayed": 0,
    "bigRoundsPlayed": 0,
    "smallRoundsPlayed": 0,
    "cardsHit": 3,
    "spurtAndMelt": {
      "spurtGap": null,
      "spurtFrom": null,
      "meltGap": null,
      "meltFrom": null,
      "melter": null,
    },
  }
};

export const firstRoundThirdHitSecondPlayer: IGameOptions = {
  "humanPlayersCount": 3,
  "botPlayersCount": 0,
  "startRound": 6,
  "turnRound": 5,
  "endRound": 6,
  "adminName": "Eka",
  "password": "",
  "gameStatus": 1,
  "humanPlayers": [
    {
      "name": "Eka",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": []
      },
    },
    {
      "name": "Vika",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": []
      },
    },
    {
      "name": "Toka",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": []
      },
    }
  ],
  "createDateTime": new Date("2022-09-27T05:27:19.345+00:00"),
  "evenPromisesAllowed": false,
  "visiblePromiseRound": false,
  "onlyTotalPromise": false,
  "freeTrump": true,
  "hiddenTrump": false,
  "speedPromise": false,
  "privateSpeedGame": false,
  "opponentPromiseCardValue": false,
  "opponentGameCardValue": false,
  "thisIsDemoGame": true,
  "hiddenCardsMode": 0,
  "bonusNonEvenPromise": false,
  "rePromise": false,
  "hiddenRePromise": false,
  "game": {
    "playerOrder": [
      {
        "name": "Eka",
        "type": "human",
      },
      {
        "name": "Vika",
        "type": "human",
      },
      {
        "name": "Toka",
        "type": "human",
      }
    ],
    "rounds": [
      {
        "roundIndex": 0,
        "cardsInRound": 6,
        "dealerPositionIndex": 0,
        "starterPositionIndex": 1,
        "roundPlayers": [
          {
            "name": "Eka",
            "cards": [
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
            ],
            "promise": 1,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": 1664262214066,
            "promiseMade": 1664262743053,
            "rePromiseStarted": null,
            "rePromiseMade": null,
            "keeps": 1,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Vika",
            "cards": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "promise": 2,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": 1664256450988,
            "promiseMade": 1664262189283,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Toka",
            "cards": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
            ],
            "promise": 2,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": 1664262191683,
            "promiseMade": 1664262211666,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "clubs",
          "value": 14,
          "rank": "A",
        },
        "totalRePromise": null, "totalPromise": 5,
        "cardsPlayed": [
          [
            {
              "name": "Vika",
              "card": {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664264442688,
              "playStarted": 1664262743053,
            },
            {
              "name": "Toka",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664265290453,
              "playStarted": 1664264443788,
            },
            {
              "name": "Eka",
              "card": {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664265306102,
              "playStarted": 1664265291553,
            },
          ],
          [
            {
              "name": "Toka",
              "card": {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664268554678,
              "playStarted": 1664265308502,
            },
            {
              "name": "Eka",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664268557156,
              "playStarted": 1664268555778,
            },
            {
              "name": "Vika",
              "card": {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664268559777,
              "playStarted": 1664268558256,
            },
          ],
          [
            {
              "name": "Eka",
              "card": {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664268569561,
              "playStarted": 1664268562177,
            },
          ],
        ],
        "roundStatus": 1,
      },
      {
        "roundIndex": 1,
        "cardsInRound": 5,
        "dealerPositionIndex": 1,
        "starterPositionIndex": 2,
        "roundPlayers": [
          {
            "name": "Eka",
            "cards": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Vika",
            "cards": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Toka",
            "cards": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "hearts",
          "value": 6,
          "rank": "6",
        },
        "totalRePromise": null, "totalPromise": null,
        "cardsPlayed": [
          []
        ],
        "roundStatus": 0,
      },
      {
        "roundIndex": 2,
        "cardsInRound": 6,
        "dealerPositionIndex": 2,
        "starterPositionIndex": 0,
        "roundPlayers": [
          {
            "name": "Eka",
            "cards": [
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Vika",
            "cards": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Toka",
            "cards": [
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              }
            ],
            "promise": null,
            "rePromise": null,
            "rePromiseBonus": null,
            "promiseStarted": null,
            "promiseMade": null,
            "rePromiseStarted": null, "rePromiseMade": null, "keeps": 0,
            "points": null,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "clubs",
          "value": 6,
          "rank": "6",
        },
        "totalRePromise": null, "totalPromise": null,
        "cardsPlayed": [
          []
        ],
        "roundStatus": 0,
      }
    ],
    "lastTimeStamp": 1664268569561,
  },
  "gameStarted": new Date("2022-09-27T05:27:28.588+00:00"),
  "gameStatistics": {
    "generated": 1664268569563,
    "playersStatistics": [
      {
        "playerName": "Eka",
        "totalPoints": 0,
        "totalKeeps": 1,
        "bigPointsByZero": 0,
        "bigZeroKeepPromisesCount": 0,
        "bigZeroFailPromisesCount": 0,
        "smallPointsNotZero": 0,
        "smallNotZeroKeepPromisesCount": 0,
        "smallNotZeroFailPromisesCount": 0,
        "totalPointsBig": 0,
        "totalPointsSmall": 0,
        "totalKeepsBig": 1,
        "totalKeepsSmall": 0,
        "pointsPerKeeps": 0,
        "position": 1,
        "scorePoints": 0.6666666666666666,
        "trumpsInGame": 5,
        "bigsCardsInGame": 5,
        "smallCardsInGame": 3,
        "otherCardsInGame": 4,
        "playTime": 23311,
        "promiseTime": 528987,
        "pointsPerRound": [
          0,
          0,
          0
        ],
        "evenBreakingPointsPerRound": [
          0,
          0,
          0
        ],
        "cumulativePointsPerRound": [
          0,
          0,
          0
        ],
      },
      {
        "playerName": "Vika",
        "totalPoints": 0,
        "totalKeeps": 0,
        "bigPointsByZero": 0,
        "bigZeroKeepPromisesCount": 0,
        "bigZeroFailPromisesCount": 0,
        "smallPointsNotZero": 0,
        "smallNotZeroKeepPromisesCount": 0,
        "smallNotZeroFailPromisesCount": 0,
        "totalPointsBig": 0,
        "totalPointsSmall": 0,
        "totalKeepsBig": 0,
        "totalKeepsSmall": 0,
        "pointsPerKeeps": 0,
        "position": 2,
        "scorePoints": 0.3333333333333333,
        "trumpsInGame": 7,
        "bigsCardsInGame": 2,
        "smallCardsInGame": 5,
        "otherCardsInGame": 3,
        "playTime": 1701156,
        "promiseTime": 5738295,
        "pointsPerRound": [
          0,
          0,
          0
        ],
        "evenBreakingPointsPerRound": [
          0,
          0,
          0
        ],
        "cumulativePointsPerRound": [
          0,
          0,
          0
        ],
      },
      {
        "playerName": "Toka",
        "totalPoints": 0,
        "totalKeeps": 0,
        "bigPointsByZero": 0,
        "bigZeroKeepPromisesCount": 0,
        "bigZeroFailPromisesCount": 0,
        "smallPointsNotZero": 0,
        "smallNotZeroKeepPromisesCount": 0,
        "smallNotZeroFailPromisesCount": 0,
        "totalPointsBig": 0,
        "totalPointsSmall": 0,
        "totalKeepsBig": 0,
        "totalKeepsSmall": 0,
        "pointsPerKeeps": 0,
        "position": 3,
        "scorePoints": 0,
        "trumpsInGame": 3,
        "bigsCardsInGame": 3,
        "smallCardsInGame": 3,
        "otherCardsInGame": 8,
        "playTime": 4092841,
        "promiseTime": 19983,
        "pointsPerRound": [
          0,
          0,
          0
        ],
        "evenBreakingPointsPerRound": [
          0,
          0,
          0
        ],
        "cumulativePointsPerRound": [
          0,
          0,
          0
        ],
      }
    ],
    "winnerName": "",
    "winnerPoints": 0,
    "roundsPlayed": 0,
    "bigRoundsPlayed": 0,
    "smallRoundsPlayed": 0,
    "cardsHit": 7,
    "spurtAndMelt": {
      "spurtGap": null,
      "spurtFrom": null,
      "meltGap": null,
      "meltFrom": null,
      "melter": null,
    },
  }
};
