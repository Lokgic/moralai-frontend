import {
  ComparisonContainer,
  BackgroundFrame,
  FeatureTable,
  TextInputForm
} from "../comp-styled/featureDisplayComps";
import {
  UserIconContainer,
  PatientNameButton,
  Dialog,
  DarkOverlay,
  MCQuestion,
  MCItem,
  SurveyTextInput,
  StackedButton,
  PatientEmphasis
} from "../comp-styled/interface";
import { useReducer, useEffect } from "react";
import SequenceLogic from "../components/SequenceLogic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayRandomizer } from "../components/FeatureHelpers";
import { v1 } from "uuid";
import mats from "../data/mt2.json";
const dFeatureKeys = Object.keys(mats.dFeatures);

const featureDict = {
  dependents: "Dependents",
  exp: "Life Expectancy After Transplantation",
  cause: "Primary Cause of Kidney Failure",
  income: "Income",
  gender: "Gender",
  smoking: "Smoking Habits",
  age: "Age",
  criminal: "Criminal History",
  health: "Physical Health",
  race: "Race",
  occupation: "Occupation",
  activity: "Activity Level",
  education: "Education",
  citizenship: "Citizenship",
  religion: "Religion",
  tattoos: "Number of Tattoos",
  political: "Political Affliation",
  weight: "Weight",
  previouslyReceived: "Previously Received an Organ Transplant",
  pastContribution: "Past contributions to hospital",
  mentalHealth: "current mental health"
};

const targetEdDistractionFeature = [
  "income",
  "race",
  "education",
  "tattoos",
  "political",
  "religion",
  "citizenship"
];

const valueTranslator = (fkey, value) => {
  const valueDictionary = {
    ...mats.dFeatures,
    cause: ["hereditary", "heavy alcohol use", "heavy drug use"]
  };
  switch (fkey) {
    case "exp":
      return `${value} years`;
    case "dependents":
      return value === 0 ? "none" : value;
    // case "cause":
    //   return value === "hereditary"
    //     ? value
    //     : value === "alcohol"
    //     ? "heavy alcohol use"
    //     : "heavy drug use";
    case "income":
      return `$${valueDictionary[fkey][value]} per year`;
    default:
      return valueDictionary[fkey][value];
  }
};

const postPairs = [
  [
    { exp: 27, cause: 2 },
    { exp: 21, cause: 0 }
  ],
  [
    { exp: 16, cause: 1 },
    { exp: 11, cause: 0 }
  ],
  [
    { exp: 9, cause: 2 },
    { exp: 4, cause: 0 }
  ],
  [
    { exp: 20, cause: 2 },
    { exp: 10, cause: 0 }
  ],
  [
    { exp: 5, cause: 2 },
    { exp: 2, cause: 0 }
  ],
  [
    { exp: 25, cause: 1 },
    { exp: 19, cause: 0 }
  ],
  [
    { exp: 19, cause: 2 },
    { exp: 14, cause: 0 }
  ],
  [
    { exp: 10, cause: 2 },
    { exp: 5, cause: 0 }
  ],
  [
    { exp: 17, cause: 1 },
    { exp: 14, cause: 0 }
  ],
  [
    { exp: 13, cause: 1 },
    { exp: 10, cause: 0 }
  ]
];

const addDistraction = arr => {
  return [...arr].map(d => {
    const df = arrayRandomizer(targetEdDistractionFeature).slice(0, 2);
    const fVal = df.map(d =>
      Math.floor(Math.random() * mats.dFeatures[d].length)
    );

    return d.map(patient => {
      return {
        ...patient,
        [df[0]]: fVal[0],
        [df[1]]: fVal[1]
      };
    });
  });
};

const distractPairs = [...Array(8).keys()].map(d => {
  const df = arrayRandomizer(dFeatureKeys).slice(0, 5);
  const fVal = df.map(d => [
    // mats.dFeatures[d][Math.floor(Math.random() * mats.dFeatures[d].length)],
    // mats.dFeatures[d][Math.floor(Math.random() * mats.dFeatures[d].length)]
    Math.floor(Math.random() * mats.dFeatures[d].length),
    Math.floor(Math.random() * mats.dFeatures[d].length)
  ]);

  return [0, 1].map(i => {
    return {
      [df[0]]: fVal[0][i],
      [df[1]]: fVal[1][i],
      [df[2]]: fVal[2][i],
      [df[3]]: fVal[3][i]
    };
  });
});

