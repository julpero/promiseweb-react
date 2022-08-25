import { easings } from "react-spring";
import { randomNegToPos } from "../common/commonFunctions";

interface IuiSpringObjectCoord {
  x: number,
  y: number,
  rotate: number,
}

interface IuiSpringObjectTo extends IuiSpringObjectCoord {
  onStart: () => void,
  onRest: () => void,
}

interface IuiSpringObjectConfig {
  duration: number,
  easing: (x: number) => number, // easing: easings.easeOutQuint
}

export interface IuiSpringObject {
  from: IuiSpringObjectCoord,
  to: IuiSpringObjectTo[],
  config: IuiSpringObjectConfig,
  delay: number,
}

export const commonAnimationObject = (): IuiSpringObject => {
  return {
    from: { x: 0, y: 0, rotate: 0},
    config: { duration: 500, easing: easings.easeOutQuint },
    delay: 0,
    to: [{
      x: randomNegToPos(2),
      y: randomNegToPos(2),
      rotate: randomNegToPos(5),
      onStart: () => { return; },
      onRest: () => { return; },
    }],
  };
};

export const plainAnimationObject = {to: {x: 0, y: 0, rotate: 0}};
