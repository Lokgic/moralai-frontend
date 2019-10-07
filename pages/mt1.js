import React, { useState, useEffect } from "react";
import {
  UserIconContainer,
  PatientNameButton,
  Dialog,
  DarkOverlay
} from "../comp-styled/interface";
import {
  PredefinedSeq,
  seqRandomizer,
  arrayRandomizer,
  GeneralGen
} from "../components/FeatureHelpers";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ComparisonContainer,
  BackgroundFrame,
  FeatureCell,
  FeatureTable,
  FeatureHeader,
  TextInputForm
} from "../comp-styled/featureDisplayComps";
import { theme } from "../components/Page";
import { v1 } from "uuid";
const features = arrayRandomizer(["cause", "exp", "drug"]);
// Math.random() < 0.5
//   ? ["age", "exp", "dependents"]
//   : ["age", "dependents", "exp"];
const featuresPredicates = {
  drug: "Drug Use",
  exp: "Years of Life Expectancy After Transplantation",
  cause: "Primary Cause of Kidney Failure"
};

const ranges = {
  drug: [0, 2],
  exp: [2, 25],
  cause: [0, 1]
};

const valType = {
  drug: "t",
  exp: "n",
  cause: "t"
};

const translate = (feature, value) => {
  switch (feature) {
    case "exp":
      return value;
      break;
    case "drug":
      return ["None", "Light", "Heavy"][value];
      break;
    case "cause":
      return ["Hereditary", "Obesity"][value];
      break;
  }
};

const highLightedColor = { background: theme.tertiaryDark };

const gen = new GeneralGen({ features, ranges });

// const midPoint = 10;
const endPoint = 3;

// const out = [...Array(55).keys()].map(d=>gen.randomPatient()).join(' ')

export default () => {
  //   const [ass, setAss] = useState(Math.floor(Math.random() * 2));
  //   const [fakeProg, setFakeProg] = useState(0);
  //   const [showAss, setShowAss] = useState(-1);
  //   const [pairSeq, setSeq] = useState(
  //     new PredefinedSeq({
  //       seq,
  //       features
  //     })
  //   );
  const [pair, setPair] = useState([gen.randomPatient(), gen.randomPatient()]);
  const [chosen, setChosen] = useState(-1);
  const [timeStamp, setTS] = useState(Date.now());
  const [data, setData] = useState([]);
  const [popUp, setPopUp] = useState(0);
  const [showReview, setShowReview] = useState(-1);
  const [highlighted, setHighLighted] = useState(-1);
  //   const [justification, setJustification] = useState("enter answer here");
  const handleClick = selected => {
    setChosen(selected);
    setPopUp(1);
  };

  const [userData] = useState({
    trialId: "mg1",
    userId: v1()
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

    setPopUp(0);
    console.log(data);
    if (newData.length === endPoint && showReview < 0) {
      setShowReview(0);
      setPair(newData[1].pair);
      setHighLighted(1 - newData[1].chosen);
    } else {
      let newPair = gen.getNewPair();
      setPair(newPair);
      setTS(newTS);
    }
  };

  return (
    <ComparisonContainer>
      <BackgroundFrame col="1/-1" row="3/-1" />
      {showReview === -1 ? (
        <div className="progress">
          <animated.div className="p-bar" style={{ width: spring.prog }} />
        </div>
      ) : null}

      <div
        className="about-a about"
        style={highlighted === 0 ? highLightedColor : {}}
      >
        <h4>Patient A </h4>
      </div>
      <div
        className="about-b about"
        style={highlighted === 1 ? highLightedColor : {}}
      >
        <h4>Patient B</h4>
      </div>
      {showReview === -1
        ? [0, 1].map(d => [
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
          ])
        : [
            <UserIconContainer area="choosea">
              <FontAwesomeIcon
                icon="user-friends"
                className="user-icon"
                key={`changeanswer`}
              />
              <PatientNameButton
                onClick={() => setHighLighted(1 - highlighted)}
                key={`change-ans-butt`}
              >
                Change Selection
              </PatientNameButton>
            </UserIconContainer>,
            <TextInputForm>
              <p>I chose this patient because...</p>
              <textarea placeholder="type answer here" />
            </TextInputForm>,
            <UserIconContainer area="chooseb">
              <FontAwesomeIcon
                icon="arrow-alt-circle-right"
                className="user-icon"
                key={`confirm-just`}
              />
              <PatientNameButton
                onClick={() => setShowReview(1)}
                key={`confirm-just-butt`}
              >
                Confirm Answer
              </PatientNameButton>
            </UserIconContainer>
          ]}
      <FeatureTable n={features.length}>
        {features.map((f, fi) => [
          <FeatureHeader key={`fcell_${f}`} fi={fi}>
            <div>{featuresPredicates[f]}</div>
          </FeatureHeader>,
          [0, 1].map(p => (
            <FeatureCell
              side={p}
              fi={fi}
              valType={valType[f]}
              key={`f-cell--${p}_${fi}`}
            >
              <p>{translate(f, pair[p][f])}</p>
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

      {showReview === 1 ? (
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
