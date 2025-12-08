import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { config, useSpring } from "@react-spring/web";

interface IProps {
  pbKey: number,
  min: number,
  max: number,
  initialX: number,
  variant?: string,
  isChild?: boolean,
}

const AnimatedProgressBar = ({pbKey, min, max, initialX, variant, isChild}: IProps) => {
  const [flip, setFlip] = useState(false);
  const { x } = useSpring({
    reset: true,
    reverse: flip,
    from: { x: 0 },
    x: initialX,
    config: config.slow,
    delay: 100,
    onRest: () => setFlip(!flip),
  });
  return (
    <ProgressBar
      isChild={isChild}
      striped
      animated
      variant={variant ?? "info"}
      min={min}
      now={x.get()}
      max={max}
      key={pbKey}
    />
  );

};

export default AnimatedProgressBar;
