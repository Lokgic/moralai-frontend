import React, { useState } from "react";
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

export default () => {
  const attenionCheckAt = [
    Math.floor(runif(2, 12)()),
    Math.floor(runif(12, 23)()),
    Math.floor(runif(23, 34)()),
    Math.floor(runif(34, 45)())
  ];

  const PG = new FFn.PairGenerator();

  const [userData] = useState({
    trialId: "coinflip1-pretest",
    userId: v1(),
    forder: PG.getRandomOrder(),
    version: Math.floor(2 * Math.random())
  });

  const { version, userId, trialId, forder } = userData;

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
  const getNewPair = selected => {
    const newTS = Date.now();

    const time = {
      start: timeStamp,
      end: newTS,
      decisionRank: data.length,
      delay: newTS - timeStamp
    };

    const newDP = { pair, chosen, time };

    let newPair =
      attenionCheckAt.indexOf(data.length + 1) !== -1
        ? PG.attentionPair()
        : [PG.randomPatient(), PG.randomPatient()];
    console.log(newDP);
    setPair(newPair);
    setTS(newTS);
    setData([...data, newDP]);
    setPopUp(0);
    console.log(data);
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
        PG.props.features.map((f, i) => (
          <FeatureDisplay
            patient={d}
            feature={f}
            value={pair[d][f]}
            index={forder.indexOf(f)}
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
