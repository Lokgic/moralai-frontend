import { StateType, ReducerActionType, Datapoint } from "./types";
import { arrayRandomizer } from "../../helpers/SequenceLogic";

export default (state: StateType, action: ReducerActionType): StateType => {
  const { type, payload } = action;
  const {
    data,
    uiState,
    SL,
    pair,
    timestamp,
    fKeysRandomized,
    chosen,
    ousOrder,
    ousData
  } = state;
  const newTS = Date.now();
  console.log("ACTION TYPE: " + action.type + ", PAYLOAD: " + payload);
  switch (type) {
    // case "SET_UI":
    //   return {
    //     ...state,
    //     uiState: payload
    //   };
    // case "NEXT_SEQ":
    //   if (seqIndex >= 99) {
    //     return {
    //       ...state,
    //       uiState: {
    //         display: "off",
    //         dialog: "question"
    //       }
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       seqIndex: seqIndex + 1
    //     };
    //   }
    // case "SET_DATA": {
    //   return {
    //     ...state,
    //     data: payload
    //   };
    // }
    case "DIALOG_CLICK": {
      if (uiState.dialog === "oxford") {
        return {
          ...state,
          chosen: payload
        };
      }
    }
    case "SET_CHOSEN": {
      if (uiState.display === "decision") {
        return {
          ...state,
          chosen: payload,
          uiState: {
            ...uiState,
            dialog: "confirm"
          }
        };
      }
    }
    case "DIALOG_CONFIRM": {
      if (uiState.dialog === "aai") {
        return {
          ...state,
          uiState: {
            ...uiState,
            dialog: "ass"
          }
        };
      } else if (uiState.dialog === "ass") {
        return {
          ...state,
          uiState: {
            display: "decision",
            dialog: "off"
          }
        };
      } else if (
        uiState.display === "decision" &&
        uiState.dialog === "confirm"
      ) {
        const DP: Datapoint = {
          pair,
          fKeysRandomized,
          chosen,
          start: new Date(timestamp).toISOString(),
          end: new Date(newTS).toISOString(),
          decision_rank: data.length,
          delay: newTS - timestamp
        };
        const out = {
          ...state,
          data: [...data, DP]
        };
        if (!SL.isCurrentLast()) {
          out.pair = SL.getNext();
          out.fKeysRandomized = arrayRandomizer(SL.getFeatureKeys());
          out.uiState.dialog = "off";
        }
        return out;
      } else if (uiState.dialog === "oxford") {
        const out = {
          ...state,
          chosen: -1,
          ousData: [
            ...ousData,
            { qid: ousOrder[ousData.length], answer: chosen }
          ]
        };
        if (out.ousData.length >= ousOrder.length) {
          out.uiState = {
            display: "off",
            dialog: "aai"
          };
        }
        return out;
      }
    }
    case "DECISION_CANCEL": {
      if (uiState.display === "decision" && uiState.dialog === "confirm") {
        return {
          ...state,
          chosen: -1,
          uiState: {
            dialog: "off",
            display: "decision"
          }
        };
      }
    }

    default:
      return state;
  }
};
