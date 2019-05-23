import React, { useState, useEffect } from "react";
import {
  InterfaceContainer,
  BackgroundFrame,
  CoinFlipContainer,
  CFSVGContainer,
  CoinFlipButton,
  UserIconContainer,
  PatientNameButton,
  Dialog,
  DarkOverlay
} from "../comp-styled/interface";
import FeatureDisplay from "../components/FeatureDisplay";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FFn from "../components/FeatureHelpers";
import CF from "../components/CoinFlip";
import { randomUniform as runif } from "d3";
import { v1 } from "uuid";
const postURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/post-dps"
    : "https://moral-ai-backend.herokuapp.com/post-dps";

const bdURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/post-bdp"
    : "https://moral-ai-backend.herokuapp.com/post-bdp";

const PG = new FFn.PairGenerator();

const order = [
  ["age", "drinkingHabitPrediagnosis", "dependents"],
  ["age", "dependents", "drinkingHabitPrediagnosis"],
  ["drinkingHabitPrediagnosis", "age", "dependents"],
  ["drinkingHabitPrediagnosis", "dependents", "age"],
  ["dependents", "drinkingHabitPrediagnosis", "age"],
  ["dependents", "age", "drinkingHabitPrediagnosis"]
];

export default () => {
  const [attenionCheckAt] = useState([
    Math.floor(runif(2, 12)()),
    Math.floor(runif(12, 23)()),
    Math.floor(runif(23, 34)()),
    Math.floor(runif(34, 45)())
  ]);

  const [userData] = useState({
    trialId: 52019,
    userId: v1(),
    forder: Math.floor(6 * Math.random()),
    version: Math.floor(2 * Math.random())
  });

  const { version, userId, trialId, forder } = userData;
  const [init, setInit] = useState(0);
  const [chosen, setChosen] = useState(-1);
  const [timeStamp, setTS] = useState(Date.now());
  const [popUp, setPopUp] = useState(0);
  const [pair, setPair] = useState([PG.randomPatient(), PG.randomPatient()]);
  const endPoint = 44;

  const [data, setData] = useState([]);
  let springObject = {
    prog: Math.min(100, (data.length / endPoint) * 100) + "%",
    config: { mass: 1, tension: 180, friction: 12 }
  };
  const spring = useSpring(springObject);

  const handleClick = selected => {
    setChosen(selected);
    setPopUp(1);
  };

  useEffect(() => {
    const sendBDs = ({ version, forder }) => {
      setInit(1);

      const bd1 = { trialId, userId, feature: "data-viz", label: version + "" };
      const bd2 = {
        trialId,
        userId,
        feature: "feature-order",
        label: forder + ""
      };
      return fetch(bdURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bd1)
      })
        .then(res =>
          fetch(bdURL, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(bd2)
          })
        )
        .then(res => {
          return res;
        });
    };
    if (init < 1) sendBDs({ version, forder });
  }, [init]);

  useEffect(() => {
    const sendDP = async ({ pair, chosen, time }) => {
      const { trialId, userId } = userData;
      const payload = {
        decision: chosen,
        trialId,
        userId,
        ...time
      };
      const patients = ["left", "right"];
      for (let p in pair) {
        for (let f in PG.props.features) {
          payload[`${patients[p]}_${parseInt(f) + 1}`] =
            pair[p][PG.props.features[f]];
        }
        for (let d of [4, 5]) {
          payload[`${patients[p]}_${d}`] = -999;
        }
      }

      const rawResponse = await fetch(postURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const res = await rawResponse;
    };
    if (data.length > 0) sendDP(data[data.length - 1]);
  }, [data]);
  const getNewPair = selected => {
    const newTS = Date.now();

    const time = {
      start: timeStamp / 1000,
      end: newTS / 1000,
      decisionRank: data.length,
      delay: newTS - timeStamp
    };

    const newDP = { pair, chosen, time };

    let newPair =
      attenionCheckAt.indexOf(data.length + 1) !== -1
        ? PG.attentionPair()
        : [PG.randomPatient(), PG.randomPatient()];

    setPair(newPair);
    setTS(newTS);
    setData([...data, newDP]);
    setPopUp(0);
  };

  return (
    <InterfaceContainer>
      <BackgroundFrame col="1/span 2" row="3/ span 4" />
      <BackgroundFrame col="3/span 2" row="3/ span 4" />
      <div className="progress">
        <animated.div className="p-bar" style={{ width: spring.prog }} />
      </div>
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

        order[forder].map((f, i) => (
          <FeatureDisplay
            patient={d}
            feature={f}
            value={pair[d][f]}
            index={i}
            key={`fdis-${d + f}`}
            dynamic={version === 1}
          />
        ))
      ])}

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
    </InterfaceContainer>
  );
};
