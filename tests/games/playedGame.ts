import { IGameOptions } from "../../backend/interfaces/IGameOptions";
export const playedGame: IGameOptions = {
  "humanPlayersCount": 5,
  "botPlayersCount": 0,
  "startRound": 10,
  "turnRound": 1,
  "endRound": 10,
  "adminName": "Creator",
  "password": "",
  "gameStatus": 2,
  "humanPlayers": [
    {
      "name": "Creator",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": [
          6.017667844522968,
          12.20494699646643,
          18.97173144876325,
          26.328621908127207,
          33.459363957597176,
          39.49469964664311,
          45.09893992932862,
          50.802120141342755,
          55.908127208480565,
          61.08480565371025,
          66.83745583038869,
          72.06007067137809,
          77.18374558303887,
          82.60070671378092,
          89.60424028268551,
          96.87279151943463,
          103.80918727915194,
          110.51943462897526,
          116.04946996466431
        ]
      },
    },
    {
      "name": "Second",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": [
          7.669724770642202,
          15.394495412844037,
          23.09480122324159,
          30.788990825688074,
          39.29051987767584,
          46.51376146788991,
          52.77064220183486,
          58.571865443425075,
          63.99082568807339,
          69.37003058103976,
          74.84709480122324,
          80.40672782874617,
          86.50764525993884,
          93.34862385321101,
          101.88990825688073,
          109.65443425076452,
          117.12844036697248,
          124.53822629969419,
          131.7553516819572
        ]
      },
    },
    {
      "name": "Third",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": [
          7.62962962962963,
          15.13888888888889,
          23.444444444444443,
          31.62037037037037,
          39.77777777777778,
          45.879629629629626,
          51.94444444444444,
          57.7037037037037,
          63.50925925925926,
          68.20370370370371,
          73.37962962962963,
          79.61111111111111,
          85.52777777777777,
          93.31481481481481,
          101.30555555555556,
          109.48148148148148,
          117.37037037037037,
          125.71296296296296,
          134.72222222222223
        ]
      },
    },
    {
      "name": "LastOne",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": [
          8.101960784313725,
          15.545098039215686,
          23.15686274509804,
          31.03921568627451,
          39.76078431372549,
          45.72156862745098,
          51.82745098039216,
          57.72549019607843,
          63.07058823529412,
          68.04313725490196,
          73.50588235294117,
          79.4235294117647,
          84.95686274509804,
          91.33725490196079,
          99.59607843137255,
          107.34901960784313,
          114.55686274509804,
          122.09803921568627,
          130.35294117647058
        ]
      },
    },
    {
      "name": "NoBody",
      "active": true,
      "playerStats": {
        "playerAvgPointsInRounds": [
          8.341296928327646,
          16.197952218430036,
          23.96928327645051,
          31.266211604095563,
          39.153583617747444,
          45.37542662116041,
          51.62798634812287,
          57.389078498293514,
          62.51877133105802,
          67.77474402730375,
          73.09215017064847,
          78.19453924914676,
          84.5938566552901,
          91.49488054607508,
          99.1433447098976,
          106.53242320819113,
          114.62116040955631,
          122.38225255972696,
          130.20136518771332
        ]
      },
    }
  ],
  "createDateTime": new Date("2022-09-25T18:54:36.508+00:00"),
  "evenPromisesAllowed": true,
  "visiblePromiseRound": true,
  "onlyTotalPromise": false,
  "freeTrump": true,
  "hiddenTrump": false,
  "speedPromise": false,
  "privateSpeedGame": false,
  "opponentPromiseCardValue": false,
  "opponentGameCardValue": false,
  "thisIsDemoGame": false,
  "hiddenCardsMode": 0,
  "bonusNonEvenPromise": false,
  "chosenAce": false,
  "game": {
    "playerOrder": [
      {
        "name": "Creator",
        "type": "human",
      },
      {
        "name": "LastOne",
        "type": "human",
      },
      {
        "name": "Third",
        "type": "human",
      },
      {
        "name": "Second",
        "type": "human",
      },
      {
        "name": "NoBody",
        "type": "human",
      }
    ],
    "rounds": [
      {
        "roundIndex": 0,
        "cardsInRound": 10,
        "dealerPositionIndex": 0,
        "starterPositionIndex": 1,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664132442295,
            "promiseMade": 1664132455376,
            "keeps": 2,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
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
                "value": 11,
                "rank": "J",
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
            "name": "LastOne",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664132282893,
            "promiseMade": 1664132353780,
            "keeps": 0,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "hearts",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 6,
                "rank": "6",
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
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 3,
            "promiseStarted": 1664132353780,
            "promiseMade": 1664132382866,
            "keeps": 3,
            "points": 13,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
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
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "spades",
                "value": 9,
                "rank": "9",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664132382866,
            "promiseMade": 1664132412917,
            "keeps": 3,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664132412917,
            "promiseMade": 1664132442295,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
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
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
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
                "value": 12,
                "rank": "Q",
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
          "suite": "hearts",
          "value": 13,
          "rank": "K",
        },
        "totalPromise": 7,
        "cardsPlayed": [
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664132486041,
              "playStarted": 1664132455376,
            },
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664132491034,
              "playStarted": 1664132486042,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664132495531,
              "playStarted": 1664132491034,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664132499850,
              "playStarted": 1664132495532,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664132502992,
              "playStarted": 1664132499850,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664132518766,
              "playStarted": 1664132502992,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664132523989,
              "playStarted": 1664132518767,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664132533734,
              "playStarted": 1664132523989,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664132538691,
              "playStarted": 1664132533735,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664132541938,
              "playStarted": 1664132538691,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664132546709,
              "playStarted": 1664132541938,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664132550541,
              "playStarted": 1664132546709,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664132553653,
              "playStarted": 1664132550541,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664132560271,
              "playStarted": 1664132553653,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664132565428,
              "playStarted": 1664132560271,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664132571007,
              "playStarted": 1664132565428,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664132574903,
              "playStarted": 1664132571008,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664132578205,
              "playStarted": 1664132574903,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664132584974,
              "playStarted": 1664132578205,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664132588433,
              "playStarted": 1664132584974,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664132595067,
              "playStarted": 1664132588433,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664132624938,
              "playStarted": 1664132595068,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664132632778,
              "playStarted": 1664132624938,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664132636279,
              "playStarted": 1664132632785,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664132639611,
              "playStarted": 1664132636280,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664132644271,
              "playStarted": 1664132639612,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664132647953,
              "playStarted": 1664132644271,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664132658793,
              "playStarted": 1664132647954,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664132662027,
              "playStarted": 1664132658794,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664132666311,
              "playStarted": 1664132662028,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664132671669,
              "playStarted": 1664132666311,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664132678645,
              "playStarted": 1664132671669,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664132682310,
              "playStarted": 1664132678645,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664132685213,
              "playStarted": 1664132682311,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664132689070,
              "playStarted": 1664132685213,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664132693998,
              "playStarted": 1664132689070,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664132697208,
              "playStarted": 1664132693998,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664132700117,
              "playStarted": 1664132697208,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664132703034,
              "playStarted": 1664132700117,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664132706873,
              "playStarted": 1664132703034,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664132714439,
              "playStarted": 1664132706873,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664132720189,
              "playStarted": 1664132714440,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664132723968,
              "playStarted": 1664132720189,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664132727134,
              "playStarted": 1664132723968,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664132759299,
              "playStarted": 1664132727134,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664132763967,
              "playStarted": 1664132759300,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664132820341,
              "playStarted": 1664132763967,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664132827940,
              "playStarted": 1664132820360,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664132845982,
              "playStarted": 1664132827941,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664132863489,
              "playStarted": 1664132845982,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 1,
        "cardsInRound": 9,
        "dealerPositionIndex": 1,
        "starterPositionIndex": 2,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664132937051,
            "promiseMade": 1664132944813,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664132944813,
            "promiseMade": 1664132964749,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "hearts",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664132863489,
            "promiseMade": 1664132885951,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
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
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
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
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664132885951,
            "promiseMade": 1664132896623,
            "keeps": 1,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 3,
            "promiseStarted": 1664132896623,
            "promiseMade": 1664132937051,
            "keeps": 3,
            "points": 13,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
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
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
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
          "suite": "spades",
          "value": 14,
          "rank": "A",
        },
        "totalPromise": 8,
        "cardsPlayed": [
          [
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664132976365,
              "playStarted": 1664132964749,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664132979708,
              "playStarted": 1664132976366,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664132982575,
              "playStarted": 1664132979715,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664132991380,
              "playStarted": 1664132982575,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664133004741,
              "playStarted": 1664132991380,
            }
          ],
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664133016394,
              "playStarted": 1664133004742,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664133026315,
              "playStarted": 1664133016394,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664133029501,
              "playStarted": 1664133026315,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664133033145,
              "playStarted": 1664133029508,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664133036334,
              "playStarted": 1664133033145,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664133042580,
              "playStarted": 1664133036341,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664133046915,
              "playStarted": 1664133042587,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664133055327,
              "playStarted": 1664133046915,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664133058547,
              "playStarted": 1664133055328,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664133062114,
              "playStarted": 1664133058554,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664133067092,
              "playStarted": 1664133062114,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664133069933,
              "playStarted": 1664133067092,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664133082130,
              "playStarted": 1664133069933,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664133085407,
              "playStarted": 1664133082137,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664133093493,
              "playStarted": 1664133085407,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664133099265,
              "playStarted": 1664133093494,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664133134163,
              "playStarted": 1664133099273,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664133138261,
              "playStarted": 1664133134164,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664133144247,
              "playStarted": 1664133138261,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664133148747,
              "playStarted": 1664133144247,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664133154268,
              "playStarted": 1664133148748,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664133158627,
              "playStarted": 1664133154275,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664133167637,
              "playStarted": 1664133158628,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664133180742,
              "playStarted": 1664133167637,
            },
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664133183751,
              "playStarted": 1664133180743,
            }
          ],
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664133188713,
              "playStarted": 1664133183752,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664133199921,
              "playStarted": 1664133188713,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664133202946,
              "playStarted": 1664133199921,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664133208773,
              "playStarted": 1664133202946,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664133211812,
              "playStarted": 1664133208773,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664133216546,
              "playStarted": 1664133211819,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664133220825,
              "playStarted": 1664133216546,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664133223670,
              "playStarted": 1664133220831,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664133226363,
              "playStarted": 1664133223670,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664133230595,
              "playStarted": 1664133226364,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664133235077,
              "playStarted": 1664133230596,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664133274940,
              "playStarted": 1664133235077,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664133295825,
              "playStarted": 1664133274952,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664133313858,
              "playStarted": 1664133295826,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664133317153,
              "playStarted": 1664133313858,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 2,
        "cardsInRound": 8,
        "dealerPositionIndex": 2,
        "starterPositionIndex": 3,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664133365847,
            "promiseMade": 1664133372967,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "spades",
                "value": 9,
                "rank": "9",
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
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664133372967,
            "promiseMade": 1664133392616,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664133392616,
            "promiseMade": 1664133398439,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
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
            "name": "Second",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664133317153,
            "promiseMade": 1664133333169,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664133333169,
            "promiseMade": 1664133365847,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
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
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "spades",
          "value": 8,
          "rank": "8",
        },
        "totalPromise": 8,
        "cardsPlayed": [
          [
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664133407396,
              "playStarted": 1664133398439,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664133414652,
              "playStarted": 1664133407397,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664133418891,
              "playStarted": 1664133414653,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664133422636,
              "playStarted": 1664133418891,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664133426031,
              "playStarted": 1664133422636,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664133431703,
              "playStarted": 1664133426031,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664133436399,
              "playStarted": 1664133431710,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664133441553,
              "playStarted": 1664133436400,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664133453059,
              "playStarted": 1664133441560,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664133458565,
              "playStarted": 1664133453060,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664133463821,
              "playStarted": 1664133458566,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664133467997,
              "playStarted": 1664133463821,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664133471316,
              "playStarted": 1664133467998,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664133478017,
              "playStarted": 1664133471317,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664133492006,
              "playStarted": 1664133478018,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664133502056,
              "playStarted": 1664133492006,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664133526894,
              "playStarted": 1664133502057,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664133532471,
              "playStarted": 1664133526894,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664133547430,
              "playStarted": 1664133532472,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664133550652,
              "playStarted": 1664133547430,
            }
          ],
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664133557707,
              "playStarted": 1664133550652,
            },
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664133560473,
              "playStarted": 1664133557708,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664133563848,
              "playStarted": 1664133560474,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664133567343,
              "playStarted": 1664133563849,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664133571242,
              "playStarted": 1664133567343,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664133575582,
              "playStarted": 1664133571242,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664133578856,
              "playStarted": 1664133575582,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664133584591,
              "playStarted": 1664133578856,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664133587528,
              "playStarted": 1664133584591,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664133593106,
              "playStarted": 1664133587528,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664133601680,
              "playStarted": 1664133593106,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664133605220,
              "playStarted": 1664133601680,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664133608307,
              "playStarted": 1664133605220,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664133611486,
              "playStarted": 1664133608308,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664133624098,
              "playStarted": 1664133611487,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664133628926,
              "playStarted": 1664133624099,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664133631984,
              "playStarted": 1664133628927,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664133635586,
              "playStarted": 1664133631985,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664133638995,
              "playStarted": 1664133635587,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664133644208,
              "playStarted": 1664133638995,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 3,
        "cardsInRound": 7,
        "dealerPositionIndex": 3,
        "starterPositionIndex": 4,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664133658437,
            "promiseMade": 1664133666143,
            "keeps": 0,
            "points": 15,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664133666143,
            "promiseMade": 1664133670688,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "hearts",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664133670688,
            "promiseMade": 1664133678969,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "spades",
                "value": 13,
                "rank": "K",
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
            "name": "Second",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664133678969,
            "promiseMade": 1664133684878,
            "keeps": 3,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "spades",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664133644208,
            "promiseMade": 1664133658437,
            "keeps": 1,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "spades",
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
          "suite": "spades",
          "value": 6,
          "rank": "6",
        },
        "totalPromise": 7,
        "cardsPlayed": [
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664133701217,
              "playStarted": 1664133684878,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664133704713,
              "playStarted": 1664133701217,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664133719770,
              "playStarted": 1664133704713,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664133726753,
              "playStarted": 1664133719777,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664133729720,
              "playStarted": 1664133726760,
            }
          ],
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664133736231,
              "playStarted": 1664133729720,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664133739288,
              "playStarted": 1664133736250,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664133742028,
              "playStarted": 1664133739289,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664133750094,
              "playStarted": 1664133742028,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664133754092,
              "playStarted": 1664133750095,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664133770634,
              "playStarted": 1664133754092,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664133773912,
              "playStarted": 1664133770635,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664133777466,
              "playStarted": 1664133773912,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664133785892,
              "playStarted": 1664133777473,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664133788748,
              "playStarted": 1664133785900,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664133794419,
              "playStarted": 1664133788749,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664133797906,
              "playStarted": 1664133794426,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664133801452,
              "playStarted": 1664133797907,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664133804242,
              "playStarted": 1664133801453,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664133807127,
              "playStarted": 1664133804243,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664133821290,
              "playStarted": 1664133807127,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664133828435,
              "playStarted": 1664133821290,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664133833105,
              "playStarted": 1664133828435,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664133836774,
              "playStarted": 1664133833105,
            },
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664133839645,
              "playStarted": 1664133836774,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664133845545,
              "playStarted": 1664133839645,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664133850306,
              "playStarted": 1664133845546,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664133853962,
              "playStarted": 1664133850307,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664133857587,
              "playStarted": 1664133853962,
            },
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664133860346,
              "playStarted": 1664133857587,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664133864919,
              "playStarted": 1664133860346,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664133867849,
              "playStarted": 1664133864919,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664133870991,
              "playStarted": 1664133867850,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664133874636,
              "playStarted": 1664133870991,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664133877910,
              "playStarted": 1664133874636,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 4,
        "cardsInRound": 6,
        "dealerPositionIndex": 4,
        "starterPositionIndex": 0,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664133877911,
            "promiseMade": 1664133889273,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664133889273,
            "promiseMade": 1664133894473,
            "keeps": 0,
            "points": 15,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 9,
                "rank": "9",
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
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664133894473,
            "promiseMade": 1664133900280,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664133900280,
            "promiseMade": 1664133906927,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664133906927,
            "promiseMade": 1664133917547,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
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
                "suite": "spades",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "hearts",
          "value": 12,
          "rank": "Q",
        },
        "totalPromise": 6,
        "cardsPlayed": [
          [
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664133928135,
              "playStarted": 1664133917547,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664133933441,
              "playStarted": 1664133928142,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664133938892,
              "playStarted": 1664133933442,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664133941891,
              "playStarted": 1664133938893,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664133946705,
              "playStarted": 1664133941891,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664133952209,
              "playStarted": 1664133946706,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664133955269,
              "playStarted": 1664133952210,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664133958481,
              "playStarted": 1664133955269,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664133961618,
              "playStarted": 1664133958481,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664133966778,
              "playStarted": 1664133961619,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664133973493,
              "playStarted": 1664133966778,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664133977804,
              "playStarted": 1664133973493,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664133980970,
              "playStarted": 1664133977805,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664133984076,
              "playStarted": 1664133980970,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664133993272,
              "playStarted": 1664133984076,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664133998402,
              "playStarted": 1664133993272,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664134004736,
              "playStarted": 1664133998403,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664134009551,
              "playStarted": 1664134004737,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664134012668,
              "playStarted": 1664134009552,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664134015509,
              "playStarted": 1664134012669,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664134020822,
              "playStarted": 1664134015509,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664134024501,
              "playStarted": 1664134020829,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664134028608,
              "playStarted": 1664134024501,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664134033173,
              "playStarted": 1664134028609,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664134035913,
              "playStarted": 1664134033174,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664134040385,
              "playStarted": 1664134035913,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664134043818,
              "playStarted": 1664134040392,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664134047669,
              "playStarted": 1664134043818,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664134050461,
              "playStarted": 1664134047670,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664134053302,
              "playStarted": 1664134050461,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 5,
        "cardsInRound": 5,
        "dealerPositionIndex": 0,
        "starterPositionIndex": 1,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134121401,
            "promiseMade": 1664134138673,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134053303,
            "promiseMade": 1664134081112,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134081112,
            "promiseMade": 1664134109179,
            "keeps": 2,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134109179,
            "promiseMade": 1664134117254,
            "keeps": 0,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134117254,
            "promiseMade": 1664134121401,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
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
          }
        ],
        "trumpCard": {
          "suite": "clubs",
          "value": 5,
          "rank": "5",
        },
        "totalPromise": 5,
        "cardsPlayed": [
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664134142297,
              "playStarted": 1664134138673,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664134147652,
              "playStarted": 1664134142297,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664134150689,
              "playStarted": 1664134147652,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664134153503,
              "playStarted": 1664134150689,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664134156278,
              "playStarted": 1664134153504,
            }
          ],
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664134162293,
              "playStarted": 1664134156278,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664134165728,
              "playStarted": 1664134162293,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664134168558,
              "playStarted": 1664134165728,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664134172073,
              "playStarted": 1664134168559,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664134177387,
              "playStarted": 1664134172074,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664134182505,
              "playStarted": 1664134177388,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664134187791,
              "playStarted": 1664134182505,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664134190934,
              "playStarted": 1664134187791,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664134193791,
              "playStarted": 1664134190934,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664134197108,
              "playStarted": 1664134193791,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664134203430,
              "playStarted": 1664134197108,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664134206277,
              "playStarted": 1664134203430,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664134210030,
              "playStarted": 1664134206278,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664134213637,
              "playStarted": 1664134210030,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664134216561,
              "playStarted": 1664134213638,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664134220827,
              "playStarted": 1664134216562,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664134223632,
              "playStarted": 1664134220827,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664134235085,
              "playStarted": 1664134223632,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664134238210,
              "playStarted": 1664134235092,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664134241578,
              "playStarted": 1664134238210,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 6,
        "cardsInRound": 4,
        "dealerPositionIndex": 1,
        "starterPositionIndex": 2,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134261315,
            "promiseMade": 1664134264011,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134264011,
            "promiseMade": 1664134268098,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
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
            "name": "Third",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134241585,
            "promiseMade": 1664134251649,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134251649,
            "promiseMade": 1664134254486,
            "keeps": 2,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134254486,
            "promiseMade": 1664134261315,
            "keeps": 0,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "diamonds",
          "value": 5,
          "rank": "5",
        },
        "totalPromise": 4,
        "cardsPlayed": [
          [
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664134277659,
              "playStarted": 1664134268098,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664134280616,
              "playStarted": 1664134277659,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664134284664,
              "playStarted": 1664134280616,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664134288392,
              "playStarted": 1664134284664,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664134294166,
              "playStarted": 1664134288392,
            }
          ],
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664134299451,
              "playStarted": 1664134294166,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664134306028,
              "playStarted": 1664134299451,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664134308755,
              "playStarted": 1664134306028,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664134311880,
              "playStarted": 1664134308755,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664134315677,
              "playStarted": 1664134311880,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664134320241,
              "playStarted": 1664134315678,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664134323294,
              "playStarted": 1664134320241,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664134326855,
              "playStarted": 1664134323294,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664134331683,
              "playStarted": 1664134326855,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664134334756,
              "playStarted": 1664134331684,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664134339079,
              "playStarted": 1664134334757,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664134341854,
              "playStarted": 1664134339079,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664134345624,
              "playStarted": 1664134341854,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664134348535,
              "playStarted": 1664134345625,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664134351538,
              "playStarted": 1664134348542,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 7,
        "cardsInRound": 3,
        "dealerPositionIndex": 2,
        "starterPositionIndex": 3,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134372468,
            "promiseMade": 1664134380141,
            "keeps": 0,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
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
            "name": "LastOne",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134380141,
            "promiseMade": 1664134391601,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134391601,
            "promiseMade": 1664134428491,
            "keeps": 2,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
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
            "name": "Second",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134351538,
            "promiseMade": 1664134364604,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
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
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134364604,
            "promiseMade": 1664134372468,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "spades",
          "value": 8,
          "rank": "8",
        },
        "totalPromise": 3,
        "cardsPlayed": [
          [
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664134431089,
              "playStarted": 1664134428491,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664134434448,
              "playStarted": 1664134431090,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664134440123,
              "playStarted": 1664134434449,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664134448248,
              "playStarted": 1664134440123,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664134451193,
              "playStarted": 1664134448248,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664134465250,
              "playStarted": 1664134451193,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664134469006,
              "playStarted": 1664134465251,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664134472051,
              "playStarted": 1664134469006,
            },
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664134474824,
              "playStarted": 1664134472052,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664134478261,
              "playStarted": 1664134474825,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664134482818,
              "playStarted": 1664134478261,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664134485717,
              "playStarted": 1664134482818,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664134489060,
              "playStarted": 1664134485717,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664134492866,
              "playStarted": 1664134489060,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664134496631,
              "playStarted": 1664134492866,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 8,
        "cardsInRound": 2,
        "dealerPositionIndex": 3,
        "starterPositionIndex": 4,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134529438,
            "promiseMade": 1664134536469,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134536469,
            "promiseMade": 1664134550341,
            "keeps": 0,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134550341,
            "promiseMade": 1664134593646,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
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
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134593646,
            "promiseMade": 1664134598757,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "spades",
                "value": 9,
                "rank": "9",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134496631,
            "promiseMade": 1664134529438,
            "keeps": 1,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "diamonds",
          "value": 4,
          "rank": "4",
        },
        "totalPromise": 2,
        "cardsPlayed": [
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664134604009,
              "playStarted": 1664134598757,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664134608974,
              "playStarted": 1664134604010,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664134612657,
              "playStarted": 1664134608975,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664134636997,
              "playStarted": 1664134612657,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664134643399,
              "playStarted": 1664134636998,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664134649743,
              "playStarted": 1664134643399,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664134653981,
              "playStarted": 1664134649750,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664134657652,
              "playStarted": 1664134653982,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664134660842,
              "playStarted": 1664134657659,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664134663856,
              "playStarted": 1664134660843,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 9,
        "cardsInRound": 1,
        "dealerPositionIndex": 4,
        "starterPositionIndex": 0,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134663857,
            "promiseMade": 1664134676632,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134676632,
            "promiseMade": 1664134692879,
            "keeps": 0,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134692879,
            "promiseMade": 1664134697870,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134697870,
            "promiseMade": 1664134699991,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134699991,
            "promiseMade": 1664134703053,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "hearts",
          "value": 5,
          "rank": "5",
        },
        "totalPromise": 2,
        "cardsPlayed": [
          [
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664134706864,
              "playStarted": 1664134703053,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664134710853,
              "playStarted": 1664134706864,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664134713836,
              "playStarted": 1664134710854,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664134716698,
              "playStarted": 1664134713836,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664134719568,
              "playStarted": 1664134716699,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 10,
        "cardsInRound": 2,
        "dealerPositionIndex": 0,
        "starterPositionIndex": 1,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134762266,
            "promiseMade": 1664134765329,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134719568,
            "promiseMade": 1664134736940,
            "keeps": 2,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134736940,
            "promiseMade": 1664134742150,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134742150,
            "promiseMade": 1664134745959,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134745960,
            "promiseMade": 1664134762266,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
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
          "suite": "spades",
          "value": 3,
          "rank": "3",
        },
        "totalPromise": 0,
        "cardsPlayed": [
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664134771944,
              "playStarted": 1664134765329,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664134774771,
              "playStarted": 1664134771945,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664134777819,
              "playStarted": 1664134774771,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664134781059,
              "playStarted": 1664134777826,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664134784286,
              "playStarted": 1664134781060,
            }
          ],
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664134790622,
              "playStarted": 1664134784287,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664134793402,
              "playStarted": 1664134790623,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664134796614,
              "playStarted": 1664134793402,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664134799843,
              "playStarted": 1664134796614,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664134802975,
              "playStarted": 1664134799843,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 11,
        "cardsInRound": 3,
        "dealerPositionIndex": 1,
        "starterPositionIndex": 2,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664134829767,
            "promiseMade": 1664134845953,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134845954,
            "promiseMade": 1664134856429,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134802976,
            "promiseMade": 1664134816776,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134816776,
            "promiseMade": 1664134820725,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134820725,
            "promiseMade": 1664134829767,
            "keeps": 0,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "hearts",
          "value": 2,
          "rank": "2",
        },
        "totalPromise": 4,
        "cardsPlayed": [
          [
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664134860730,
              "playStarted": 1664134856430,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664134864624,
              "playStarted": 1664134860730,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664134869632,
              "playStarted": 1664134864624,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664134873130,
              "playStarted": 1664134869632,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664134877365,
              "playStarted": 1664134873130,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664134881923,
              "playStarted": 1664134877365,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664134885505,
              "playStarted": 1664134881924,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664134889439,
              "playStarted": 1664134885505,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664134893345,
              "playStarted": 1664134889439,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664134896146,
              "playStarted": 1664134893345,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664134901997,
              "playStarted": 1664134896153,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664134906056,
              "playStarted": 1664134902004,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664134909210,
              "playStarted": 1664134906057,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664134912165,
              "playStarted": 1664134909211,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664134916184,
              "playStarted": 1664134912165,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 12,
        "cardsInRound": 4,
        "dealerPositionIndex": 2,
        "starterPositionIndex": 3,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134953163,
            "promiseMade": 1664134957328,
            "keeps": 0,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664134957328,
            "promiseMade": 1664134961632,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134961632,
            "promiseMade": 1664134982052,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664134916184,
            "promiseMade": 1664134938961,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
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
                "suite": "spades",
                "value": 2,
                "rank": "2",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664134938961,
            "promiseMade": 1664134953163,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "diamonds",
          "value": 5,
          "rank": "5",
        },
        "totalPromise": 5,
        "cardsPlayed": [
          [
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664134986095,
              "playStarted": 1664134982052,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664134989612,
              "playStarted": 1664134986096,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664134993377,
              "playStarted": 1664134989612,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664134998163,
              "playStarted": 1664134993377,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664135001365,
              "playStarted": 1664134998170,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664135008470,
              "playStarted": 1664135001366,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664135012128,
              "playStarted": 1664135008470,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664135026882,
              "playStarted": 1664135012128,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664135030316,
              "playStarted": 1664135026883,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664135059007,
              "playStarted": 1664135030317,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664135063934,
              "playStarted": 1664135059007,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664135068071,
              "playStarted": 1664135063934,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664135071552,
              "playStarted": 1664135068071,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664135075518,
              "playStarted": 1664135071553,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664135078330,
              "playStarted": 1664135075519,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664135083704,
              "playStarted": 1664135078330,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664135086734,
              "playStarted": 1664135083704,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664135089978,
              "playStarted": 1664135086735,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664135093904,
              "playStarted": 1664135089979,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664135098009,
              "playStarted": 1664135093904,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 13,
        "cardsInRound": 5,
        "dealerPositionIndex": 3,
        "starterPositionIndex": 4,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664135118998,
            "promiseMade": 1664135125054,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
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
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664135125054,
            "promiseMade": 1664135136100,
            "keeps": 0,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
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
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
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
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664135136100,
            "promiseMade": 1664135167600,
            "keeps": 0,
            "points": 5,
            "evenBreakingBonus": null,
            "cardsToDebug": [
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
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "spades",
                "value": 9,
                "rank": "9",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664135167600,
            "promiseMade": 1664135181100,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 3,
            "promiseStarted": 1664135098009,
            "promiseMade": 1664135118998,
            "keeps": 2,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "spades",
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
          "suite": "diamonds",
          "value": 13,
          "rank": "K",
        },
        "totalPromise": 7,
        "cardsPlayed": [
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664135192265,
              "playStarted": 1664135181100,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664135204209,
              "playStarted": 1664135192265,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664135209118,
              "playStarted": 1664135204209,
            },
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664135212067,
              "playStarted": 1664135209118,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664135214978,
              "playStarted": 1664135212067,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664135220215,
              "playStarted": 1664135214979,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664135225619,
              "playStarted": 1664135220215,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664135228815,
              "playStarted": 1664135225620,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664135235803,
              "playStarted": 1664135228816,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664135285054,
              "playStarted": 1664135235810,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664135343819,
              "playStarted": 1664135285054,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664135357977,
              "playStarted": 1664135343827,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664135361822,
              "playStarted": 1664135357977,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664135391554,
              "playStarted": 1664135361822,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664135400210,
              "playStarted": 1664135391555,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664135404942,
              "playStarted": 1664135400210,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664135414336,
              "playStarted": 1664135404942,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664135420623,
              "playStarted": 1664135414337,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664135425430,
              "playStarted": 1664135420623,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664135439953,
              "playStarted": 1664135425430,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664135444855,
              "playStarted": 1664135439953,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664135448672,
              "playStarted": 1664135444856,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664135455498,
              "playStarted": 1664135448672,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664135458769,
              "playStarted": 1664135455498,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664135461748,
              "playStarted": 1664135458770,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 14,
        "cardsInRound": 6,
        "dealerPositionIndex": 4,
        "starterPositionIndex": 0,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664135461748,
            "promiseMade": 1664135476867,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "spades",
                "value": 9,
                "rank": "9",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664135476867,
            "promiseMade": 1664135489784,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664135489784,
            "promiseMade": 1664135502491,
            "keeps": 0,
            "points": 15,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664135502491,
            "promiseMade": 1664135520736,
            "keeps": 3,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664135520736,
            "promiseMade": 1664135531336,
            "keeps": 0,
            "points": 15,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "diamonds",
          "value": 9,
          "rank": "9",
        },
        "totalPromise": 4,
        "cardsPlayed": [
          [
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664135555323,
              "playStarted": 1664135531336,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664135570854,
              "playStarted": 1664135555323,
            },
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664135574730,
              "playStarted": 1664135570854,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664135578987,
              "playStarted": 1664135574737,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664135581854,
              "playStarted": 1664135578988,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664135589579,
              "playStarted": 1664135581855,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664135597127,
              "playStarted": 1664135589579,
            },
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664135600104,
              "playStarted": 1664135597128,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664135603116,
              "playStarted": 1664135600104,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664135607408,
              "playStarted": 1664135603116,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664135614670,
              "playStarted": 1664135607408,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664135619066,
              "playStarted": 1664135614670,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664135622573,
              "playStarted": 1664135619067,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664135637035,
              "playStarted": 1664135622573,
            },
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664135640469,
              "playStarted": 1664135637035,
            }
          ],
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664135645750,
              "playStarted": 1664135640469,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664135649345,
              "playStarted": 1664135645751,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664135652683,
              "playStarted": 1664135649345,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664135655908,
              "playStarted": 1664135652684,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664135666819,
              "playStarted": 1664135655915,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664135671364,
              "playStarted": 1664135666820,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664135674670,
              "playStarted": 1664135671364,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664135677704,
              "playStarted": 1664135674670,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664135681649,
              "playStarted": 1664135677704,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664135685368,
              "playStarted": 1664135681650,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664135690231,
              "playStarted": 1664135685368,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664135693108,
              "playStarted": 1664135690231,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664135696661,
              "playStarted": 1664135693109,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664135703184,
              "playStarted": 1664135696661,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664135706503,
              "playStarted": 1664135703185,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 15,
        "cardsInRound": 7,
        "dealerPositionIndex": 0,
        "starterPositionIndex": 1,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664135762706,
            "promiseMade": 1664135780219,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "spades",
                "value": 9,
                "rank": "9",
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
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664135706503,
            "promiseMade": 1664135718785,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664135718785,
            "promiseMade": 1664135736557,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664135736557,
            "promiseMade": 1664135743763,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
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
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664135743763,
            "promiseMade": 1664135762706,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "spades",
          "value": 11,
          "rank": "J",
        },
        "totalPromise": 7,
        "cardsPlayed": [
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664135786592,
              "playStarted": 1664135780219,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664135790191,
              "playStarted": 1664135786592,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664135793057,
              "playStarted": 1664135790192,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664135809384,
              "playStarted": 1664135793058,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664135814450,
              "playStarted": 1664135809385,
            }
          ],
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664135822601,
              "playStarted": 1664135814451,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664135826003,
              "playStarted": 1664135822601,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664135828880,
              "playStarted": 1664135826010,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664135839638,
              "playStarted": 1664135828881,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664135849901,
              "playStarted": 1664135839638,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664135854979,
              "playStarted": 1664135849901,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664135889538,
              "playStarted": 1664135854980,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664135895301,
              "playStarted": 1664135889539,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664135898785,
              "playStarted": 1664135895302,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664135905322,
              "playStarted": 1664135898785,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664135910122,
              "playStarted": 1664135905323,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664135915639,
              "playStarted": 1664135910122,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664135919224,
              "playStarted": 1664135915640,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664135926668,
              "playStarted": 1664135919231,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664135930359,
              "playStarted": 1664135926669,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664135935308,
              "playStarted": 1664135930360,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664135942541,
              "playStarted": 1664135935308,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664135951835,
              "playStarted": 1664135942541,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664135961457,
              "playStarted": 1664135951835,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664135964759,
              "playStarted": 1664135961457,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664135969416,
              "playStarted": 1664135964760,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664135976994,
              "playStarted": 1664135969417,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664135982427,
              "playStarted": 1664135976995,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664135985904,
              "playStarted": 1664135982427,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664135989183,
              "playStarted": 1664135985904,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664135994799,
              "playStarted": 1664135989184,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664135999745,
              "playStarted": 1664135994806,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664136002652,
              "playStarted": 1664135999746,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664136005720,
              "playStarted": 1664136002652,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664136009022,
              "playStarted": 1664136005721,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 16,
        "cardsInRound": 8,
        "dealerPositionIndex": 1,
        "starterPositionIndex": 2,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664136099783,
            "promiseMade": 1664136114184,
            "keeps": 0,
            "points": 15,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
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
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664136114184,
            "promiseMade": 1664136131349,
            "keeps": 1,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "spades",
                "value": 9,
                "rank": "9",
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
            "name": "Third",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664136009023,
            "promiseMade": 1664136032660,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664136032660,
            "promiseMade": 1664136037301,
            "keeps": 3,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
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
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
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
            "name": "NoBody",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664136037301,
            "promiseMade": 1664136099783,
            "keeps": 3,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "spades",
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
          "value": 6,
          "rank": "6",
        },
        "totalPromise": 7,
        "cardsPlayed": [
          [
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664136138431,
              "playStarted": 1664136131349,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664136162032,
              "playStarted": 1664136138433,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664136169346,
              "playStarted": 1664136162032,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664136173161,
              "playStarted": 1664136169346,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664136180780,
              "playStarted": 1664136173161,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664136207466,
              "playStarted": 1664136180780,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664136215196,
              "playStarted": 1664136207473,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664136235919,
              "playStarted": 1664136215197,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664136239221,
              "playStarted": 1664136235920,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664136243336,
              "playStarted": 1664136239221,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664136248990,
              "playStarted": 1664136243336,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664136276007,
              "playStarted": 1664136248991,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664136279370,
              "playStarted": 1664136276014,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664136283264,
              "playStarted": 1664136279370,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664136288366,
              "playStarted": 1664136283264,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664136318344,
              "playStarted": 1664136288367,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664136339197,
              "playStarted": 1664136318344,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664136346089,
              "playStarted": 1664136339197,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664136355378,
              "playStarted": 1664136346099,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664136359310,
              "playStarted": 1664136355378,
            }
          ],
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664136371039,
              "playStarted": 1664136359317,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664136374230,
              "playStarted": 1664136371040,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664136377434,
              "playStarted": 1664136374230,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664136380910,
              "playStarted": 1664136377434,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664136388708,
              "playStarted": 1664136380910,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664136393501,
              "playStarted": 1664136388708,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664136397058,
              "playStarted": 1664136393501,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664136407802,
              "playStarted": 1664136397059,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664136410666,
              "playStarted": 1664136407809,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664136413849,
              "playStarted": 1664136410666,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664136418501,
              "playStarted": 1664136413849,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664136421307,
              "playStarted": 1664136418501,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664136425261,
              "playStarted": 1664136421308,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664136429005,
              "playStarted": 1664136425261,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664136432745,
              "playStarted": 1664136429012,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664136437237,
              "playStarted": 1664136432752,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664136441525,
              "playStarted": 1664136437237,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664136445269,
              "playStarted": 1664136441525,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664136448154,
              "playStarted": 1664136445270,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664136451010,
              "playStarted": 1664136448154,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 17,
        "cardsInRound": 9,
        "dealerPositionIndex": 2,
        "starterPositionIndex": 3,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664136496284,
            "promiseMade": 1664136505360,
            "keeps": 3,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
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
            "name": "LastOne",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664136505360,
            "promiseMade": 1664136511421,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "Third",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664136511421,
            "promiseMade": 1664136533875,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "spades",
                "value": 10,
                "rank": "10",
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
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 0,
            "promiseStarted": 1664136451011,
            "promiseMade": 1664136486246,
            "keeps": 0,
            "points": 15,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 3,
            "promiseStarted": 1664136486246,
            "promiseMade": 1664136496284,
            "keeps": 3,
            "points": 13,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "spades",
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
          "value": 3,
          "rank": "3",
        },
        "totalPromise": 8,
        "cardsPlayed": [
          [
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664136537964,
              "playStarted": 1664136533875,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664136544931,
              "playStarted": 1664136537964,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664136548749,
              "playStarted": 1664136544931,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664136558529,
              "playStarted": 1664136548750,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664136561673,
              "playStarted": 1664136558529,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664136566588,
              "playStarted": 1664136561673,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664136570190,
              "playStarted": 1664136566588,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664136573829,
              "playStarted": 1664136570191,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664136576889,
              "playStarted": 1664136573829,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664136579769,
              "playStarted": 1664136576889,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664136584276,
              "playStarted": 1664136579769,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664136587945,
              "playStarted": 1664136584276,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664136592058,
              "playStarted": 1664136587946,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664136594913,
              "playStarted": 1664136592058,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664136597844,
              "playStarted": 1664136594913,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664136603112,
              "playStarted": 1664136597844,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664136610515,
              "playStarted": 1664136603112,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664136613768,
              "playStarted": 1664136610515,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664136617181,
              "playStarted": 1664136613768,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664136629525,
              "playStarted": 1664136617181,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664136637498,
              "playStarted": 1664136629525,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664136641054,
              "playStarted": 1664136637498,
            },
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664136644255,
              "playStarted": 1664136641055,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664136647409,
              "playStarted": 1664136644256,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664136650605,
              "playStarted": 1664136647409,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664136655050,
              "playStarted": 1664136650606,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664136658487,
              "playStarted": 1664136655051,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664136664728,
              "playStarted": 1664136658487,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664136668323,
              "playStarted": 1664136664729,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664136671886,
              "playStarted": 1664136668324,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664136676927,
              "playStarted": 1664136671887,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664136680221,
              "playStarted": 1664136676934,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664136683034,
              "playStarted": 1664136680221,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664136686704,
              "playStarted": 1664136683035,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664136690257,
              "playStarted": 1664136686704,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664136695825,
              "playStarted": 1664136690257,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664136699341,
              "playStarted": 1664136695825,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664136702962,
              "playStarted": 1664136699342,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664136705934,
              "playStarted": 1664136702963,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664136709021,
              "playStarted": 1664136705934,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664136713730,
              "playStarted": 1664136709021,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664136717678,
              "playStarted": 1664136713730,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664136721300,
              "playStarted": 1664136717678,
            },
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664136724135,
              "playStarted": 1664136721300,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664136727503,
              "playStarted": 1664136724136,
            }
          ]
        ],
        "roundStatus": 2,
      },
      {
        "roundIndex": 18,
        "cardsInRound": 10,
        "dealerPositionIndex": 3,
        "starterPositionIndex": 4,
        "roundPlayers": [
          {
            "name": "Creator",
            "cards": [],
            "promise": 3,
            "promiseStarted": 1664136784619,
            "promiseMade": 1664136788300,
            "keeps": 1,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "LastOne",
            "cards": [],
            "promise": 2,
            "promiseStarted": 1664136788301,
            "promiseMade": 1664136798306,
            "keeps": 2,
            "points": 12,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
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
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              {
                "suite": "spades",
                "value": 11,
                "rank": "J",
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
            "name": "Third",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664136798306,
            "promiseMade": 1664136803974,
            "keeps": 1,
            "points": 11,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
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
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
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
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
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
          },
          {
            "name": "Second",
            "cards": [],
            "promise": 3,
            "promiseStarted": 1664136803981,
            "promiseMade": 1664136838884,
            "keeps": 4,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
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
                "value": 10,
                "rank": "10",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          },
          {
            "name": "NoBody",
            "cards": [],
            "promise": 1,
            "promiseStarted": 1664136727504,
            "promiseMade": 1664136784619,
            "keeps": 2,
            "points": 0,
            "evenBreakingBonus": null,
            "cardsToDebug": [
              {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              }
            ],
            "type": "human",
            "speedPromisePoints": null,
            "speedPromiseTotal": null,
          }
        ],
        "trumpCard": {
          "suite": "spades",
          "value": 9,
          "rank": "9",
        },
        "totalPromise": 10,
        "cardsPlayed": [
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664136850875,
              "playStarted": 1664136838884,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664136856326,
              "playStarted": 1664136850883,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664136864108,
              "playStarted": 1664136856327,
            },
            {
              "name": "Third",
              "card": {
                "suite": "spades",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664136867567,
              "playStarted": 1664136864115,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664136872596,
              "playStarted": 1664136867567,
            }
          ],
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "spades",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664136882186,
              "playStarted": 1664136872597,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664136888088,
              "playStarted": 1664136882187,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664136891415,
              "playStarted": 1664136888088,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664136894340,
              "playStarted": 1664136891416,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664136902484,
              "playStarted": 1664136894340,
            }
          ],
          [
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664136914849,
              "playStarted": 1664136902485,
            },
            {
              "name": "Third",
              "card": {
                "suite": "hearts",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664136918661,
              "playStarted": 1664136914850,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664136923506,
              "playStarted": 1664136918661,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664136926964,
              "playStarted": 1664136923506,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664136930357,
              "playStarted": 1664136926964,
            }
          ],
          [
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664136935583,
              "playStarted": 1664136930357,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664136940128,
              "playStarted": 1664136935583,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664136942983,
              "playStarted": 1664136940135,
            },
            {
              "name": "Second",
              "card": {
                "suite": "hearts",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664136946021,
              "playStarted": 1664136942984,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "hearts",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664136949564,
              "playStarted": 1664136946021,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "spades",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664136961537,
              "playStarted": 1664136949565,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "spades",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664136965277,
              "playStarted": 1664136961538,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664136968861,
              "playStarted": 1664136965277,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664136975088,
              "playStarted": 1664136968861,
            },
            {
              "name": "Second",
              "card": {
                "suite": "spades",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664136978065,
              "playStarted": 1664136975088,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 14,
                "rank": "A",
              },
              "playedTime": 1664136983764,
              "playStarted": 1664136978065,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664136987125,
              "playStarted": 1664136983765,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664136993682,
              "playStarted": 1664136987132,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 10,
                "rank": "10",
              },
              "playedTime": 1664136998291,
              "playStarted": 1664136993683,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664137001251,
              "playStarted": 1664136998292,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664137006143,
              "playStarted": 1664137001251,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 6,
                "rank": "6",
              },
              "playedTime": 1664137009136,
              "playStarted": 1664137006143,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "diamonds",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664137012761,
              "playStarted": 1664137009137,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "diamonds",
                "value": 7,
                "rank": "7",
              },
              "playedTime": 1664137017960,
              "playStarted": 1664137012761,
            },
            {
              "name": "Third",
              "card": {
                "suite": "diamonds",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664137020991,
              "playStarted": 1664137017960,
            }
          ],
          [
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664137025563,
              "playStarted": 1664137020992,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664137030091,
              "playStarted": 1664137025564,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "clubs",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664137037688,
              "playStarted": 1664137030091,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "clubs",
                "value": 5,
                "rank": "5",
              },
              "playedTime": 1664137042864,
              "playStarted": 1664137037688,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 13,
                "rank": "K",
              },
              "playedTime": 1664137045775,
              "playStarted": 1664137042864,
            }
          ],
          [
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664137050533,
              "playStarted": 1664137045776,
            },
            {
              "name": "Second",
              "card": {
                "suite": "clubs",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664137124214,
              "playStarted": 1664137050533,
            },
            {
              "name": "NoBody",
              "card": {
                "suite": "clubs",
                "value": 12,
                "rank": "Q",
              },
              "playedTime": 1664137135414,
              "playStarted": 1664137124226,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 9,
                "rank": "9",
              },
              "playedTime": 1664137139892,
              "playStarted": 1664137135422,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664137146165,
              "playStarted": 1664137139892,
            }
          ],
          [
            {
              "name": "NoBody",
              "card": {
                "suite": "diamonds",
                "value": 3,
                "rank": "3",
              },
              "playedTime": 1664137151074,
              "playStarted": 1664137146165,
            },
            {
              "name": "Creator",
              "card": {
                "suite": "hearts",
                "value": 8,
                "rank": "8",
              },
              "playedTime": 1664137154698,
              "playStarted": 1664137151081,
            },
            {
              "name": "LastOne",
              "card": {
                "suite": "hearts",
                "value": 2,
                "rank": "2",
              },
              "playedTime": 1664137164228,
              "playStarted": 1664137154698,
            },
            {
              "name": "Third",
              "card": {
                "suite": "clubs",
                "value": 11,
                "rank": "J",
              },
              "playedTime": 1664137167413,
              "playStarted": 1664137164228,
            },
            {
              "name": "Second",
              "card": {
                "suite": "diamonds",
                "value": 4,
                "rank": "4",
              },
              "playedTime": 1664137171244,
              "playStarted": 1664137167414,
            }
          ]
        ],
        "roundStatus": 2,
      }
    ],
    "lastTimeStamp": 1664137171244,
  },
  "gameStarted": new Date("2022-09-25T18:58:02.893+00:00"),
  "gameStatistics": {
    "generated": 1664137171303,
    "playersStatistics": [
      {
        "playerName": "Third",
        "totalPoints": 171,
        "totalKeeps": 17,
        "bigPointsByZero": 15,
        "bigZeroKeepPromisesCount": 1,
        "bigZeroFailPromisesCount": 0,
        "smallPointsNotZero": 33,
        "smallNotZeroKeepPromisesCount": 3,
        "smallNotZeroFailPromisesCount": 2,
        "totalPointsBig": 118,
        "totalPointsSmall": 53,
        "totalKeepsBig": 10,
        "totalKeepsSmall": 7,
        "pointsPerKeeps": 10.058823529411764,
        "position": 1,
        "scorePoints": 0.8,
        "trumpsInGame": 25,
        "bigsCardsInGame": 29,
        "smallCardsInGame": 24,
        "otherCardsInGame": 31,
        "playTime": 548476,
        "promiseTime": 347944,
        "pointsPerRound": [
          13,
          11,
          11,
          12,
          11,
          0,
          11,
          0,
          11,
          5,
          5,
          5,
          11,
          5,
          15,
          11,
          11,
          12,
          11
        ],
        "evenBreakingPointsPerRound": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        "cumulativePointsPerRound": [
          13,
          24,
          35,
          47,
          58,
          58,
          69,
          69,
          80,
          85,
          90,
          95,
          106,
          111,
          126,
          137,
          148,
          160,
          171
        ],
      },
      {
        "playerName": "Creator",
        "totalPoints": 150,
        "totalKeeps": 14,
        "bigPointsByZero": 30,
        "bigZeroKeepPromisesCount": 2,
        "bigZeroFailPromisesCount": 1,
        "smallPointsNotZero": 45,
        "smallNotZeroKeepPromisesCount": 4,
        "smallNotZeroFailPromisesCount": 2,
        "totalPointsBig": 90,
        "totalPointsSmall": 60,
        "totalKeepsBig": 7,
        "totalKeepsSmall": 7,
        "pointsPerKeeps": 10.714285714285714,
        "position": 2,
        "scorePoints": 0.6,
        "trumpsInGame": 24,
        "bigsCardsInGame": 28,
        "smallCardsInGame": 26,
        "otherCardsInGame": 31,
        "playTime": 667514,
        "promiseTime": 183738,
        "pointsPerRound": [
          0,
          12,
          12,
          15,
          12,
          11,
          5,
          0,
          5,
          11,
          5,
          12,
          0,
          11,
          12,
          12,
          15,
          0,
          0
        ],
        "evenBreakingPointsPerRound": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        "cumulativePointsPerRound": [
          0,
          12,
          24,
          39,
          51,
          62,
          67,
          67,
          72,
          83,
          88,
          100,
          100,
          111,
          123,
          135,
          150,
          150,
          150
        ],
      },
      {
        "playerName": "NoBody",
        "totalPoints": 132,
        "totalKeeps": 12,
        "bigPointsByZero": 15,
        "bigZeroKeepPromisesCount": 1,
        "bigZeroFailPromisesCount": 0,
        "smallPointsNotZero": 33,
        "smallNotZeroKeepPromisesCount": 3,
        "smallNotZeroFailPromisesCount": 3,
        "totalPointsBig": 89,
        "totalPointsSmall": 43,
        "totalKeepsBig": 7,
        "totalKeepsSmall": 5,
        "pointsPerKeeps": 11,
        "position": 3,
        "scorePoints": 0.4,
        "trumpsInGame": 29,
        "bigsCardsInGame": 29,
        "smallCardsInGame": 21,
        "otherCardsInGame": 30,
        "playTime": 788337,
        "promiseTime": 401759,
        "pointsPerRound": [
          12,
          13,
          12,
          0,
          12,
          11,
          0,
          11,
          0,
          5,
          5,
          0,
          11,
          0,
          15,
          12,
          0,
          13,
          0
        ],
        "evenBreakingPointsPerRound": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        "cumulativePointsPerRound": [
          12,
          25,
          37,
          37,
          49,
          60,
          60,
          71,
          71,
          76,
          81,
          81,
          92,
          92,
          107,
          119,
          119,
          132,
          132
        ],
      },
      {
        "playerName": "LastOne",
        "totalPoints": 131,
        "totalKeeps": 13,
        "bigPointsByZero": 15,
        "bigZeroKeepPromisesCount": 1,
        "bigZeroFailPromisesCount": 0,
        "smallPointsNotZero": 22,
        "smallNotZeroKeepPromisesCount": 2,
        "smallNotZeroFailPromisesCount": 3,
        "totalPointsBig": 94,
        "totalPointsSmall": 37,
        "totalKeepsBig": 8,
        "totalKeepsSmall": 5,
        "pointsPerKeeps": 10.076923076923077,
        "position": 4,
        "scorePoints": 0.2,
        "trumpsInGame": 17,
        "bigsCardsInGame": 23,
        "smallCardsInGame": 24,
        "otherCardsInGame": 45,
        "playTime": 770417,
        "promiseTime": 295319,
        "pointsPerRound": [
          0,
          12,
          11,
          11,
          15,
          11,
          11,
          5,
          0,
          0,
          0,
          5,
          5,
          0,
          11,
          11,
          0,
          11,
          12
        ],
        "evenBreakingPointsPerRound": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        "cumulativePointsPerRound": [
          0,
          12,
          23,
          34,
          49,
          60,
          71,
          76,
          76,
          76,
          76,
          81,
          86,
          86,
          97,
          108,
          108,
          119,
          131
        ],
      },
      {
        "playerName": "Second",
        "totalPoints": 104,
        "totalKeeps": 11,
        "bigPointsByZero": 15,
        "bigZeroKeepPromisesCount": 1,
        "bigZeroFailPromisesCount": 1,
        "smallPointsNotZero": 35,
        "smallNotZeroKeepPromisesCount": 3,
        "smallNotZeroFailPromisesCount": 2,
        "totalPointsBig": 49,
        "totalPointsSmall": 55,
        "totalKeepsBig": 4,
        "totalKeepsSmall": 7,
        "pointsPerKeeps": 9.454545454545455,
        "position": 5,
        "scorePoints": 0,
        "trumpsInGame": 28,
        "bigsCardsInGame": 21,
        "smallCardsInGame": 28,
        "otherCardsInGame": 32,
        "playTime": 639450,
        "promiseTime": 244770,
        "pointsPerRound": [
          0,
          0,
          12,
          0,
          11,
          0,
          0,
          5,
          5,
          5,
          5,
          11,
          12,
          12,
          0,
          11,
          0,
          15,
          0
        ],
        "evenBreakingPointsPerRound": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        "cumulativePointsPerRound": [
          0,
          0,
          12,
          12,
          23,
          23,
          23,
          28,
          33,
          38,
          43,
          54,
          66,
          78,
          78,
          89,
          89,
          104,
          104
        ],
      }
    ],
    "winnerName": "Third",
    "winnerPoints": 171,
    "roundsPlayed": 19,
    "bigRoundsPlayed": 10,
    "smallRoundsPlayed": 9,
    "cardsHit": 545,
    "spurtAndMelt": {
      "spurtGap": 7,
      "spurtFrom": 7,
      "meltGap": 7,
      "meltFrom": 7,
      "melter": "LastOne",
    },
  }
};
