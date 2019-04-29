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
      return `drinks per day on average (prediagnosis)`;
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
      return value;
    case "drinkingHabitPrediagnosis":
      return value;
    case "dependents":
      return value === 0 ? "no" : value;
    default:
      return feature;
  }
};
