import React from "react";
import { xxx as SpadesAce} from "./0_1";
import { xxx as SpadesTwo } from "./0_2";
import { xxx as SpadesThree } from "./0_3";
import { xxx as SpadesFour } from "./0_4";
import { xxx as SpadesFive } from "./0_5";
import { xxx as SpadesSix } from "./0_6";
import { xxx as SpadesSeven } from "./0_7";
import { xxx as SpadesEight } from "./0_8";
import { xxx as SpadesNine } from "./0_9";
import { xxx as SpadesTen } from "./0_10";
import { xxx as SpadesJack } from "./0_11";
import { xxx as SpadesQueen } from "./0_12";
import { xxx as SpadesKing } from "./0_13";
import { xxx as HeartsAce} from "./1_1";
import { xxx as HeartsTwo } from "./1_2";
import { xxx as HeartsThree } from "./1_3";
import { xxx as HeartsFour } from "./1_4";
import { xxx as HeartsFive } from "./1_5";
import { xxx as HeartsSix } from "./1_6";
import { xxx as HeartsSeven } from "./1_7";
import { xxx as HeartsEight } from "./1_8";
import { xxx as HeartsNine } from "./1_9";
import { xxx as HeartsTen } from "./1_10";
import { xxx as HeartsJack } from "./1_11";
import { xxx as HeartsQueen } from "./1_12";
import { xxx as HeartsKing } from "./1_13";
import { xxx as ClubsAce} from "./2_1";
import { xxx as ClubsTwo } from "./2_2";
import { xxx as ClubsThree } from "./2_3";
import { xxx as ClubsFour } from "./2_4";
import { xxx as ClubsFive } from "./2_5";
import { xxx as ClubsSix } from "./2_6";
import { xxx as ClubsSeven } from "./2_7";
import { xxx as ClubsEight } from "./2_8";
import { xxx as ClubsNine } from "./2_9";
import { xxx as ClubsTen } from "./2_10";
import { xxx as ClubsJack } from "./2_11";
import { xxx as ClubsQueen } from "./2_12";
import { xxx as ClubsKing } from "./2_13";
import { xxx as DiamondsAce} from "./3_1";
import { xxx as DiamondsTwo } from "./3_2";
import { xxx as DiamondsThree } from "./3_3";
import { xxx as DiamondsFour } from "./3_4";
import { xxx as DiamondsFive } from "./3_5";
import { xxx as DiamondsSix } from "./3_6";
import { xxx as DiamondsSeven } from "./3_7";
import { xxx as DiamondsEight } from "./3_8";
import { xxx as DiamondsNine } from "./3_9";
import { xxx as DiamondsTen } from "./3_10";
import { xxx as DiamondsJack } from "./3_11";
import { xxx as DiamondsQueen } from "./3_12";
import { xxx as DiamondsKing } from "./3_13";

import backSide from "./back.png";

export enum CARD_PLAYABLE {
  ok,
  notMyTurn,
  notAllowed,
}

const playableToClass = (playableStatus: CARD_PLAYABLE): string => {
  switch (playableStatus) {
    case CARD_PLAYABLE.notMyTurn: return "notMyTurn";
    case CARD_PLAYABLE.notAllowed: return "notAllowed";
    default: return "playOk";
  }
};

