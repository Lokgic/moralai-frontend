import {
  ComparisonContainer,
  BackgroundFrame,
  FeatureCell,
  FeatureTable,
  FeatureHeader,
  TextInputForm
} from "../comp-styled/featureDisplayComps";
import {
  UserIconContainer,
  PatientNameButton,
  Dialog,
  DarkOverlay,
  LikertScale,
  LikertOption,
  MCQuestion,
  MCItem,
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
  pastContribution: "past contributions to hospital",
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
  switch (fkey) {
    case "exp":
      return `${value} years`;
    case "dependents":
      return value === 0 ? "none" : value;
    case "cause":
      return value === "hereditary"
        ? value
        : value === "alcohol"
        ? "heavy alcohol use"
        : "heavy drug use";
    default:
      return value;
  }
};

const postPairs = [
  [
    { exp: 25, cause: "drug" },
    { exp: 18, cause: "hereditary" }
  ],
  [
    { exp: 16, cause: "alcohol" },
    { exp: 11, cause: "hereditary" }
  ],
  [
    { exp: 9, cause: "drug" },
    { exp: 4, cause: "obesity" }
  ],
  [
    { exp: 12, cause: "drug" },
    { exp: 10, cause: "hereditary" }
  ],
  [
    { exp: 5, cause: "obesity" },
    { exp: 2, cause: "hereditary" }
  ],
  [
    { exp: 16, cause: "alcohol" },
    { exp: 11, cause: "hereditary" }
  ],
  [
    { exp: 20, cause: "drugs" },
    { exp: 12, cause: "hereditary" }
  ],
  [
    { exp: 16, cause: "alcohol" },
    { exp: 11, cause: "hereditary" }
  ],
  [
    { exp: 20, cause: "drugs" },
    { exp: 12, cause: "hereditary" }
  ],
  [
    { exp: 16, cause: "alcohol" },
    { exp: 11, cause: "hereditary" }
  ],
  [
    { exp: 20, cause: "drugs" },
    { exp: 12, cause: "hereditary" }
  ],
  [
    { exp: 16, cause: "alcohol" },
    { exp: 11, cause: "hereditary" }
  ]
];