const preBasePairs = [
  [
    { exp: 19, cause: 2 },
    { exp: 14, cause: 0 }
  ],
  [
    { exp: 16, cause: 1 },
    { exp: 11, cause: 0 }
  ]
];

const prePairs = [...addDistraction(preBasePairs), ...distractPairs];
const postPairD = [...addDistraction(postPairs)];
const sl = new SequenceLogic({
  seq: prePairs,
  randomized: true,
  featureDict,
  valueTranslator
});

const sl2 = new SequenceLogic({
  seq: postPairD,
  randomized: true,
  featureDict,
  valueTranslator
});

const initialState = {
  user_id: v1(),
  trial_id: "mt2-pilot",
  group_id: "control",
  sample_id: 999,
  decisionState: "init",
  dialogState: "intro",
  pairSeq: sl,
  pair: sl.getCurrent(),
  timeStamp: Date.now(),
  chosen: null,
  dialogChosen: null,
  data: [],
  distractionData: [],
  interventionSeq: [],
  interventionData: { text: [], decision: [] },
  postData: [],
  surveyData: [],
  textInput: "",
  fKeysRandomized: arrayRandomizer(sl.getFeatureKeys()),
  mtData: []
};

const magicTrick = ({ pair, direction }) => {
  const expPatient = pair[0].exp > pair[1].exp ? 0 : 1;
  return direction === "exp" ? expPatient : 1 - expPatient;
};

