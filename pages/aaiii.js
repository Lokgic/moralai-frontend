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
  PatientEmphasis,
  LikertScale,
  LikertOption
} from "../comp-styled/interface";
import { useReducer, useEffect, useState } from "react";
import { useRouter } from "next/router";
import SequenceLogic from "../components/SequenceLogic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayRandomizer } from "../components/FeatureHelpers";
import { v1 } from "uuid";
import mats from "../data/aaiii.json";
import oxfordScale from "../data/ous.json";
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
    cause: ["hereditary", "alcohol use", "drug use"]
  };
  switch (fkey) {
    case "exp":
      return `${value} years`;
    case "dependents":
      return value === 0 ? "none" : value;
    case "income":
      return `$${valueDictionary[fkey][value]} per year`;
    default:
      return valueDictionary[fkey][value];
  }
};

const postPairs = [
  [
    { exp: 9, cause: 1 },
    { exp: 4, cause: 0 }
  ],
  [
    { exp: 16, cause: 1 },
    { exp: 11, cause: 0 }
  ],
  [
    { exp: 19, cause: 2 },
    { exp: 14, cause: 0 }
  ],
  [
    { exp: 27, cause: 2 },
    { exp: 22, cause: 0 }
  ],
  [
    { exp: 14, cause: 2 },
    { exp: 4, cause: 0 }
  ],
  [
    { exp: 18, cause: 1 },
    { exp: 8, cause: 0 }
  ],
  [
    { exp: 26, cause: 2 },
    { exp: 16, cause: 0 }
  ],
  [
    { exp: 31, cause: 2 },
    { exp: 21, cause: 0 }
  ],
  [
    { exp: 40, cause: 1 },
    { exp: 30, cause: 0 }
  ],
  [
    { exp: 20, cause: 1 },
    { exp: 5, cause: 0 }
  ],
  [
    { exp: 27, cause: 1 },
    { exp: 12, cause: 0 }
  ],
  [
    { exp: 31, cause: 1 },
    { exp: 16, cause: 0 }
  ],
  [
    { exp: 37, cause: 2 },
    { exp: 22, cause: 0 }
  ],
  [
    { exp: 42, cause: 2 },
    { exp: 27, cause: 0 }
  ],
  [
    { exp: 26, cause: 2 },
    { exp: 6, cause: 0 }
  ],
  [
    { exp: 33, cause: 1 },
    { exp: 13, cause: 0 }
  ],
  [
    { exp: 41, cause: 2 },
    { exp: 21, cause: 0 }
  ],
  [
    { exp: 36, cause: 2 },
    { exp: 11, cause: 0 }
  ],
  [
    { exp: 39, cause: 1 },
    { exp: 14, cause: 0 }
  ],
  [
    { exp: 28, cause: 1 },
    { exp: 21, cause: 0 }
  ]
];

const addDistraction = arr => {
  return [...arr].map(d => {
    const df = arrayRandomizer(targetEdDistractionFeature).slice(0, 2);
    const fVal = df.map(d =>
      Math.floor(Math.random() * mats.dFeatures[d].length)
    );

    return d.map(patient => {
      const newP = {
        ...patient,
        [df[0]]: fVal[0],
        [df[1]]: fVal[1]
      };
      return newP;
    });
  });
};

const postPairD = [...addDistraction(postPairs)];

const sl = new SequenceLogic({
  seq: postPairD,
  randomized: true,
  featureDict: mats.featureDict,
  valueTranslator
});

const initialState = {
  user_id: v1(),
  trial_id: "",
  group_id: "control",
  sample_id: 999,
  decisionState: "intro",
  dialogState: "intro",
  pairSeq: sl,
  pair: sl.getCurrent(),
  timeStamp: Date.now(),
  chosen: null,
  dialogChosen: -1,
  ousData: [],
  pairwiseData: [],
  exitData: [],
  fKeysRandomized: arrayRandomizer(sl.getFeatureKeys()),
  textInput: ""
};