const addDistraction = arr => {
  return [...arr].map(d => {
    const df = arrayRandomizer(targetEdDistractionFeature).slice(0, 2);
    const fVal = df.map(
      d =>
        mats.dFeatures[d][Math.floor(Math.random() * mats.dFeatures[d].length)]
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
    mats.dFeatures[d][Math.floor(Math.random() * mats.dFeatures[d].length)],
    mats.dFeatures[d][Math.floor(Math.random() * mats.dFeatures[d].length)]
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
    { exp: 20, cause: "drug" },
    { exp: 12, cause: "hereditary" }
  ],
  [
    { exp: 16, cause: "alcohol" },
    { exp: 11, cause: "hereditary" }
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
  userId: v1(),
  trialId: "mt2",
  condition: "control",
  decisionState: "pre",
  dialogState: "intro",
  pairSeq: sl,
  pair: sl.getCurrent(),
  timeStamp: Date.now(),
  chosen: null,
  dialogChosen: null,
  data: [],
  distractionData: [],
  interventionData: [],
  postData: [],
  surveyData: [],
  textInput: "",
  fKeysRandomized: arrayRandomizer(sl.getFeatureKeys())
};

const reducer = (state, action) => {
  const { data, timeStamp, pairSeq } = state;
  const newTS = Date.now();
  const { payload } = action;
  console.log(action.type);
  console.log(payload);
  switch (action.type) {
    case "CLOSE_DIALOG":
      const newState = {
        ...state,
        dialogState: "off",
        timeStamp: newTS
      };
      return newState;
    case "DECISION_INPUT": {
      const time = {
        start: timeStamp / 1000,
        end: newTS / 1000,
        decisionRank: data.length,
        delay: newTS - timeStamp
      };
      const newData =
        state.decisionState === "pre"
          ? [
              ...data,
              {
                pair: state.pair,
                chosen: state.chosen,
                time,
                fKeysRandomized: state.fKeysRandomized
              }
            ]
          : [
              ...state.postData,
              {
                pair: state.pair,
                chosen: state.chosen,
                time,
                fKeysRandomized: state.fKeysRandomized
              }
            ];

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
        // out.dialogState =
        //   newData.length === prePairs.length ? "distraction-intro" : "off";
        out.dialogState = newData.length === 2 ? "distraction-intro" : "off";
      } else {
        // out.dialogState =
        //   newData.length === postPairs.length ? "exit-survey" : "off";
        out.dialogState = newData.length === 2 ? "exit-survey" : "off";
        out.postData = newData;
      }
      return out;
    }
    case "DIALOG_CLICK":
      if (action.subtype === "inclusive") {
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
          return {
            ...state,
            dialogChosen: null,
            distractionData: dData,
            dialogState: "intervention-intro",
            decisionState: "intervention",
            chosen: data[0].chosen,
            fKeysRandomized: data[0].fKeysRandomized,
            pair: data[0].pair
          };
        } else {
          return {
            ...state,
            dialogChosen: null,
            distractionData: dData
          };
        }
      } else if (state.dialogState === "exit-survey") {
        const sData = [...state.surveyData, state.dialogChosen];

        if (sData.length === mats.exitSurvey.length) {
          return {
            ...state,
            dialogChosen: null,
            surveyData: sData,
            dialogState: "outro"
          };
        } else {
          return {
            ...state,
            dialogChosen: null,
            surveyData: sData
          };
        }
      }
      break;
    case "INTERVENTION_CONFIRM": {
      const time = {
        start: timeStamp / 1000,
        end: newTS / 1000,
        decisionRank: state.interventionData.length,
        delay: newTS - timeStamp
      };
      const newIData = [
        ...state.interventionData,
        {
          pair: state.pair,
          chosen: state.chosen,
          time,
          text: state.textInput
        }
      ];
      const newOut = {
        ...state,
        textInput: "",
        interventionData: newIData,
        timeStamp: newTS
      };
      if (data.length <= newIData.length) {
        newOut.decisionState = "post";
        newOut.pairSeq = sl2;
        newOut.pair = sl2.getCurrent();
        newOut.chosen = null;
        newOut.fKeysRandomized = arrayRandomizer(sl2.getFeatureKeys());
        newOut.dialogState = "post-intro";
      } else {
        newOut.pair = state.data[newIData.length].pair;
        newOut.chosen = state.data[newIData.length].chosen;
        newOut.fKeysRandomized = state.data[newIData.length].fKeysRandomized;
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

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [, setTextInput] = useState("");
  console.log(state);
  useEffect(() => {}, [state.decisionScreen]);
  let dialog, decisionScreen;
  const {
    pair,
    pairSeq,
    chosen,
    textInput,
    fKeysRandomized,
    dialogChosen
  } = state;

  // Decision Screen Logic
  switch (state.decisionState) {
    case "post":
    case "pre": {
      decisionScreen = (
        <FeatureTable n={fKeysRandomized.length}>
          {fKeysRandomized.map((f, fi) => [
            <FeatureHeader key={`fcell_${f}`} fi={fi}>
              <div>{pairSeq.translateFeature(f)}</div>
            </FeatureHeader>,
            [0, 1].map(p => (
              <FeatureCell
                side={p}
                fi={fi}
                valType={f === "age" ? "n" : "na"}
                key={`f-cell--${p}_${fi}`}
              >
                <p>{pairSeq.translateValue(f, pair[p][f])}</p>
              </FeatureCell>
            ))
          ])}
        </FeatureTable>
      );
      break;
    }
    case "intervention": {
      decisionScreen = (
        <FeatureTable n={fKeysRandomized.length}>
          {fKeysRandomized.map((f, fi) => [
            <FeatureHeader key={`fcell_${f}`} fi={fi}>
              <div>{pairSeq.translateFeature(f)}</div>
            </FeatureHeader>,
            [0, 1].map(p => (
              <FeatureCell
                side={p}
                fi={fi}
                valType={f === "age" ? "n" : "na"}
                key={`f-cell--${p}_${fi}`}
              >
                <p>{pairSeq.translateValue(f, pair[p][f])}</p>
              </FeatureCell>
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

  switch (state.dialogState) {
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
              <p>{state.userId}</p>
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
                Please tell us your thought process behind your decisions
              </p>
              <p>You will be prompted to explain your previous decisions.</p>
              <p>
                Your original selection will be highlighted. Please write a
                brief justification for why you chose the patient to receive the
                kidney that you chose.
              </p>
              <p>
                {" "}
                If need, click on the patient idenifer ("Patient A" or "Patient
                B") to change your selection.
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
            <MCQuestion>
              {mats.exitSurvey[state.surveyData.length].a.map((a, ai) => (
                <MCItem
                  key={`mcitem_${a}_${ai}`}
                  onClick={() => {
                    dispatch({
                      type: "DIALOG_CLICK",
                      payload: ai,
                      subtype: mats.exitSurvey[state.surveyData.length].subtype
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
                  state.data[state.interventionData.length].chosen
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
                  state.data[state.interventionData.length].chosen
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

      {state.decisionState === "intervention"
        ? [
            <div
              className="about-a about patient-button"
              onClick={() =>
                dispatch({ type: "INTERVENTION_SWITCH", payload: 0 })
              }
              key="about-a-int"
            >
              <h4>Patient A </h4>
            </div>,
            <div
              className="about-b about patient-button"
              key="about-b-int"
              onClick={() =>
                dispatch({ type: "INTERVENTION_SWITCH", payload: 1 })
              }
            >
              <h4>Patient B</h4>
            </div>,
            <TextInputForm key="textinput">
              {state.chosen ===
              state.data[state.interventionData.length].chosen ? (
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
                Confirm
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
                <FontAwesomeIcon
                  icon="user"
                  className="user-icon"
                  key={`user-icon-${d}`}
                />

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
