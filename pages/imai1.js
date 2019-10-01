import React, { useState, useEffect } from "react";
import {
  UserIconContainer,
  PatientNameButton,
  Dialog,
  DarkOverlay
} from "../comp-styled/interface";
import { PredefinedSeq, seqRandomizer } from "../components/FeatureHelpers";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ComparisonContainer,
  BackgroundFrame,
  FeatureCell,
  FeatureTable,
  FeatureHeader
} from "../comp-styled/featureDisplayComps";

import { v1 } from "uuid";
const features =
  Math.random() < 0.5
    ? ["age", "exp", "dependents"]
    : ["age", "dependents", "exp"];
const featuresPredicates = {
  age: "Age",
  exp: "Years of Life Expectancy After Transplantation",
  dependents: "Number of Young Dependent(s)"
};

const originaSeq = [...Array(10).keys()].map(i => [
  { exp: 1 + i * 2, dependents: 4, age: 40 },
  { exp: 20, dependents: 0, age: 40 }
]);
const midPoint = 10;
const endPoint = 20;

const seq = [...seqRandomizer(originaSeq), ...seqRandomizer(originaSeq)];
// const out = [...Array(55).keys()].map(d=>gen.randomPatient()).join(' ')
const progInterval = [...Array(midPoint).keys()]
  .map(() => Math.random())
  .sort((a, b) => a - b);

export default () => {
  const [ass, setAss] = useState(Math.floor(Math.random() * 2));
  const [fakeProg, setFakeProg] = useState(0);
  const [showAss, setShowAss] = useState(-1);
  const [pairSeq, setSeq] = useState(
    new PredefinedSeq({
      seq,
      features
    })
  );
  const [pair, setPair] = useState(pairSeq.getCurrent());
  const [chosen, setChosen] = useState(-1);
  const [timeStamp, setTS] = useState(Date.now());
  const [data, setData] = useState([]);
  const [popUp, setPopUp] = useState(0);
  const handleClick = selected => {
    setChosen(selected);
    setPopUp(1);
  };

  const [userData] = useState({
    trialId: "imai1",
    userId: v1(),
    asse: ass
  });
  let springObject = {
    prog: Math.min(100, (data.length / endPoint) * 100) + "%",
    config: { mass: 1, tension: 180, friction: 12 }
  };
  const spring = useSpring(springObject);

  const getNewPair = selected => {
    const newTS = Date.now();

    const time = {
      start: timeStamp / 1000,
      end: newTS / 1000,
      decisionRank: data.length,
      delay: newTS - timeStamp
    };

    // const newDP = { pair, chosen, time };
    const newData = [...data, { pair, chosen, time }];

    setData(newData);

    let newPair = pairSeq.getNext();
    setPair(newPair);
    setTS(newTS);
    setPopUp(0);
    if (newData.length === midPoint && showAss < 0) {
      setShowAss(0);
    }
  };

  useEffect(() => {
    if (showAss === 0 && fakeProg < progInterval.length) {
      const totalTime = 10000;
      const timeLine = progInterval.map((d, i) =>
        i === 0 ? d * totalTime : (d - progInterval[i - 1]) * totalTime
      );

      setTimeout(
        () =>
          fakeProg + 1 < progInterval.length
            ? setFakeProg(fakeProg + 1)
            : setShowAss(1),
        timeLine[fakeProg]
      );
    }
  }, [showAss, fakeProg]);
  return (
    <ComparisonContainer>
      <BackgroundFrame col="1/-1" row="3/-1" />
      <div className="progress">
        <animated.div className="p-bar" style={{ width: spring.prog }} />
      </div>
      <div className="about-a about">
        <h4>Patient A </h4>
      </div>
      <div className="about-b about">
        <h4>Patient B</h4>
      </div>
      {[0, 1].map(d => [
        <UserIconContainer
          side={d}
          key={`user-iconcon-${d}`}
          area={d === 0 ? "choosea" : "chooseb"}
        >
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
        </UserIconContainer>
      ])}
      <FeatureTable n={features.length}>
        {features.map((f, fi) => [
          <FeatureHeader key={`fcell_${f}`} fi={fi}>
            <div>{featuresPredicates[f]}</div>
          </FeatureHeader>,
          [0, 1].map(p => (
            <FeatureCell
              side={p}
              fi={fi}
              valType="n"
              key={`f-cell--${p}_${fi}`}
            >
              <p>{pair[p][f]}</p>
            </FeatureCell>
          ))
        ])}
      </FeatureTable>
      {popUp ? (
        <DarkOverlay>
          <Dialog>
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
      {showAss === 0 || showAss === 1 ? (
        <DarkOverlay>
          <Dialog big>
            <div className="dialog-header">
              <h2>Moral Judgment Assessment</h2>
            </div>
            {showAss === 0
              ? [
                  <div className="message" key="show-ass-msg-0">
                    <div className="ass-spinner">
                      <FontAwesomeIcon icon="spinner" size="3x" spin />
                    </div>
                    <p className="centering">Please wait...</p>
                    <p className="centering">
                      {Math.round(progInterval[fakeProg] * 100)}%
                    </p>
                    <p className="light">
                      Decision {fakeProg + 1}: Patient{" "}
                      {["A", "B"][data[fakeProg].chosen]} was given a kidney...
                      {/* {features.map(
                        d =>
                          `${featuresPredicates[d]}: ${data[fakeProg].pair[data[fakeProg].chosen][d]} `
                      )} */}
                    </p>
                  </div>,
                  <div className="analysis-progress" key="show-ass-analysis-0">
                    <div
                      className="anal-bar"
                      style={{
                        width: `${100 * progInterval[fakeProg]}%`
                      }}
                    />
                  </div>
                ]
              : [
                  <div className="message" key="show-ass-msg-1">
                    <p>According to our AI model, you care a lot about</p>
                    <p className="choice-message">
                      {
                        [
                          "the life expectancy of patients",
                          "how many dependents patients have"
                        ][ass]
                      }
                    </p>
                    <p>when making decisions about who will get a kidney.</p>
                  </div>,
                  <div className="buttons" key="show-ass-butt-1">
                    <button
                      className="confirm-button"
                      onClick={() => setShowAss(2)}
                    >
                      I have taken note of my assessment.
                    </button>
                  </div>
                ]}
          </Dialog>
        </DarkOverlay>
      ) : null}
      {data.length === endPoint ? (
        <DarkOverlay>
          <Dialog>
            <div className="dialog-header">
              <h2>Completed</h2>
            </div>
            <div className="message">
              <p>your unique code:</p>
              <p>{userData.userId}</p>
              <p>
                Please enter this code and complete the rest of your Qualtric
                survey
              </p>
            </div>
          </Dialog>
        </DarkOverlay>
      ) : null}
    </ComparisonContainer>
  );
};