const reducer = (state, action) => {
  const { data, timeStamp, pairSeq, pair, user_id, postData } = state;
  const newTS = Date.now();
  const { payload } = action;
  console.log("ACTION TYPE: " + action.type + ", PAYLOAD: " + payload);

  switch (action.type) {
    case "SET_GROUP_ID":
      return {
        ...state,
        group_id: action.payload
      };
    case "CLOSE_DIALOG":
      const newState = {
        ...state,
        dialogState: "off",
        timeStamp: newTS
      };
      return newState;
    case "DECISION_INPUT": {
      const new_decision_rank =
        state.decisionState === "pre" ? data.length : postData.length;
      const time = {
        start: new Date(timeStamp).toISOString(),
        end: new Date(newTS).toISOString(),
        decision_rank: new_decision_rank,
        delay: newTS - timeStamp
      };

      // let newChosen;
      const newDP = {
        pair,
        time,
        fKeysRandomized: state.fKeysRandomized
      };
      if (
        state.group_id === "control" ||
        state.fKeysRandomized.indexOf("exp") === -1 ||
        state.decisionState !== "pre"
      ) {
        newDP.chosen = state.chosen;
        newDP.realChosen = state.chosen;
      } else {
        newDP.chosen = magicTrick({
          pair,
          direction: state.group_id
        });
        newDP.realChosen = state.chosen;
      }

      const newData =
        state.decisionState === "pre" ? [...data, newDP] : [...postData, newDP];

      const newPair = pairSeq.getNext();
      const newFkey = arrayRandomizer(pairSeq.getFeatureKeys());
      const out = {
        ...state,
        timeStamp: newTS,

        pairSeq: pairSeq,
        pair: newPair,
        fKeysRandomized: newFkey,
        chosen: null
      };
      if (state.decisionState === "pre") {
        out.data = newData;
        out.dialogState =
          newData.length === prePairs.length ? "distraction-intro" : "off";
        // out.dialogState = newData.length === 2 ? "distraction-intro" : "off";
      } else {
        out.postData = newData;
        out.dialogState =
          newData.length === postPairs.length ? "exit-survey" : "off";
        // out.dialogState = newData.length === 2 ? "exit-survey" : "off";
      }
      return out;
    }
    case "DIALOG_CLICK":
      if (action.qType === "inclusive") {
        if (
          typeof state.dialogChosen === "number" ||
          state.dialogChosen === null
        ) {
          return {
            ...state,
            dialogChosen: [action.payload]
          };
        } else {
          const indexOfPayload = state.dialogChosen.indexOf(action.payload);
          let newDialogChosen;
          if (indexOfPayload === -1) {
            newDialogChosen = [...state.dialogChosen, action.payload];
          } else {
            newDialogChosen = [...state.dialogChosen];
            newDialogChosen.splice(indexOfPayload, 1);
          }
          return {
            ...state,
            dialogChosen: newDialogChosen
          };
        }
      }
      return {
        ...state,
        dialogChosen: action.payload
      };
    case "DIALOG_CONFIRM":
      if (state.dialogState === "distraction") {
        const dData = [...state.distractionData, state.dialogChosen];
        if (dData.length === mats.distraction.length) {
          const newISeq = arrayRandomizer([...data]);
          const newChosen = newISeq[0].chosen;

          return {
            ...state,
            dialogChosen: null,
            distractionData: dData,
            dialogState: "intervention-intro",
            decisionState: "intervention",
            chosen: newChosen,
            fKeysRandomized: arrayRandomizer(newISeq[0].fKeysRandomized),
            pair: newISeq[0].pair,
            interventionSeq: newISeq
          };
        } else {
          return {
            ...state,
            dialogChosen: null,
            distractionData: dData
          };
        }
      } else if (state.dialogState === "exit-survey") {
        const newSDP =
          action.qType === "textInput" ? state.textInput : state.dialogChosen;
        const sData = [...state.surveyData, newSDP];

        if (sData.length === mats.exitSurvey.length) {
          return {
            ...state,
            dialogChosen: null,
            surveyData: sData,
            dialogState: "outro",
            textInput: ""
          };
        } else {
          return {
            ...state,
            dialogChosen: null,
            surveyData: sData,
            textInput: ""
          };
        }
      }
      break;
    case "INTERVENTION_CONFIRM": {
      // const time = {
      //   start: timeStamp / 1000,
      //   end: newTS / 1000,
      //   decision_rank: state.interventionData.length,
      //   delay: newTS - timeStamp
      // };
      const dRank = state.interventionData.text.length;
      const oRank = state.interventionSeq[dRank].time.decision_rank;
      const text = [
        ...state.interventionData.text,
        `decision_rank_${oRank}: ${state.textInput}`
      ];
      const decision = [
        ...state.interventionData.decision,
        `decision_rank_${oRank}: ${state.chosen}`
      ];
      const newIData = { text, decision };
      const newOut = {
        ...state,
        textInput: "",
        interventionData: newIData,
        timeStamp: newTS
      };
      if (state.interventionSeq.length <= newIData.text.length) {
        newOut.decisionState = "post";
        newOut.pairSeq = sl2;
        newOut.pair = sl2.getCurrent();
        newOut.chosen = null;
        newOut.fKeysRandomized = arrayRandomizer(sl2.getFeatureKeys());
        newOut.dialogState = "post-intro";
      } else {
        const nextI = newIData.text.length;

        newOut.pair = state.interventionSeq[nextI].pair;
        newOut.chosen = state.interventionSeq[nextI].chosen;
        newOut.fKeysRandomized = arrayRandomizer(
          state.interventionSeq[nextI].fKeysRandomized
        );
      }
      if (
        state.interventionSeq[newIData.text.length - 1].fKeysRandomized.indexOf(
          "exp"
        ) !== -1
      ) {
        const { realChosen, pair, time } = state.interventionSeq[
          newIData.text.length - 1
        ];
        const { chosen } = state;
        const expPatient = pair[0].exp > pair[1].exp ? 0 : 1;
        const expfavor_original = expPatient === realChosen ? 1 : 0;
        const group = state.group_id;
        const expfavor_final = expPatient === chosen ? 1 : 0;
        const newMTPoint = {
          user_id,
          expfavor_original,
          group,
          expfavor_final,
          text: state.textInput,
          original_rank: time.decision_rank,
          mt_rank: newIData.text.length - 1
        };
        newOut.mtData = [...state.mtData, newMTPoint];
      }

      return newOut;
    }
    case "INTERVENTION_SWITCH": {
      return action.payload === state.chosen
        ? {
            ...state
          }
        : {
            ...state,
            chosen: action.payload,
            dialogState: "intervention-switch"
          };
    }

    case "DECISION_CLICK":
      return {
        ...state,
        chosen: action.chosen,
        dialogState: "confirm"
      };

    case "SET_DIALOG_STATE":
      return {
        ...state,
        dialogState: action.payload
      };

    case "SET_DECISION_STATE":
      return {
        ...state,
        decisionState: action.payload
      };
    case "SET_CHOSEN":
      return {
        ...state,
        chosen: action.payload
      };
    case "SET_TEXT_INPUT":
      return {
        ...state,
        textInput: payload
      };
    default:
      return state;
  }
};

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/"
    : "https://moral-ai-backend.herokuapp.com/";
