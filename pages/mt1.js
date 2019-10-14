import React, { useState, useEffect } from "react";
import {
  UserIconContainer,
  PatientNameButton,
  Dialog,
  DarkOverlay,
  StackedButton
} from "../comp-styled/interface";
import { arrayRandomizer, GeneralGen } from "../components/FeatureHelpers";
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
const postURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/post-dps"
    : "https://moral-ai-backend.herokuapp.com/post-dps";

const bdURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/post-bdp"
    : "https://moral-ai-backend.herokuapp.com/post-bdp";
const featureOrdered = ["cause", "exp", "drug"];
const features = arrayRandomizer(featureOrdered);
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

const midPoint = 12;
const endPoint = midPoint * 2;

// const out = [...Array(55).keys()].map(d=>gen.randomPatient()).join(' ')

export default () => {
  const [init, setInit] = useState(-1);
  const [pair, setPair] = useState([gen.randomPatient(), gen.randomPatient()]);
  const [chosen, setChosen] = useState(-1);
  const [timeStamp, setTS] = useState(Date.now());
  const [data, setData] = useState([]);
  const [popUp, setPopUp] = useState(0);
  const [showReview, setShowReview] = useState(-1);
  const [reviewSeq, setReviewSeq] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [textData, setTextData] = useState([]);
  //   const [justification, setJustification] = useState("enter answer here");
  const handleClick = selected => {
    setChosen(selected);
    setPopUp(1);
  };

  const [userData] = useState({
    trialId: "mt1",
    userId: v1()
  });
  let springObject = {
    prog: Math.min(100, (data.length / midPoint) * 100) + "%",
    config: { mass: 1, tension: 180, friction: 12 }
  };
  const spring = useSpring(springObject);

  const getNewPair = () => {
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
    if (textInput !== "" && showReview > -1) {
      setTextData([...textData, textInput]);
      setTextInput("");
    }
    setPopUp(0);

    if (newData.length === midPoint && showReview < 0) {
      setShowReview(0);
      setPopUp(2);
      const reviewSeq = arrayRandomizer(
        newData.map((d, i) => {
          return {
            ...d,
            originalRank: i,
            chosen: i === 1 || i === 9 ? 1 - d.chosen : d.chosen
          };
        })
      );
      setReviewSeq(reviewSeq);

      const index = newData.length - midPoint;
      setPair(reviewSeq[index].pair);
      setChosen(reviewSeq[index].chosen);
      setTS(newTS);
    } else if (
      newData.length > midPoint &&
      newData.length < endPoint &&
      showReview === 0
    ) {
      const index = newData.length - midPoint;
      setPair(reviewSeq[index].pair);
      setChosen(reviewSeq[index].chosen);
      setTS(newTS);
    } else if (newData.length < midPoint && showReview < 0) {
      let newPair = gen.getNewPair();
      setPair(newPair);
      setTS(newTS);
    } else if (newData.length === endPoint) {
      setShowReview(1);
    }
  };
  useEffect(() => {
    const sendBDs = () => {
      setInit(1);
      const { trialId, userId } = userData;

      const bd1 = {
        trialId,
        userId,
        feature: "feature-order",
        label: features.join("-")
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
    if ((init === 0) & (data.length === 1)) sendBDs();
  }, [init, data]);
  useEffect(() => {
    const sendTDs = (index, textContent) => {
      const { trialId, userId } = userData;

      const bd1 = {
        trialId,
        userId,
        feature: `t_${index}`,
        label: textContent
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
    if ((showReview > -1) & (textData.length > 0)) {
      sendTDs(textData.length - 1, textData[textData.length - 1]);
    }
  }, [textData, showReview]);
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
        for (let f in featureOrdered) {
          payload[`${patients[p]}_${parseInt(f) + 1}`] =
            pair[p][featureOrdered[f]];
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

    const sendMTDP = async ({ pair, chosen, time }, originalRank) => {
      const { trialId, userId } = userData;
      const payload = {
        decision: chosen,
        trialId,
        userId,
        ...time
      };
      const patients = ["left", "right"];
      for (let p in pair) {
        for (let f in featureOrdered) {
          payload[`${patients[p]}_${parseInt(f) + 1}`] =
            pair[p][featureOrdered[f]];
        }

        payload[`${patients[p]}_4`] = originalRank;
        payload[`${patients[p]}_5`] = -999;
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

    if (data.length > 0 && data.length <= midPoint) {
      sendDP(data[data.length - 1]);
    } else if (data.length > midPoint) {
      sendMTDP(
        data[data.length - 1],
        reviewSeq[data.length - midPoint - 1].originalRank
      );
    }
  }, [data]);

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
        style={chosen === 0 && showReview === 0 ? highLightedColor : {}}
      >
        <h4>Patient A </h4>
      </div>
      <div
        className="about-b about"
        style={chosen === 1 && showReview === 0 ? highLightedColor : {}}
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
            <TextInputForm key="textinput">
              <p>
                I chose the patient highlighted in <span>blue</span> because...
              </p>
              <textarea
                placeholder="type answer here"
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
              />
            </TextInputForm>,
            <UserIconContainer area="chooseb" key="icon-area-review">
              <StackedButton
                onClick={() => setChosen(1 - chosen)}
                key={`change-ans-butt`}
                style={{ gridRow: 1, background: "#999", boxShadow: "none" }}
              >
                Change Selection
              </StackedButton>
              <StackedButton
                onClick={textInput === "" ? null : () => getNewPair()}
                key={`confirm-just-butt`}
                style={textInput === "" ? { cursor: "not-allowed" } : null}
              >
                Confirm
              </StackedButton>
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
              valType="t"
              key={`f-cell--${p}_${fi}`}
            >
              <p>{translate(f, pair[p][f])}</p>
            </FeatureCell>
          ))
        ])}
      </FeatureTable>
      {popUp === 1 ? (
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
      ) : popUp === 2 ? (
        <DarkOverlay>
          <Dialog big>
            <div className="dialog-header">
              <h2>Please tell us your thought process behind your decisions</h2>
            </div>
            <div className="message">
              <p>You will be prompted to explain your previous decisions.</p>
              <p>
                Your original selection will be highlighted, but you may click
                the “change selection” button to change your selection if you
                would like.
              </p>
              <p>
                Please write a brief justification for why you chose the patient
                to receive the kidney that you chose.
              </p>
              <p>
                Once you have finished your response, please confirm your answer
                to continue.
              </p>
            </div>
            <div className="buttons">
              <button className="confirm-button" onClick={() => setPopUp(0)}>
                Proceed
              </button>
            </div>
          </Dialog>
        </DarkOverlay>
      ) : null}
      {init === -1 ? (
        <DarkOverlay>
          <Dialog>
            <div className="dialog-header">
              <h2>Keep in mind</h2>
            </div>
            <div className="message">
              <p>As you are deciding on who should get the kidney, remember:</p>
              <p>All patients are 40 years old.</p>
              <p>
                Patients are expected to live less than a year if they do not
                receive the transplant.
              </p>
            </div>
            <div className="buttons">
              <button
                className="confirm-button"
                onClick={() => {
                  setPopUp(0);
                  setInit(0);
                }}
              >
                Proceed
              </button>
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
