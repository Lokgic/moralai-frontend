import { DisplayProps } from "../../commonTypes";
import {
  PairwiseContainer,
  PatientEmphasis
} from "../../components/StyledComps";
import {
  ChoiceTitle,
  DecisionButton,
  FeatureTable
} from "../../components/ComparisonComps";
import { Choice } from "../../commonTypes";

export default (props: DisplayProps) => {
  const {
    fKeysRandomized,
    handleClick,
    keyToFeatureDesc,
    keyValToFeatureValue,
    pair
  } = props;
  const possibleChoices: Choice[] = ["a", "b"];
  return (
    <PairwiseContainer>
      {possibleChoices.map((side: Choice, si: number) => [
        <ChoiceTitle side={side} key={"choicetitle-" + side} />,
        <DecisionButton
          side={side}
          handleClick={() => handleClick(si)}
          key={"action-buttone" + side}
        />
      ])}
      <FeatureTable
        fKeysRandomized={fKeysRandomized}
        keyToFeatureDesc={keyToFeatureDesc}
        keyValToFeatureValue={keyValToFeatureValue}
        pair={pair}
      ></FeatureTable>
      <PatientEmphasis side={pair[0].exp < pair[1].exp ? "a" : "b"} />
    </PairwiseContainer>
  );
};
