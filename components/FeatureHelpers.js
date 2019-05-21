export class PairGenerator {
  constructor(props) {
    const defProps = {
      features: ["age", "drinkingHabitPrediagnosis", "dependents"],
      featureOrder: ["age", "drinkingHabitPrediagnosis", "dependents"],
      featureRanges: [[25, 71], [1, 6], [0, 3]]
    };
    this.props = defProps;
  }
  getRange(f) {
    return this.props.featureRanges[this.props.features.indexOf(f)];
  }
  // PatientGenerator = {

  //   age: runif(25, 71),
  //   drinkingHabitPrediagnosis: runif(1, 6),
  //   dependents: runif(0, 3)
  // };

  // randomPatient = (order = forder) =>
  //   order.map(d => Math.floor(PatientGenerator[d]()));
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
