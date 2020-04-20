import SequenceLogic from "./helpers/SequenceLogic";

export type Choice = "a" | "b";

export interface ChoiceType {
  side: Choice;
}

export interface DecisionButtonProps {
  side: Choice;
  handleClick: () => void;
}

export interface FeatureTableProps {
  fKeysRandomized: string[];
  keyToFeatureDesc: (key: string) => string;
  keyValToFeatureValue: (key: string, val: number) => string;
  pair: Patient[];
}

export interface DisplayProps extends FeatureTableProps {
  handleClick: (chosen: number) => void;
}

export interface Patient {
  [feature: string]: number;
}

export type PatientPair = Patient[];

export type ValueTranslator = (fkey: string, value: number) => string;

export interface SequenceProps {
  seq: PatientPair[];
  randomized?: boolean;
  featureDict: FeatureMap;
  valueTranslator: ValueTranslator;
}

export interface FeatureMap {
  [featureName: string]: string[] | number[];
}

export interface ExperimentState {
  user_id: string;
  trial_id: string;
  group_id: string;
  sample_id: number;
  chosen: number;
  SL: SequenceLogic;
}
