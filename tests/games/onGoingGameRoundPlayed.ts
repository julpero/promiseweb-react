import { IGameOptions } from "../../backend/interfaces/IGameOptions";
export const onGoingGameRoundPlayed: IGameOptions = {
  "humanPlayersCount": 5,
  "botPlayersCount": 0,
  "startRound": 10,
  "turnRound": 1,
  "endRound": 10,
  "adminName": "Creator",
  "password": "",
  "gameStatus": 1,
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