const pdURL = baseURL + "add-ppt";
const ddURL = baseURL + "add-comparison";
const mtdURL = baseURL + "add-mt";
const sdURL = baseURL + "add-survey";
export default props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let dialog, decisionScreen;
  const {
    dialogState,
    pair,
    pairSeq,
    chosen,
    textInput,
    fKeysRandomized,
    dialogChosen,
    decisionState,
    data,
    postData,
    trial_id,
    user_id,
    interventionData,
    distractionData,
    surveyData
  } = state;

  console.log(state);

  const sendPost = async ({ body, url }) => {
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(res => {
      return res;
    });
  };

  useEffect(() => {
    if (props.group_id !== null && props.group_id !== undefined) {
      dispatch({ type: "SET_GROUP_ID", payload: props.group_id });
      console.log(props.group_id);
    }
  }, [props.group_id]);
  // effect hook tracks change of decision state
  useEffect(() => {
    if (decisionState === "pre") {
      const body = {
        user_id,
        trial_id,
        group_id: state.group_id,
        sample_id: state.sample_id
      };
      sendPost({ body, url: pdURL });
    }
  }, [decisionState]);
  // track data
  useEffect(() => {
    if ((decisionState === "pre") & (data.length > 0)) {
      const dp = data[data.length - 1];
      const body = { ...dp.time };
      for (let i = 0; i < dp.fKeysRandomized.length; i++) {
        const feature = dp.fKeysRandomized[i];
        body[`name_${i + 1}`] = feature;
        body[`left_${i + 1}`] = dp.pair[0][feature];
        body[`right_${i + 1}`] = dp.pair[1][feature];
      }
      body["left_5"] = -999;
      body["right_5"] = -999;
      body["user_id"] = state.user_id;
      body["chosen"] = dp.chosen;

      sendPost({ body, url: ddURL });
    }
  }, [data, decisionState]);

  // magic trick data effect
  useEffect(() => {
    if (state.mtData.length !== 0) {
      sendPost({ body: state.mtData[state.mtData.length - 1], url: mtdURL });
    }
  }, [state.mtData]);

  // track-postdata
  useEffect(() => {
    if ((decisionState === "post") & (postData.length > 0)) {
      const dp = postData[postData.length - 1];
      const body = { ...dp.time };
      const order = dp.fKeysRandomized.reduce(
        (arr, d) => {
          console.log(arr);
          return arr.indexOf(d) !== -1 ? arr : [...arr, d];
        },
        ["cause", "exp"]
      );
      console.log(dp);
      for (let i = 0; i < order.length; i++) {
        const feature = order[i];
        body[`name_${i + 1}`] = feature;
        body[`left_${i + 1}`] = dp.pair[0][feature];
        body[`right_${i + 1}`] = dp.pair[1][feature];
      }
      body["name_5"] = "";
      body["left_5"] = -999;
      body["right_5"] = -999;
      body["user_id"] = state.user_id;
      body["chosen"] = dp.chosen;

      console.log(body);
      sendPost({ body, url: ddURL });
    }
  }, [postData, decisionState]);

  // intervention survey
  useEffect(() => {
    if ((decisionState === "post") & (interventionData.text.length > 0)) {
      const bodyArr = [...interventionData.text, ...interventionData.decision];
      const body = { user_id, trial_id, survey_id: "intevention_input" };
      for (let i = 0; i < 20; i++) {
        const j = i + 1;
        body["input_" + j] = bodyArr[i];
      }
      console.log(body);
      sendPost({ body, url: sdURL });
    }
  }, [interventionData, decisionState]);

  // distraction + after survey
  useEffect(() => {
    if (
      (dialogState === "outro") &
      (distractionData.length + surveyData.length > 0)
    ) {
      const bodyArr = [...distractionData, ...surveyData];
      const body = { user_id, trial_id, survey_id: "distract_exit_survey" };
      for (let i = 0; (i < 20) & (i < bodyArr.length); i++) {
        const j = i + 1;
        body["input_" + j] =
          typeof bodyArr[i] === "object"
            ? bodyArr[i].toString()
            : bodyArr[i] + "";
      }
      console.log(body);
      sendPost({ body, url: sdURL });
    }
  }, [distractionData, surveyData, dialogState]);

  // Decision Screen Logic
  switch (decisionState) {
    case "post":
    case "intervention":
    case "pre": {
      decisionScreen = (
        <FeatureTable>
          {fKeysRandomized.map((f, fi) => [
            [0, 1].map(p => (
              <div
                className={p === 0 ? "f-cell left" : "f-cell right"}
                key={`f-cell--${p}_${fi}`}
              >
                <h3>{pairSeq.translateFeature(f)}</h3>
                <h2>{pairSeq.translateValue(f, pair[p][f])}</h2>
              </div>
            ))
          ])}
        </FeatureTable>
      );
      break;
    }

    default:
      decisionScreen = null;
  }

  // Dialog logic

  switch (dialogState) {
    case "intro":
      dialog = (
        <DarkOverlay>
          <Dialog>
            <div className="dialog-header">
              <h2>Keep in mind</h2>
            </div>
            <div className="message">
              <p className="choice-message">
                We are interested in your judgment on which particular patient
                should get a kidney.
              </p>
              <p>
                You will be asked to select one of the patients to receive a
                kidney. As you are deciding on who should get the kidney,
                remember:
              </p>
              <p>
                Patients are expected to live less than a year if they do not
                receive the transplant.
              </p>
            </div>
            <div className="buttons">
              <button
                className="confirm-button"
                onClick={() => {
                  dispatch({ type: "CLOSE_DIALOG" });
                  dispatch({ type: "SET_DECISION_STATE", payload: "pre" });
                }}
              >
                Proceed
              </button>
            </div>
          </Dialog>
        </DarkOverlay>
      );
      break;
    case "outro":
      dialog = (
        <DarkOverlay>
          <Dialog>
            <div className="dialog-header">
              <h2>Completed</h2>
            </div>
            <div className="message">
              <p>your unique code:</p>
              <p>{state.user_id}</p>
              <p>
                Please enter this code and complete the rest of your Qualtric
                survey
              </p>
            </div>
          </Dialog>
        </DarkOverlay>
      );
      break;
    case "post-intro":
      dialog = (
        <DarkOverlay>
          <Dialog>
            <div className="dialog-header">
              <h2>Activity 4</h2>
            </div>
            <div className="message">
              <p className="choice-message">
                We are interested in your judgment on which particular patient
                should get a kidney, based on the reasoning you articulated.
              </p>
              <p>
                Again, you will be asked to select one of the patients to
                receive a kidney. As you are deciding on who should get the
                kidney, remember:
              </p>
              <p>
                Patients are expected to live less than a year if they do not
                receive the transplant.
              </p>
            </div>
            <div className="buttons">
              <button
                className="confirm-button"
                onClick={() => {
                  dispatch({ type: "CLOSE_DIALOG" });
                }}
              >
                Proceed
              </button>
            </div>
          </Dialog>
        </DarkOverlay>
      );
      break;
    case "confirm":
      dialog = (
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
              <button
                className="confirm-button"
                onClick={() => dispatch({ type: "DECISION_INPUT" })}
              >
                Yes, proceed
              </button>
              <button onClick={() => dispatch({ type: "CLOSE_DIALOG" })}>
                No, go back{" "}
              </button>
            </div>
          </Dialog>
        </DarkOverlay>
      );
      break;
    case "distraction-intro":
      dialog = (
        <DarkOverlay>
          <Dialog big>
            <div className="dialog-header">
              <h2>Activity 2</h2>
            </div>
            <div className="message">
              <p>
                In this activity, we will you ask to answer some questions on
                facts about kidney transplants in the United States. Please
                respond to the best of your current knowledge, without
                consulting an external source.
              </p>
              <p>
                The accuracy of your answers will not affect your compensation.
              </p>
            </div>
            <div className="buttons">
              <button
                className="confirm-button"
                onClick={() => {
                  dispatch({
                    type: "SET_DIALOG_STATE",
                    payload: "distraction"
                  });
                }}
              >
                Proceed
              </button>
            </div>
          </Dialog>
        </DarkOverlay>
      );
      break;
    case "intervention-intro":
      dialog = (
        <DarkOverlay>
          <Dialog big>
            <div className="dialog-header">
              <h2>Activity 3</h2>
            </div>

            <div className="message">
              <p className="choice-message">
                Next, you will be prompted to explain your previous decisions.
              </p>
              <p>
                Your original selection will be highlighted. Please write a
                brief justification for why you chose the patient to receive the
                kidney that you chose.
              </p>
              <p>
                You can click on the patient identifier (“Patient A” or “Patient
                B”) to change your selection, if needed.
              </p>
              <p>
                Once you have finished your response, please confirm your answer
                to continue.
              </p>
            </div>
            <div className="buttons">
              <button
                className="confirm-button"
                onClick={() => {
                  dispatch({
                    type: "SET_DIALOG_STATE",
                    payload: "off"
                  });
                }}
              >
                Proceed
              </button>
            </div>
          </Dialog>
        </DarkOverlay>
      );
      break;
    case "distraction":
      dialog = (
        <DarkOverlay>
          <Dialog big>
            <div className="dialog-header">
              <h2>Activity 2</h2>
            </div>
            <div className="message">
              <p className="choice-message">
                {mats.distraction[state.distractionData.length].q}
              </p>
            </div>
            <MCQuestion>
              {mats.distraction[state.distractionData.length].a.map((a, ai) => (
                <MCItem
                  key={`mcitem_${a}_${ai}`}
                  onClick={() => {
                    dispatch({
                      type: "DIALOG_CLICK",
                      payload: ai
                    });
                  }}
                  active={dialogChosen === ai}
                >
                  <div className="click-box" />
                  <p>{a}</p>
                </MCItem>
              ))}{" "}
            </MCQuestion>

            <div className="buttons">
              {dialogChosen != null ? (
                <button
                  className="confirm-button"
                  onClick={() => {
                    dispatch({
                      type: "DIALOG_CONFIRM"
                    });
                  }}
                >
                  Continue
                </button>
              ) : null}
            </div>
          </Dialog>
        </DarkOverlay>
      );
      break;
    case "exit-survey":
      dialog = (
        <DarkOverlay>
          <Dialog big>
            <div className="dialog-header">
              <h2>Exit Survery</h2>
            </div>
            <div className="message">
              <p className="choice-message">
                {mats.exitSurvey[state.surveyData.length].q}
              </p>
            </div>
            {mats.exitSurvey[state.surveyData.length].qType === "textInput" ? (
              <SurveyTextInput
                placeholder="type answer here"
                value={textInput}
                onChange={e =>
                  dispatch({
                    type: "SET_TEXT_INPUT",
                    payload: e.target.value
                  })
                }
              />
            ) : (
              <MCQuestion>
                {mats.exitSurvey[state.surveyData.length].a.map((a, ai) => (
                  <MCItem
                    key={`mcitem_${a}_${ai}`}
                    onClick={() => {
                      dispatch({
                        type: "DIALOG_CLICK",
                        payload: ai,
                        qType: mats.exitSurvey[state.surveyData.length].qType
                      });
                    }}
                    active={
                      dialogChosen !== null
                        ? typeof dialogChosen === "object"
                          ? dialogChosen.indexOf(ai) > -1
                          : dialogChosen === ai
                        : false
                    }
                  >
                    <div className="click-box" />
                    <p>{a}</p>
                  </MCItem>
                ))}
              </MCQuestion>
            )}

            <div className="buttons">
              {dialogChosen != null || textInput.length > 0 ? (
                <button
                  className="confirm-button"
                  onClick={() => {
                    dispatch({
                      type: "DIALOG_CONFIRM",
                      qType: mats.exitSurvey[state.surveyData.length].qType
                    });
                  }}
                >
                  Continue
                </button>
              ) : null}
            </div>
          </Dialog>
        </DarkOverlay>
      );
      break;
    case "intervention-switch":
      dialog = (
        <DarkOverlay>
          <Dialog>
            <div className="dialog-header">
              <h2>Are you sure?</h2>
            </div>
            <div className="message">
              <p>You are switching to</p>
              <p className="choice-message">
                {["give A the kidney", "give B the kidney"][chosen]}
              </p>
            </div>
            <div className="buttons">
              <button
                className={
                  state.chosen ===
                  state.interventionSeq[state.interventionData.text.length]
                    .chosen
                    ? "confirm-button"
                    : ""
                }
                onClick={() => dispatch({ type: "CLOSE_DIALOG" })}
              >
                Yes, proceed
              </button>
              <button
                className={
                  state.chosen ===
                  state.interventionSeq[state.interventionData.text.length]
                    .chosen
                    ? ""
                    : "confirm-button"
                }
                onClick={() => {
                  dispatch({ type: "CLOSE_DIALOG" });
                  dispatch({ type: "SET_CHOSEN", payload: 1 - chosen });
                }}
              >
                No, go back
              </button>
            </div>
          </Dialog>
        </DarkOverlay>
      );
      break;
    default:
      dialog = null;
  }

  return (
    <ComparisonContainer>
      <BackgroundFrame col="1/-1" row="3/-1" />

      {decisionState === "intervention"
        ? [
            <div
              className="about-a about patient-button"
              onClick={() =>
                dispatch({ type: "INTERVENTION_SWITCH", payload: 0 })
              }
              key="about-a-int"
            >
              <h4>
                Patient A{" "}
                {chosen === 1 ? <FontAwesomeIcon icon="exchange-alt" /> : null}
              </h4>
            </div>,
            <div
              className="about-b about patient-button"
              key="about-b-int"
              onClick={() =>
                dispatch({ type: "INTERVENTION_SWITCH", payload: 1 })
              }
            >
              <h4>
                Patient B{" "}
                {chosen === 0 ? <FontAwesomeIcon icon="exchange-alt" /> : null}
              </h4>
            </div>,
            <TextInputForm key="textinput">
              {state.chosen ===
              state.interventionSeq[state.interventionData.decision.length]
                .chosen ? (
                <p>
                  I chose the patient highlighted in <span>orange</span>{" "}
                  because...
                </p>
              ) : (
                <p>
                  I am switching to the patient highlighted in{" "}
                  <span>orange</span> because...
                </p>
              )}

              <textarea
                placeholder="type answer here"
                value={textInput}
                onChange={e =>
                  dispatch({ type: "SET_TEXT_INPUT", payload: e.target.value })
                }
              />
            </TextInputForm>,
            <UserIconContainer area="chooseb" key="icon-area-review">
              <StackedButton
                onClick={
                  textInput === ""
                    ? null
                    : () => dispatch({ type: "INTERVENTION_CONFIRM" })
                }
                key={`confirm-just-butt`}
                style={
                  textInput === ""
                    ? {
                        cursor: "not-allowed",
                        gridRow: "1/3",
                        background: "#999",
                        boxShadow: "none"
                      }
                    : { gridRow: "1/3", height: "100%" }
                }
              >
                Continue
              </StackedButton>
            </UserIconContainer>,
            <PatientEmphasis
              key={"patient-emphasis" + state.chosen}
              side={state.chosen}
            />
          ]
        : [
            <div className="about-a about" key="about-a">
              <h4>Patient A </h4>
            </div>,
            <div className="about-b about" key="about-b">
              <h4>Patient B</h4>
            </div>,
            [0, 1].map(d => [
              <UserIconContainer
                side={d}
                key={`user-iconcon-${d}`}
                area={d === 0 ? "choosea" : "chooseb"}
              >
                <PatientNameButton
                  onClick={() =>
                    dispatch({ type: "DECISION_CLICK", chosen: d })
                  }
                  key={`PatientNameButton-${d}`}
                >
                  Choose {["A", "B"][d]}
                </PatientNameButton>
              </UserIconContainer>
            ])
          ]}
      {decisionScreen}
      {dialog}
    </ComparisonContainer>
  );
};
