import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { config, useSpring } from "react-spring";

interface IProps {
  key: number,
  min: number,
  max: number,
  initialX: number,
  variant?: string,
  isChild?: boolean,
}

const AnimatedProgressBar = ({key, min, max, initialX, variant, isChild}: IProps) => {
  const [flip, setFlip] = useState(false);
  const { x } = useSpring({
    reset: true,
    reverse: flip,
    from: { x: 0 },
    x: initialX,
    config: config.wobbly,
    delay: 100,
    onRest: () => setFlip(!flip),
  });
  return (
    <ProgressBar isChild={isChild} striped animated variant={variant ?? "info"} min={min} now={x.get()} max={max} key={key} />
  );

};

export default AnimatedProgressBar;
