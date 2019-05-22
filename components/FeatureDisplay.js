import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FFn from "../components/FeatureHelpers";
import {
  InterfaceContainer,
  BackgroundFrame,
  CoinFlipContainer,
  CFSVGContainer,
  CoinFlipButton,
  UserIconContainer,
  PatientNameButton,
  FeatureContainer,
  FeatureBackgroundColor,
  FeatureIconContainer,
  ValueContainer,
  PredicateContainer,
  Dialog,
  DarkOverlay,
  FeatureViz
} from "../comp-styled/interface";

export default ({ patient, feature, value, index }) => {
  const [icon, setIcon] = useState(
    <FontAwesomeIcon icon={FFn.graphicSelector(feature)} />
  );
  useEffect(
    () => setIcon(<FontAwesomeIcon icon={FFn.graphicSelector(feature)} />),
    [feature]
  );
  const denominator = feature === "age" ? 55 : 5;
  const dead = feature === "age" && value === 0;
  const obj = {
    from: {
      val: 0,
      percentage: "0%"
    },
    val: value,
    percentage:
      feature === "age"
        ? (Math.max(0, value - 20) / denominator) * 100 + "%"
        : (value / denominator) * 100 + "%"
  };
  const spring = useSpring(obj);

  // console.log(obj);
  return (
    <FeatureContainer side={patient} index={index}>
      <FeatureViz>
        <animated.div className="left" style={{ width: spring.percentage }} />
      </FeatureViz>
      <FeatureIconContainer index={index} side={patient}>
        {/* <FontAwesomeIcon icon={FFn.graphicSelector(feature)} /> */}
        {icon}
      </FeatureIconContainer>
      <ValueContainer index={index}>
        {dead ? (
          <p>{FFn.valueTranslater(feature, value)}</p>
        ) : (
          <animated.p>{spring.val.interpolate(x => x.toFixed(0))}</animated.p>
        )}

        {/* <p>{FFn.valueTranslater(feature, pair[d][i])}</p> */}
      </ValueContainer>
      <PredicateContainer index={index} dead={dead}>
        <p>{FFn.predicateTranslater(feature)}</p>
      </PredicateContainer>
    </FeatureContainer>
  );
};
