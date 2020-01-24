import {
  ComparisonContainer,
  BackgroundFrame
  // FeatureCell,
  // FeatureTable,
  // FeatureHeader,
  // TextInputForm
} from "../comp-styled/featureDisplayComps";

const featuresPredicates = {
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
  tatoos: "Number of Tattoos",
  political: "Political Affliation",
  weight: "Weight"
};

export default () => {
  return (
    <ComparisonContainer>
      <BackgroundFrame col="1/-1" row="3/-1" />
    </ComparisonContainer>
  );
};