const IntroScreen = ({ handleNext, group }) => (
  <DarkOverlay>
    <Dialog big>
      <div className="dialog-header">
        <h2>Introduction</h2>
      </div>
      <div className="message">
        <p>
          In this activity, we will ask you about our opinions about morality.
        </p>
        {group !== "control" ? (
          <p className="choice-message">
            An <span className="emph">artificial intelligence (AI)</span> will
            use your responses to these questions to predict how you will make
            decisions in the next part of the activity.
          </p>
        ) : null}
      </div>
      <div className="buttons">
        <button className="confirm-button" onClick={handleNext}>
          {group === "control"
            ? "Proceed"
            : "I understand that my response will be evaluated by an AI"}
        </button>
      </div>
    </Dialog>
  </DarkOverlay>
);

const OxfordUtilScale = ({
  finishedQ,
  handleNextQuestion,
  chosen,
  setChosen,
  group
}) => (
  <DarkOverlay>
    <Dialog big>
      <div className="dialog-header">
        <h2>{group === "control" ? "" : "AI "} Moral Personality Assessment</h2>
      </div>
      <div className="message">
        <p>
          Do you agree with the following statement?
          {` (${finishedQ}/${oxfordScale.q.length})`}
        </p>
        <p className="choice-message">{oxfordScale.q[finishedQ]}</p>

        <LikertScale>
          {oxfordScale.a.map((d, i) => (
            <div className="likert-item" key={`lsitem${d}`}>
              <LikertOption onClick={() => setChosen(i)} active={i == chosen} />
              <p>{d}</p>
            </div>
          ))}
        </LikertScale>
      </div>
      <div className="buttons">
        {chosen > -1 ? (
          <button
            className="confirm-button"
            style={{ margin: "0 auto" }}
            onClick={() => handleNextQuestion()}
          >
            Continue
          </button>
        ) : null}
      </div>
    </Dialog>
  </DarkOverlay>
);

const Assessment = ({ group }) => {
  if (group === "control") {
    return (
      <DarkOverlay>
        <Dialog>
          <p className="choice-message">
            We are interested in your judgment on which particular patient
            should get a kidney.
          </p>
        </Dialog>
      </DarkOverlay>
    );
  }
};

const DecisionIntro = ({ handleNext }) => {
  const [page, setPage] = useState(0);
  const page1 = (
    <div className="message">
      <p>
        We are interested in your judgment on which particular patient should
        get a kidney.
      </p>
      <p>
        Please consider two patients (A and B) both of whom need a kidney
        transplant but there is only one kidney available for transplant. If one
        patient receives the kidney, the other will not.
      </p>
      <p>
        Patients who <b>do</b> receive the kidney will undergo an operation that
        is almost always successful.
      </p>
      <p>
        Patients who <b>do not</b> receive the kidney will remain on dialysis
        and is likely to die within a year or two.
      </p>
    </div>
  );
  const page2 = (
    <div className="message">
      <p>Please keep in mind that:</p>
      <p className="choice-message" style={{ textAlign: "left" }}>
        Life expectancy will <b>not</b> be affected by the patient’s future
        alcohol and drug use
      </p>
      <p className="choice-message" style={{ textAlign: "left" }}>
        All patients <b>have stopped drinking and drug use</b> after being
        diagnosed with a kidney disease.
      </p>
    </div>
  );
  const next = () => (page === 0 ? setPage(1) : handleNext());
  return (
    <DarkOverlay>
      <Dialog big>
        <div className="dialog-header">
          <h2>Activity 2</h2>
        </div>
        {page === 0 ? page1 : page2}
        <div className="buttons">
          <button className="confirm-button" onClick={next}>
            Proceed
          </button>
        </div>
      </Dialog>
    </DarkOverlay>
  );
};

