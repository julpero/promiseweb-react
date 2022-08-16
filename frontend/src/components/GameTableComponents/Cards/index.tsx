import React from "react";
import { xxx as SpadesAce} from "./0_1";
import { xxx as SpadesTwo } from "./0_2";

const getCardFace = (cardStr: string) => {
  console.log(cardStr);
  switch (cardStr) {
    case "spadesA": return <SpadesAce />;
    case "spades2": return <SpadesTwo />;
  }
  return null;
};

export default getCardFace;
