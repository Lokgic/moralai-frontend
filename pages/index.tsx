// import React from "react";
import Dialog from "../exp/aaiii/Dialog";
import Display from "../exp/aaiii/Display";
import { MainWrapper } from "../components/StyledComps";
import SL from "../exp/aaiii/Sequence";
import reducer from "../exp/aaiii/reducer";
import { StateType } from "../exp/aaiii/types";
import { v4 as getUid } from "uuid";
import { useReducer } from "react";
import { arrayRandomizer } from "../helpers/SequenceLogic";
import { oxfordScale } from "../exp/aaiii/Dialog";

const ousOrder = arrayRandomizer(
  Object.keys(oxfordScale.q).map(d => parseInt(d))
);

const initialState: StateType = {
  user_id: getUid(),
  trial_id: "",
  group_id: "control",
  sample_id: 999,
  uiState: { dialog: "oxford", display: "off" },
  data: [],
  chosen: -1,
  fKeysRandomized: arrayRandomizer(SL.getFeatureKeys()),
  pair: SL.getCurrent(),
  SL,
  timestamp: Date.now(),
  ousData: [],
  ousOrder
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { fKeysRandomized, pair, uiState, chosen, ousData } = state;
  const { display } = uiState;

  return (
    <MainWrapper>
      {display === "decision" ? (
        <Display
          handleClick={payload => dispatch({ type: "SET_CHOSEN", payload })}
          fKeysRandomized={fKeysRandomized}
          pair={pair}
          keyToFeatureDesc={SL.keyToFeatureDesc}
          keyValToFeatureValue={SL.keyValToFeatureValue}
        />
      ) : null}
      <Dialog
        uiState={uiState}
        chosen={chosen}
        handleConfirm={() => dispatch({ type: "DIALOG_CONFIRM" })}
        handleExit={() => dispatch({ type: "DECISION_CANCEL" })}
        ousIndex={ousOrder[ousData.length]}
        setChosen={payload => dispatch({ type: "DIALOG_CLICK", payload })}
        ousProgress={(ousData.length / ousOrder.length) * 100}
      />
    </MainWrapper>
  );
};