const getCardFace = (cardStr: string, playableStatus: CARD_PLAYABLE) => {
  // console.log(cardStr);
  switch (cardStr) {
    case "spadesA": return <SpadesAce text="A" title="SpadesAce" playableClass={playableToClass(playableStatus)} suite="spades" />;
    case "spades2": return <SpadesTwo text="2" title="SpadesTwo" playableClass={playableToClass(playableStatus)} suite="spades" />;
    case "spades3": return <SpadesThree text="3" title="SpadesThree" playableClass={playableToClass(playableStatus)} suite="spades" />;
    case "spades4": return <SpadesFour text="4" title="SpadesFour" playableClass={playableToClass(playableStatus)} suite="spades" />;
    case "spades5": return <SpadesFive text="5" title="SpadesFive" playableClass={playableToClass(playableStatus)} suite="spades" />;
    case "spades6": return <SpadesSix text="6" title="SpadesSix" playableClass={playableToClass(playableStatus)} suite="spades" />;
    case "spades7": return <SpadesSeven text="7" title="SpadesSeven" playableClass={playableToClass(playableStatus)} suite="spades" />;
    case "spades8": return <SpadesEight text="8" title="SpadesEight" playableClass={playableToClass(playableStatus)} suite="spades" />;
    case "spades9": return <SpadesNine text="9" title="SpadesNine" playableClass={playableToClass(playableStatus)} suite="spades" />;
    case "spades10": return <SpadesTen text="10" title="SpadesTen" playableClass={playableToClass(playableStatus)} suite="spades" />;
    case "spadesJ": return <SpadesJack text="J" title="SpadesJack" playableClass={playableToClass(playableStatus)} suite="spades" />;
    case "spadesQ": return <SpadesQueen text="Q" title="SpadesQueen" playableClass={playableToClass(playableStatus)} suite="spades" />;
    case "spadesK": return <SpadesKing text="K" title="SpadesKing" playableClass={playableToClass(playableStatus)} suite="spades" />;
    case "heartsA": return <HeartsAce text="A" title="HeartsAce" playableClass={playableToClass(playableStatus)} suite="hearts" />;
    case "hearts2": return <HeartsTwo text="2" title="HeartsTwo" playableClass={playableToClass(playableStatus)} suite="hearts" />;
    case "hearts3": return <HeartsThree text="3" title="HeartsThree" playableClass={playableToClass(playableStatus)} suite="hearts" />;
    case "hearts4": return <HeartsFour text="4" title="HeartsFour" playableClass={playableToClass(playableStatus)} suite="hearts" />;
    case "hearts5": return <HeartsFive text="5" title="HeartsFive" playableClass={playableToClass(playableStatus)} suite="hearts" />;
    case "hearts6": return <HeartsSix text="6" title="HeartsSix" playableClass={playableToClass(playableStatus)} suite="hearts" />;
    case "hearts7": return <HeartsSeven text="7" title="HeartsSeven" playableClass={playableToClass(playableStatus)} suite="hearts" />;
    case "hearts8": return <HeartsEight text="8" title="HeartsEight" playableClass={playableToClass(playableStatus)} suite="hearts" />;
    case "hearts9": return <HeartsNine text="9" title="HeartsNine" playableClass={playableToClass(playableStatus)} suite="hearts" />;
    case "hearts10": return <HeartsTen text="10" title="HeartsTen" playableClass={playableToClass(playableStatus)} suite="hearts" />;
    case "heartsJ": return <HeartsJack text="J" title="HeartsJack" playableClass={playableToClass(playableStatus)} suite="hearts" />;
    case "heartsQ": return <HeartsQueen text="Q" title="HeartsQueen" playableClass={playableToClass(playableStatus)} suite="hearts" />;
    case "heartsK": return <HeartsKing text="K" title="HeartsKing" playableClass={playableToClass(playableStatus)} suite="hearts" />;
    case "clubsA": return <ClubsAce text="A" title="ClubsAce" playableClass={playableToClass(playableStatus)} suite="clubs" />;
    case "clubs2": return <ClubsTwo text="2" title="ClubsTwo" playableClass={playableToClass(playableStatus)} suite="clubs" />;
    case "clubs3": return <ClubsThree text="3" title="ClubsThree" playableClass={playableToClass(playableStatus)} suite="clubs" />;
    case "clubs4": return <ClubsFour text="4" title="ClubsFour" playableClass={playableToClass(playableStatus)} suite="clubs" />;
    case "clubs5": return <ClubsFive text="5" title="ClubsFive" playableClass={playableToClass(playableStatus)} suite="clubs" />;
    case "clubs6": return <ClubsSix text="6" title="ClubsSix" playableClass={playableToClass(playableStatus)} suite="clubs" />;
    case "clubs7": return <ClubsSeven text="7" title="ClubsSeven" playableClass={playableToClass(playableStatus)} suite="clubs" />;
    case "clubs8": return <ClubsEight text="8" title="ClubsEight" playableClass={playableToClass(playableStatus)} suite="clubs" />;
    case "clubs9": return <ClubsNine text="9" title="ClubsNine" playableClass={playableToClass(playableStatus)} suite="clubs" />;
    case "clubs10": return <ClubsTen text="10" title="ClubsTen" playableClass={playableToClass(playableStatus)} suite="clubs" />;
    case "clubsJ": return <ClubsJack text="J" title="ClubsJack" playableClass={playableToClass(playableStatus)} suite="clubs" />;
    case "clubsQ": return <ClubsQueen text="Q" title="ClubsQueen" playableClass={playableToClass(playableStatus)} suite="clubs" />;
    case "clubsK": return <ClubsKing text="K" title="ClubsKing" playableClass={playableToClass(playableStatus)} suite="clubs" />;
    case "diamondsA": return <DiamondsAce text="A" title="DiamondsAce" playableClass={playableToClass(playableStatus)} suite="diamonds" />;
    case "diamonds2": return <DiamondsTwo text="2" title="DiamondsTwo" playableClass={playableToClass(playableStatus)} suite="diamonds" />;
    case "diamonds3": return <DiamondsThree text="3" title="DiamondsThree" playableClass={playableToClass(playableStatus)} suite="diamonds" />;
    case "diamonds4": return <DiamondsFour text="4" title="DiamondsFour" playableClass={playableToClass(playableStatus)} suite="diamonds" />;
    case "diamonds5": return <DiamondsFive text="5" title="DiamondsFive" playableClass={playableToClass(playableStatus)} suite="diamonds" />;
    case "diamonds6": return <DiamondsSix text="6" title="DiamondsSix" playableClass={playableToClass(playableStatus)} suite="diamonds" />;
    case "diamonds7": return <DiamondsSeven text="7" title="DiamondsSeven" playableClass={playableToClass(playableStatus)} suite="diamonds" />;
    case "diamonds8": return <DiamondsEight text="8" title="DiamondsEight" playableClass={playableToClass(playableStatus)} suite="diamonds" />;
    case "diamonds9": return <DiamondsNine text="9" title="DiamondsNine" playableClass={playableToClass(playableStatus)} suite="diamonds" />;
    case "diamonds10": return <DiamondsTen text="10" title="DiamondsTen" playableClass={playableToClass(playableStatus)} suite="diamonds" />;
    case "diamondsJ": return <DiamondsJack text="J" title="DiamondsJack" playableClass={playableToClass(playableStatus)} suite="diamonds" />;
    case "diamondsQ": return <DiamondsQueen text="Q" title="DiamondsQueen" playableClass={playableToClass(playableStatus)} suite="diamonds" />;
    case "diamondsK": return <DiamondsKing text="K" title="DiamondsKing" playableClass={playableToClass(playableStatus)} suite="diamonds" />;
    case "backSide": return <img className="backSide" src={backSide} />;
    default: return <img className="backSide" src={backSide} />;
    // case "dummy0": null;
  }
};

export default getCardFace;
