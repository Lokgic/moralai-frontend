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

import { v1 } from "uuid";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import seq from "../static/seqnv.json";

const seqIds = Object.keys(seq);

const postURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/post-dps"
    : "https://moral-ai-backend.herokuapp.com/post-dps";

const bdURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/post-bdp"
    : "https://moral-ai-backend.herokuapp.com/post-bdp";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/"
    : "https://moral-ai-backend.herokuapp.com/";

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
  const [userData, setUserData] = useState({
    trialId: "cf1nv",
    userId: v1(),
    forder: 0,
    version: 0
  });

  const { version, userId, trialId, forder } = userData;
  const [init, setInit] = useState(0);
  const [sid, setSid] = useState("");
  const [bData, setBData] = useState(0);
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
    const getSID = async () => fetch(baseURL + trialId);

    if (sid === "") {
      getSID()
        .then(d => d.json())
        .then(usedSeqIds => {
          const diff = seqIds.filter(x => usedSeqIds.indexOf(x) === -1);

          const draw =
            diff.length > 0
              ? diff[Math.floor(diff.length * Math.random())]
              : seqIds[Math.floor(seqIds.length * Math.random())];
          console.log(diff);
          console.log(draw);
          setSid(draw);
        });
    }
  }, [sid]);
  useEffect(() => {
    if ((sid !== "") & (init < 1)) {
      const pair = PG.parsePairs(seq[sid][0]);

      setPair(pair);
      setInit(1);
      setUserData({ ...userData, forder: seq[sid][0]["feature_order"] });
    }
  }, [sid, init]);
  useEffect(() => {
    const sendBDs = ({ sequence_id }) => {
      setBData(1);

      const bd1 = {
        trialId,
        userId,
        feature: "sequence_id",
        label: sequence_id
      };

      return fetch(bdURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bd1)
      }).then(res => {
        return res;
      });
    };
    if ((bData === 0) & (data.length === 1)) sendBDs({ sequence_id: sid });
  }, [bData, data]);

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

  const getNewPair = () => {
    const newTS = Date.now();

    const time = {
      start: timeStamp / 1000,
      end: newTS / 1000,
      decisionRank: data.length,
      delay: newTS - timeStamp
    };

    const newDP = { pair, chosen, time };

    let newPair =
      init < seq[sid].length
        ? PG.parsePairs(seq[sid][init])
        : [PG.randomPatient(), PG.randomPatient()];

    setPair(newPair);
    setTS(newTS);
    setData([...data, newDP]);
    setInit(init + 1);
    setPopUp(0);
  };

  return init ? (
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
  ) : (
    <InterfaceContainer>
      <FontAwesomeIcon icon={faSpinner} pulse size="6x" color="white" />
    </InterfaceContainer>
  );
};
