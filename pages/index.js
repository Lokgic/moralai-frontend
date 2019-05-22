import React, { useState } from "react";
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
import FeatureDisplay from "../components/FeatureDisplay";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FFn from "../components/FeatureHelpers";
import CF from "../components/CoinFlip";
import { randomUniform as runif } from "d3";

const attenionCheckAt = [
  Math.floor(runif(2, 12)()),
  Math.floor(runif(12, 23)()),
  Math.floor(runif(23, 34)()),
  Math.floor(runif(34, 45)())
];

const PG = new FFn.PairGenerator();

export default props => {
  let order = [...PG.props.features];
  let currentIndex = order.length,
    tempValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    tempValue = order[currentIndex];
    order[currentIndex] = order[randomIndex];
    order[randomIndex] = tempValue;
  }
  const [forder, setF] = useState(order);
  const [chosen, setChosen] = useState(-1);
  const [popUp, setPopUp] = useState(0);
  const [pair, setPair] = useState([PG.randomPatient(), PG.randomPatient()]);
  const [n, setN] = useState(0);

  let springObject = { from: {} };
  for (let fea of forder) {
    for (let pat in pair) {
      const denominator = fea === "age" ? 55 : 5;
      springObject[pat + "-" + fea] = pair[pat][fea];
      springObject[pat + "-" + fea + "viz"] =
        fea === "age"
          ? (Math.max(0, pair[pat][fea] - 20) / denominator) * 100 + "%"
          : (pair[pat][fea] / denominator) * 100 + "%";
      springObject.from[pat + "-" + fea] = 0;
      springObject.from[pat + "-" + fea + "viz"] = 0 + "%";
    }
  }

  springObject.dialog = popUp ? 15 : 0;
  const spring = useSpring(springObject);

  let data = [];

  const handleClick = selected => {
    setChosen(selected);
    setPopUp(1);
  };
  const getNewPair = selected => {
    setN(n + 1);
    let newPair =
      attenionCheckAt.indexOf(n) !== -1
        ? PG.attentionPair()
        : [PG.randomPatient(), PG.randomPatient()];
    console.log(n);
    setPair(newPair);
    setPopUp(0);
  };

  return (
    <InterfaceContainer>
      <BackgroundFrame col="1/span 2" row="2/6" />
      <BackgroundFrame col="3/span 2" row="2/6" />
      <div className="about-a about">
        <h4>Patient A</h4>
      </div>
      <div className="about-b about">
        <h4>Patient B</h4>
      </div>

      <CoinFlipContainer>
        <CFSVGContainer>
          <CF />
        </CFSVGContainer>
        <CoinFlipButton onClick={() => handleClick(2)}>
          Flip a coin
        </CoinFlipButton>
      </CoinFlipContainer>
      {[0, 1].map(d => [
        <UserIconContainer side={d} key={`user-iconcon-${d}`}>
          <FontAwesomeIcon
            icon="user"
            className="user-icon"
            key={`user-icon-${d}`}
          />

          <PatientNameButton
            onClick={() => handleClick(d)}
            key={`PatientNameButton-${d}`}
          >
            Choose {["A", "B"][d]}
          </PatientNameButton>
        </UserIconContainer>,
        forder.map((f, i) => (
          <FeatureDisplay
            patient={d}
            feature={f}
            value={pair[d][f]}
            index={i}
            key={`fdis-${d + f}`}
          />
        ))
        // ...forder.map((f, i) => (
        //   <FeatureContainer side={d} index={i} key={`f-con-${d}-${i}`}>
        //     <FeatureBackgroundColor
        //       key={`f-bg-${d}-${i}`}
        //       row="2 / span 3"
        //       col="1/-1"
        //     />
        //     <FeatureViz>
        //       <animated.div
        //         className="left"
        //         style={{ width: spring[d + "-" + f + "viz"] }}
        //       />
        //     </FeatureViz>
        //     <FeatureIconContainer
        //       index={i}
        //       side={d}
        //       key={`key_for_fconc_${d}_${i}_${f}`}
        //     >
        //       <FontAwesomeIcon
        //         key={`key_for_fcon_${f}_${i}_${d}`}
        //         icon={FFn.graphicSelector(f)}
        //       />
        //     </FeatureIconContainer>
        //     <PredicateContainer
        //       index={i}
        //       key={`key_for_pcon_${d}_${i}_${f}`}
        //       dead={f === "age" && pair[d][i] === 0}
        //     >
        //       <p>{FFn.predicateTranslater(f)}</p>
        //     </PredicateContainer>
        //     <ValueContainer
        //       index={i}
        //       key={`key_for_vcon_${d}_${i}_${f}`}
        //       dead={pair[d][i]}
        //     >
        //       {f === "age" && pair[d][i] === 0 ? (
        //         <p>{FFn.valueTranslater(f, pair[d][i])}</p>
        //       ) : (
        //         <animated.p>
        //           {spring[d + "-" + f].interpolate(x => x.toFixed(0))}
        //         </animated.p>
        //       )}

        //       <p>{FFn.valueTranslater(f, pair[d][i])}</p>
        //     </ValueContainer>
        //   </FeatureContainer>
        // ))
      ])}
      {forder.map(feature => {})}
      {popUp ? (
        <DarkOverlay>
          <Dialog top={popUp ? 15 : 0}>
            <div className="dialog-header">
              <h2>Are you sure?</h2>
            </div>
            <div className="message">
              <p>You have decided to...</p>
              <p className="choice-message">
                {
                  ["give A the kidney", "give B the kidney", "flip a coin"][
                    chosen
                  ]
                }
              </p>
            </div>
            <div className="buttons">
              <button className="confirm-button" onClick={() => getNewPair()}>
                Yes, proceed
              </button>
              <button onClick={() => setPopUp(0)}>No, go back </button>
            </div>
          </Dialog>
        </DarkOverlay>
      ) : null}
    </InterfaceContainer>
  );
};