const reducer = (state, action) => {
  const {
    dialogState,
    ousData,
    dialogChosen,
    group_id,
    pair,
    pairSeq,
    fKeysRandomized,
    chosen,
    pairwiseData,
    timeStamp
  } = state;
  const newTS = Date.now();
  const { payload } = action;
  console.log("ACTION TYPE: " + action.type + ", PAYLOAD: " + payload);
  switch (action.type) {
    case "DIALOG_CONFIRM": {
      if (dialogState === "intro") {
        return {
          ...state,
          dialogState: "ous"
        };
      } else if (dialogState === "ous") {
        const out = {
          ...state,
          ousData: [...ousData, dialogChosen],
          dialogChosen: -1
        };

        if (out.ousData.length === oxfordScale.q.length) {
          out.dialogState = group_id === "control" ? "decisionIntro" : "ass";
        }

        return out;
      } else if (dialogState === "decisionIntro") {
        return {
          ...state,
          dialogState: "off",
          decisionState: "decision"
        };
      }
    }
    case "DIALOG_CLICK": {
      if (dialogState === "ous") {
        return {
          ...state,
          dialogChosen: action.payload
        };
      }
      break;
    }
    case "DECISION_CLICK":
      return {
        ...state,
        chosen: action.chosen,
        dialogState: "decisionConfirm"
      };
    case "DECISION_CONFIRM": {
      const time = {
        start: new Date(timeStamp).toISOString(),
        end: new Date(newTS).toISOString(),
        decision_rank: pairwiseData.length,
        delay: newTS - timeStamp
      };

      const newPairData = [
        ...pairwiseData,
        {
          pair,
          time,
          fKeysRandomized,
          chosen
        }
      ];
      const out = {
        ...state,
        timeStamp: newTS,
        chosen: null,
        pairwiseData: newPairData
      };
      if (newPairData.length >= postPairs.length) {
        out.dialogState = "exitSurvey";
        out.decisionState = "off";
        return out;
      } else {
        out.pair = pairSeq.getNext();
        out.fKeysRandomized = arrayRandomizer(pairSeq.getFeatureKeys());
        out.dialogState = "off";
        return out;
      }
    }
    case "DIALOG_OFF": {
      return {
        ...state,
        dialogState: "off"
      };
    }
    case "EXITSURVEY_CLICK": {
      if (action.qType === "inclusive") {
        if (
          typeof state.dialogChosen === "number" ||
          state.dialogChosen === null
        ) {
          return {
            ...state,
            dialogChosen: [action.payload]
          };
        } else if (typeof dialogChosen === "object") {
          const indexOfPayload = dialogChosen.indexOf(action.payload);
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
        } else {
          return { ...state };
        }
      }
      return {
        ...state,
        dialogChosen: action.payload
      };
    }
    case "SET_TEXT_INPUT":
      return {
        ...state,
        textInput: payload
      };
    case "EXITSURVEY_CONFIRM": {
      let newExitsurveyData;

      if (action.qType === "textInput") {
        newExitsurveyData = state.textInput;
      } else if (action.qType === "inclusive") {
        newExitsurveyData = dialogChosen.join("-");
      } else {
        newExitsurveyData = dialogChosen;
      }

      const newExitData = [...state.exitData, newExitsurveyData];
      const out = {
        ...state,
        dialogChosen: null,
        exitData: newExitData,
        textInput: ""
      };
      if (newExitData.length >= mats.exitSurvey.length) {
        out.dialogState = "outro";
      }
      return out;
    }
    default:
      return state;
  }
};

