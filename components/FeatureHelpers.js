import { randomUniform as runif, shuffle } from "d3";

export class PairGenerator {
  constructor(props) {
    const defProps = {
      features: ["age", "drinkingHabitPrediagnosis", "dependents"],

      featureRanges: [[25, 71], [1, 6], [0, 3]],
      randomOrder: true
    };
    this.props = { ...defProps, ...props };

    this.PatientGenerator = {};
    const { features } = this.props;
    for (let f of features) {
      const range = this.getRange(f);
      this.PatientGenerator[f] = runif(range[0], range[1]);
    }
  }
  getRandomOrder = () => {
    return shuffle(this.props.features);
  };
  getRange(f) {
    return this.props.featureRanges[this.props.features.indexOf(f)];
  }
  attentionPair() {
    const out = [
      {
        age: 25,
        drinkingHabitPrediagnosis: 1,
        dependents: 3
      },
      {
        age: 0,
        drinkingHabitPrediagnosis: 5,
        dependents: 0
      }
    ];
    return Math.random() > 0.5 ? out : [out[1], out[0]];
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
