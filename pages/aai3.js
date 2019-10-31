import React, { useState, useEffect } from "react";

import {
  UserIconContainer,
  PatientNameButton,
  Dialog,
  DarkOverlay,
  LikertScale,
  LikertOption
} from "../comp-styled/interface";
import {
  PredefinedSeq,
  seqRandomizer,
  arrayRandomizer
} from "../components/FeatureHelpers";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ComparisonContainer,
  BackgroundFrame,
  FeatureCell,
  FeatureTable,
  FeatureHeader
} from "../comp-styled/featureDisplayComps";

const makePostObject = payload => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  };
};

const postURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/post-dps"
    : "https://moral-ai-backend.herokuapp.com/post-dps";

const bdURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/post-bdp"
    : "https://moral-ai-backend.herokuapp.com/post-bdp";

const samplingURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/mt2g"
    : "https://moral-ai-backend.herokuapp.com/mt2g";

import { v1 } from "uuid";

const featuresOrdered = ["exp", "dependents", "age"];

const dataTemplate = {
  left_1: -999,
  left_2: -999,
  left_3: -999,
  left_4: -999,
  left_5: -999,
  right_1: -999,
  right_2: -999,
  right_3: -999,
  right_4: -999,
  right_5: -999
};

const features = arrayRandomizer(featuresOrdered);

const featuresPredicates = {
  age: "Age",
  exp: "Years of Life Expectancy After Transplantation",
  dependents: "Number of Young Dependent(s)"
};

const LikertScaleTexts = [
  "strongly disagree",
  "disagree",
  "neutral",
  "agree",
  "strongly agree"
];
const preQuestions = [
  // "record of violent crime",
  // "record of non-violent crime",
  // "sex/gender",
  // "race",
  // "occupation",
  // "wealth",
  // "current mental health",
  // "whether a patient has previously donated a kidney",
  // "whether a patient has previously received a kidney donation",
  // "quality of life if given the transplant",
  // "past contribution to society",
  // "projected contribution to society",
  "political belief",
  "religious belief"
];

const totalTime = 10000;

const originaSeq = [
  [{ exp: 20, dependents: 1, age: 40 }, { exp: 10, dependents: 4, age: 40 }],
  [{ exp: 16, dependents: 0, age: 40 }, { exp: 6, dependents: 3, age: 40 }],
  [{ exp: 13, dependents: 3, age: 40 }, { exp: 10, dependents: 4, age: 40 }],
  [{ exp: 12, dependents: 1, age: 40 }, { exp: 8, dependents: 3, age: 40 }],
  [{ exp: 13, dependents: 2, age: 40 }, { exp: 10, dependents: 4, age: 40 }],
  [{ exp: 7, dependents: 1, age: 40 }, { exp: 5, dependents: 2, age: 40 }],
  [{ exp: 8, dependents: 0, age: 40 }, { exp: 3, dependents: 1, age: 40 }],
  [{ exp: 18, dependents: 0, age: 40 }, { exp: 10, dependents: 1, age: 40 }],
  [{ exp: 10, dependents: 0, age: 40 }, { exp: 5, dependents: 3, age: 40 }],
  [{ exp: 11, dependents: 3, age: 40 }, { exp: 10, dependents: 4, age: 40 }],
  [{ exp: 12, dependents: 1, age: 40 }, { exp: 10, dependents: 2, age: 40 }],
  [{ exp: 13, dependents: 0, age: 40 }, { exp: 5, dependents: 4, age: 40 }],
  [{ exp: 14, dependents: 2, age: 40 }, { exp: 12, dependents: 3, age: 40 }],
  [{ exp: 14, dependents: 1, age: 40 }, { exp: 7, dependents: 4, age: 40 }],
  [{ exp: 15, dependents: 2, age: 40 }, { exp: 10, dependents: 3, age: 40 }],
  [{ exp: 16, dependents: 0, age: 40 }, { exp: 9, dependents: 1, age: 40 }],
  [{ exp: 17, dependents: 0, age: 40 }, { exp: 4, dependents: 2, age: 40 }],
  [{ exp: 18, dependents: 2, age: 40 }, { exp: 15, dependents: 4, age: 40 }],
  [{ exp: 20, dependents: 0, age: 40 }, { exp: 11, dependents: 4, age: 40 }],
  [{ exp: 20, dependents: 1, age: 40 }, { exp: 15, dependents: 2, age: 40 }],
  [{ exp: 20, dependents: 0, age: 40 }, { exp: 1, dependents: 0, age: 40 }]
];

const endPoint = originaSeq.length;

const seq = [...seqRandomizer(originaSeq)];
// console.log(seq);
// const out = [...Array(55).keys()].map(d=>gen.randomPatient()).join(' ')
const progInterval = [...Array(preQuestions.length).keys()]
  .map(() => Math.random())
  .sort((a, b) => a - b);

