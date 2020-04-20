import { PatientPair, ExperimentState } from "../../commonTypes";
export type DisplayType = "off" | "decision";

export type DialogType =
  | "off"
  | "intro"
  | "oxford"
  | "confirm"
  | "aai"
  | "ass"
  | "outro";

type Action =
  | "SET_UI"
  | "SET_DATA"
  | "NEXT_SEQ"
  | "DIALOG_CLICK"
  | "DIALOG_CONFIRM"
  | "SET_CHOSEN"
  | "DECISION_CANCEL";

export interface UIStateType {
  dialog: DialogType;
  display: DisplayType;
}

export interface ReducerActionType {
  type: Action;
  payload?: any;
}

export interface Datapoint {
  pair: PatientPair;
  start: string;
  end: string;
  delay: number;
  fKeysRandomized: string[];
  chosen: number;
  decision_rank: number;
}

export interface StateType extends ExperimentState {
  timestamp: number;
  uiState: UIStateType;
  data: Datapoint[];
  fKeysRandomized: string[];
  pair: PatientPair;
  ousData: { qid: number; answer: number }[];
  ousOrder: number[];
}

export interface DialogProps {
  // uid: string;
  uiState: UIStateType;
  // setUIState: (payload: UIStateType) => void;
  chosen: number;
  setChosen: (payload: number) => void;
  handleConfirm: () => void;
  handleExit: () => void;
  ousIndex: number;
  ousProgress: number;
}

// Styled Props

export interface SliderProps {
  min: number;
  max: number;
  value: number | undefined;
  className?: string;
  id?: string;
  // handleChange:(e:ChangeEvent)=>void
  handleChange: Function;
  unit?: string;
}
