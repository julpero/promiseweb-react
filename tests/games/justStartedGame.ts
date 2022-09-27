import { IGameOptions } from "../../backend/interfaces/IGameOptions";
export const justStartedGame: IGameOptions = {
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
            "promise": null,
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
            "promise": null,
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
            "promise": null,
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
        "totalPromise": null,
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
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
        "totalPromise": null,
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
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
        "totalPromise": null,
        "cardsPlayed": [
          []
        ],
        "roundStatus": 0,
      }
    ],
    "lastTimeStamp": 1664256448588,
  },
  "gameStarted": new Date("2022-09-27T05:27:28.588+00:00"),
};

export const justStartedLastPromiser: IGameOptions = {
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
            "promise": null,
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
            "promiseStarted": 1664256450988,
            "promiseMade": 1664262189283,
            "keeps": 0,
            "points": null,
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
            "promiseStarted": 1664262191683,
            "promiseMade": 1664262211666,
            "keeps": 0,
            "points": null,
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
        "totalPromise": 4,
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
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
        "totalPromise": null,
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
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
            "promiseStarted": null,
            "promiseMade": null,
            "keeps": 0,
            "points": null,
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
        "totalPromise": null,
        "cardsPlayed": [
          []
        ],
        "roundStatus": 0,
      }
    ],
    "lastTimeStamp": 1664262211666,
  },
  "gameStarted": new Date("2022-09-27T05:27:28.588+00:00"),
};