export default props => {
  // const [controlGroup] = useState(props.control === true);
  const [ass, setAss] =
    props.forcedState >= 0 ? useState(props.forcedState) : useState(-2);
  // const ass = 1;
  console.log(ass);
  const [stage, setStage] = useState(-1);
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
  const [predata, setPredata] = useState([]);
  const [popUp, setPopUp] = useState(0);
  const handleClick = selected => {
    setChosen(selected);
    setPopUp(1);
  };

  const [userData] = useState({
    trialId: "aai3",
    userId: v1(),
    ass
  });
  let springObject = {
    prog: Math.min(100, (data.length / endPoint) * 100) + "%",
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
    // console.log(newData);
    let newPair = pairSeq.getNext();
    setPair(newPair);
    setTS(newTS);
    setPopUp(0);
    // if (newData.length === midPoint && showAss < 0) {
    //   setShowAss(0);
    // }
  };
  const getNewPrequestion = () => {
    const newTS = Date.now();
    const time = {
      start: timeStamp / 1000,
      end: newTS / 1000,
      decisionRank: -1,
      delay: newTS - timeStamp
    };

    // const newDP = { pair, chosen, time };
    const newPredata = [...predata, { decision: chosen, time }];

    setPredata(newPredata);

    setTS(newTS);
    setChosen(-1);
    if (newPredata.length === preQuestions.length && (ass === 1 || ass == 2)) {
      setStage(2);
      setShowAss(0);
    } else if (
      newPredata.length === preQuestions.length &&
      (ass === 3 || ass == 4)
    ) {
      setStage(2);
      setShowAss(1);
    } else if (newPredata.length === preQuestions.length && ass === 0) {
      setStage(3);
    }
  };
  // track ass response
  // useEffect(() => {
  //   if (assResponse > -1 && stage === 2) {
  //     const { trialId, userId } = userData;
  //     const postObject = makePostObject({
  //       trialId,
  //       userId,
  //       feature: "response",
  //       label: assResponse
  //     });

  //     fetch(bdURL, postObject);
  //     // move to decision phase
  //     setStage(3);
  //   }
  // }, [assResponse, stage]);

  // fakeprog effect
  useEffect(() => {
    if (showAss === 0 && fakeProg < progInterval.length) {
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
  }, [showAss, fakeProg, ass]);

  // fetch assessment at the beginning
  useEffect(() => {
    // const { trialId, userId } = userData;
    // const sendBDs = async postObject => {
    //   const response = await fetch(bdURL, postObject);
    //   return response;
    // };
    const fetchAss = async () => {
      const randass = await fetch(samplingURL);
      return randass.json();
    };
    if (ass === -2) {
      fetchAss().then(res => setAss(res));
    }

    setStage(0);
  }, [ass]);

  // data sender
  useEffect(() => {
    const { trialId, userId } = userData;
    const sendDP = async postObject => {
      const rawResponse = await fetch(postURL, postObject);
      // console.log(rawResponse);
      return rawResponse;
    };

    if (data.length > 0) {
      const { pair, chosen, time } = data[data.length - 1];
      const payload = {
        ...dataTemplate,
        decision: chosen,
        trialId,
        userId,
        ...time
      };
      const patients = ["left", "right"];
      for (let p in pair) {
        for (let f in featuresOrdered) {
          payload[`${patients[p]}_${parseInt(f) + 1}`] =
            pair[p][featuresOrdered[f]];
        }
      }
      sendDP(makePostObject(payload));
    }
  }, [data]);

  useEffect(() => {
    const { trialId, userId } = userData;
    const sendDP = async postObject => {
      const rawResponse = await fetch(postURL, postObject);
      // console.log(rawResponse);
      return rawResponse;
    };
    if (predata.length > 0) {
      const left_5 = predata.length - 1;
      const { decision, time } = predata[left_5];
      const payload = {
        ...dataTemplate,
        left_5,
        decision,
        userId,
        trialId,
        ...time
      };
      sendDP(makePostObject(payload));
    }
  }, [predata]);
  // track stage to stager sending behavioral data
  useEffect(() => {
    const { trialId, userId } = userData;
    const sendBDs = async postObject => {
      const response = await fetch(bdURL, postObject);
      return response;
    };

    if (stage === 2) {
      const payload = makePostObject({
        trialId,
        userId,
        feature: "group",
        label: ass
      });
      sendBDs(payload);
    }
    // if (stage === 3) {
    //   const payload = makePostObject({
    //     trialId,
    //     userId,
    //     feature: "feature-order",
    //     label: features.join("-")
    //   });
    //   sendBDs(payload);
    // }
  }, [stage]);

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
      {stage === 0 ? (
        <DarkOverlay>
          <Dialog big>
            <div className="dialog-header">
              <h2>Introduction</h2>
            </div>
            <div className="message">
              <p>
                In this activity, we will ask you about how important you think
                some features of patients should be when deciding who should
                receive a kidney when there are not enough to go around.
              </p>
              {ass === 1 || ass == 2 ? (
                <p className="choice-message">
                  An{" "}
                  <span className="emph">
                    artificially intelligent(AI) agent
                  </span>{" "}
                  will use your responses to these questions to predict how you
                  will make decisions in the next part of the activity.
                </p>
              ) : ass === 3 || ass === 4 ? (
                <p className="choice-message">
                  A{" "}
                  <span className="emph">
                    psychological tests developed by expert psychologists
                  </span>{" "}
                  will be used to analyze your responses to these questions to
                  predict how you will make decisions in the next part of the
                  activity.
                </p>
              ) : null}
            </div>
            <div className="buttons">
              <button
                className="confirm-button"
                onClick={() => {
                  setStage(1);
                }}
              >
                {ass === 1 || ass == 2
                  ? "I understand that my response will be evaluated by an AI agent"
                  : ass === 3 || ass === 4
                  ? "I understand that my response will be evaluated by a psychological test"
                  : "Proceed"}
              </button>
            </div>
          </Dialog>
        </DarkOverlay>
      ) : null}
      {stage === 4 ? (
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
      ) : null}

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
      {stage === 1 ? (
        <DarkOverlay>
          <Dialog big>
            <div className="dialog-header">
              <h2>
                {ass === 0
                  ? "Moral Personality Assessment"
                  : ass > 0 && ass < 3
                  ? "AI Moral Personality Assessment"
                  : "Psychological Moral Personality Assessment"}
              </h2>
            </div>
            <div className="message">
              <p>
                Do you agree with the following statement?
                {` (${predata.length}/${preQuestions.length})`}
              </p>
              <p className="choice-message">
                I feel that{" "}
                <span className="emph">{preQuestions[predata.length]}</span> is
                important in determining which patient should receive a donated
                kidney
              </p>

              <LikertScale>
                {LikertScaleTexts.map((d, i) => (
                  <div className="likert-item" key={`lsitem${d}`}>
                    <LikertOption
                      onClick={() => setChosen(i)}
                      active={i == chosen}
                    />
                    <p>{d}</p>
                  </div>
                ))}
              </LikertScale>
            </div>
            <div className="buttons">
              {chosen > -1 ? (
                <button
                  className="confirm-button"
                  onClick={() => getNewPrequestion()}
                >
                  Continue
                </button>
              ) : null}
            </div>
          </Dialog>
        </DarkOverlay>
      ) : stage === 2 ? (
        <DarkOverlay>
          <Dialog big>
            <div className="dialog-header">
              <h2>
                {ass > 0 && ass < 3
                  ? "AI Moral Personality Assessment Result"
                  : "Psychological Assessment Result"}
              </h2>
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
                      Analyzing response {fakeProg + 1}:{" "}
                      {`${preQuestions[fakeProg]}: ${
                        LikertScaleTexts[predata[fakeProg].decision]
                      }...`}
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
                    <p>
                      According to our{" "}
                      {ass > 0 && ass < 3 ? "AI Model" : "expert psychologists"}
                      , you care
                    </p>

                    {
                      [
                        <p key="exp-msg" className="choice-message">
                          <span className="emph">
                            more about the life expectancy of the patients
                          </span>{" "}
                          than how many dependents they have
                        </p>,
                        <p key="dep-msg" className="choice-message">
                          <span className="emph">
                            more about how many dependents patients have
                          </span>{" "}
                          than their life expectancy"
                        </p>
                      ][ass === 1 || ass === 3 ? 0 : 1]
                    }

                    <p>when making decisions about who will get a kidney.</p>
                  </div>,
                  <div className="buttons" key="show-ass-butt-1">
                    {ass > 0 ? (
                      <button
                        className="confirm-button"
                        onClick={() => setStage(3)}
                      >
                        I have taken note of my{" "}
                        {ass > 0 && ass < 3 ? "AI" : "psychological"}{" "}
                        assessment.
                      </button>
                    ) : null}
                  </div>
                ]}
          </Dialog>
        </DarkOverlay>
      ) : null}
      {stage === 3 ? (
        <DarkOverlay>
          <Dialog>
            <div className="dialog-header">
              <h2>Next Step</h2>
            </div>
            <div className="message">
              {ass === 1 || ass == 2 ? (
                <p className="choice-message">
                  our AI model will be trained on how you make decisions about
                  who should receive kidneys based on your responses to the next
                  questions.
                </p>
              ) : ass === 3 || ass === 4 ? (
                <p className="choice-message">
                  Our expert psychologists are interested in your judgment on
                  which particular patient should get a kidney.
                </p>
              ) : (
                <p className="choice-message">
                  We are interested in your judgment on which particular patient
                  should get a kidney.
                </p>
              )}
              <p>As you are deciding on who should get the kidney, remember:</p>
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
                  setStage(4);
                }}
              >
                Proceed
              </button>
            </div>
          </Dialog>
        </DarkOverlay>
      ) : null}
    </ComparisonContainer>
  );
};
