import {
  ChoiceTitleSty,
  DecisionButtonSty,
  FeatureTableSty,
  FeatureCellSty
} from "./StyledComps";
import {
  ChoiceType,
  DecisionButtonProps,
  FeatureTableProps
} from "../commonTypes";

export const ChoiceTitle = (props: ChoiceType) => (
  <ChoiceTitleSty side={props.side}>
    <h4>Patient {props.side.toUpperCase()}</h4>
  </ChoiceTitleSty>
);

export const DecisionButton = (props: DecisionButtonProps) => (
  <DecisionButtonSty side={props.side} onClick={props.handleClick}>
    Choose {props.side.toUpperCase()}
  </DecisionButtonSty>
);

export const FeatureTable = (props: FeatureTableProps) => (
  <FeatureTableSty>
    {props.fKeysRandomized.map((f, fi) => [
      props.pair.map((p, pi) => (
        <FeatureCellSty key={"f-cell" + fi + pi} side={pi === 0 ? "a" : "b"}>
          <h3>{props.keyToFeatureDesc(f)}</h3>
          <h2>{props.keyValToFeatureValue(f, p[f])}</h2>
        </FeatureCellSty>
      ))
    ])}
  </FeatureTableSty>
);