const ExitSurvey = ({ qIndex, dispatch, dialogChosen, textInput }) => (
  <DarkOverlay>
    <Dialog big>
      <div className="dialog-header">
        <h2>Exit Survery</h2>
      </div>
      <div className="message">
        <p className="choice-message">{mats.exitSurvey[qIndex].q}</p>
      </div>
      {mats.exitSurvey[qIndex].qType === "textInput" ? (
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
          {mats.exitSurvey[qIndex].a.map((a, ai) => (
            <MCItem
              key={`mcitem_${a}_${ai}`}
              onClick={() => {
                dispatch({
                  type: "EXITSURVEY_CLICK",
                  payload: ai,
                  qType: mats.exitSurvey[qIndex].qType
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
                type: "EXITSURVEY_CONFIRM",
                qType: mats.exitSurvey[qIndex].qType
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

const DiaglogConfirmDecision = ({ chosen, handleConfirm, handleCancel }) => (
  <DarkOverlay>
    <Dialog>
      <div className="dialog-header">
        <h2>Are you sure?</h2>
      </div>
      <div className="message">
        <p>You have decided to...</p>
        <p className="choice-message">
          {["give A the kidney", "give B the kidney"][chosen]}
        </p>
      </div>
      <div className="buttons">
        <button className="confirm-button" onClick={handleConfirm}>
          Yes, proceed
        </button>
        <button onClick={handleCancel}>No, go back </button>
      </div>
    </Dialog>
  </DarkOverlay>
);

const DialogComp = ({ state, dispatch }) => {
  const {
    dialogState,
    ousData,
    group_id,
    dialogChosen,
    chosen,
    exitData,
    textInput,
    user_id
  } = state;
  const dialogConfirm = () => dispatch({ type: "DIALOG_CONFIRM" });
  switch (dialogState) {
    case "intro":
      return <IntroScreen group={group_id} handleNext={dialogConfirm} />;
    case "ous": {
      return (
        <OxfordUtilScale
          group={group_id}
          finishedQ={ousData.length}
          handleNextQuestion={dialogConfirm}
          chosen={dialogChosen}
          setChosen={chosen =>
            dispatch({ type: "DIALOG_CLICK", payload: chosen })
          }
        />
      );
    }
    case "ass": {
      return <Assessment group={group_id} />;
    }
    case "decisionIntro":
      return <DecisionIntro handleNext={dialogConfirm} />;
    case "decisionConfirm":
      return (
        <DiaglogConfirmDecision
          chosen={chosen}
          handleConfirm={() => dispatch({ type: "DECISION_CONFIRM" })}
          handleCancel={() => dispatch({ type: "DIALOG_OFF" })}
        />
      );
    case "exitSurvey":
      return (
        <ExitSurvey
          qIndex={exitData.length}
          dispatch={dispatch}
          dialogChosen={dialogChosen}
          textInput={textInput}
        />
      );
    case "outro":
      return (
        <DarkOverlay>
          <Dialog>
            <div className="dialog-header">
              <h2>Completed</h2>
            </div>
            <div className="message">
              <p>your unique code:</p>
              <p>{user_id}</p>
              <p>
                Please enter this code and complete the rest of your Qualtric
                survey
              </p>
            </div>
          </Dialog>
        </DarkOverlay>
      );
    case "off":
    default:
      return null;
  }
};

const DecisionScreen = props => {
  const {
    pair,
    fKeysRandomized,
    pairSeq,
    handleDecision,
    decisionState
  } = props;
  return decisionState === "decision"
    ? [
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
              onClick={() => handleDecision(d)}
              key={`PatientNameButton-${d}`}
            >
              Choose {["A", "B"][d]}
            </PatientNameButton>
          </UserIconContainer>,
          <FeatureTable key="ftable">
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
        ])
      ]
    : null;
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  const { pairSeq, pair, fKeysRandomized, decisionState } = state;
  return (
    <ComparisonContainer>
      <BackgroundFrame col="1/-1" row="3/-1" />
      <DialogComp state={state} dispatch={dispatch} />
      <DecisionScreen
        decisionState={decisionState}
        pairSeq={pairSeq}
        pair={pair}
        fKeysRandomized={fKeysRandomized}
        handleDecision={chosen => dispatch({ type: "DECISION_CLICK", chosen })}
      />
    </ComparisonContainer>
  );
};
