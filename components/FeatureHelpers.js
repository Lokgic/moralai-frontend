import { randomUniform as runif, shuffle } from "d3";

export class GeneralGen {
  constructor(props) {
    this.features = props.features;
    this.ranges = props.ranges;
    this.instantiateFeature = this.instantiateFeature.bind(this);
    this.randomPatient = this.randomPatient.bind(this);
    this.getNewPair = this.getNewPair.bind(this);
  }
  instantiateFeature(f) {
    const { ranges } = this;

    const range = ranges[f];
    const spread = 1 + range[1] - range[0];
    return Math.floor(Math.random() * spread) + range[0];
  }
  randomPatient() {
    const out = {};
    const { features, instantiateFeature } = this;
    for (let f of features) {
      out[f] = instantiateFeature(f);
    }
    return out;
  }
  getNewPair() {
    return [this.randomPatient(), this.randomPatient()];
  }
}

export class PredefinedSeq {
  constructor(props) {
    this.seq = props.seq;
    this.current = 0;
    this.features = props.features;
    this.getCurrentIndex = this.getCurrentIndex.bind(this);
    this.getCurrent = this.getCurrent.bind(this);
    this.getNext = this.getNext.bind(this);
  }
  getCurrentIndex() {
    return this.current;
  }
  getCurrent() {
    return this.seq[this.current];
  }
  getNext() {
    if (this.current < this.seq.length - 1) {
      this.current += 1;
      return this.getCurrent();
    } else {
      return this.getCurrent();
    }
  }
}

export const seqRandomizer = seq => {
  let out = [...seq];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }

  return out.map(d => (Math.random() > 0.5 ? [d[1], d[0]] : d));
};

export const arrayRandomizer = seq => {
  let out = [...seq];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

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
  parsePairs(obj) {
    const { features } = this.props;
    const keys = {
      age: "age",
      drinkingHabitPrediagnosis: "drinks",
      dependents: "dependents"
    };
    return ["left", "right"].map(p => {
      let out = {};
      for (let f of features) {
        out[f] = obj[p + "_" + keys[f]];
      }
      return out;
    });
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
