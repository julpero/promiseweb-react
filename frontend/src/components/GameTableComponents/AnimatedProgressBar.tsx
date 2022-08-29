import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { config, useSpring } from "react-spring";

const AnimatedProgressBar = () => {
  const [flip, setFlip] = useState(false);
  const { x } = useSpring({
    reset: true,
    reverse: flip,
    from: { x: 0 },
    x: 100,
    config: config.wobbly,
    delay: 100,
    onRest: () => setFlip(!flip),
  });
  return (
    <ProgressBar striped animated variant="info" now={x.get()} max={100} />
  );

};

export default AnimatedProgressBar;
