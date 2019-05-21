import { randomUniform as runif } from "d3";

export class PairGenerator {
  constructor(props) {
    const defProps = {
      features: ["age", "drinkingHabitPrediagnosis", "dependents"],
      featureOrder: ["age", "drinkingHabitPrediagnosis", "dependents"],
      featureRanges: [[25, 71], [1, 6], [0, 3]],
      randomOrder: true
    };
    this.props = { ...defProps, ...props };
    if (this.props.randomOrder) {
      const { featureOrder } = this.props;
      let currentIndex = featureOrder.length,
        tempValue,
        randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = featureOrder[currentIndex];
        featureOrder[currentIndex] = featureOrder[randomIndex];
        featureOrder[randomIndex] = tempValue;
      }
    }
    this.PatientGenerator = {};
    const { features } = this.props;
    for (let f of features) {
      const range = this.getRange(f);
      this.PatientGenerator[f] = runif(range[0], range[1]);
    }
  }
  getRange(f) {
    return this.props.featureRanges[this.props.features.indexOf(f)];
  }
  randomPatient() {
    const out = {};
    const { features } = this.props;
    for (let f of features) {
      out[f] = Math.floor(this.PatientGenerator[f]());
    }
    return out;
  }
}

export const graphicSelector = feature => {
  switch (feature) {
    case "age":
      return `birthday-cake`;
    case "additionalHealthIssues":
      return `briefcase-medical`;
    case "drinkingHabitPrediagnosis":
      return `wine-glass-alt`;
    case "criminalRecord":
      return `gavel`;
    case "dependents":
      return `child`;
    default:
      return null;
  }
};

export const predicateTranslater = (feature, value) => {
  switch (feature) {
    case "age":
      return `years old`;
    case "additionalHealthIssues":
      return `additional health issues`;
    case "drinkingHabitPrediagnosis":
      return `drinks per day prediagnosis`;
    case "criminalRecord":
      return `criminal record`;
    case "dependents":
      return `child dependent(s)`;
    default:
      return feature;
  }
};

export const valueTranslater = (feature, value) => {
  switch (feature) {
    case "age":
      return value === 0 ? "Dead" : value;
    case "drinkingHabitPrediagnosis":
      return value;
    case "dependents":
      return value;
    default:
      return feature;
  }
};
