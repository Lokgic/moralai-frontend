import { randomUniform as dunif } from "d3";
import archtype from "../static/archtype";

export const makeType = (ty = []) => {
  const b = { ...archtype.base };
  for (let typeName of ty) {
    const properties = archtype[typeName];
    for (let key of Object.keys(properties)) {
      b[key] = properties[key];
    }
  }
  return new Person(b);
};

export class Person {
  constructor(properties = null) {
    const ageGen = () => Math.round(dunif(0, 4)());
    const otherGen = () => Math.floor(dunif(0, 3)());
    if (properties !== null) this.properties = properties;
    else
      this.properties = {
        age: ageGen(),
        additionalHealthIssues: otherGen(),
        drinkingHabitPrediagnosis: otherGen(),
        criminalRecord: otherGen(),
        dependents: otherGen()
      };
  }
}

class PairGen {
  constructor(customQ = [], random = true) {
    this.random = random;

    this.customQ = customQ.map(p => {
      const left = p[0];
      const right = p[1];

      const processedPair = [makeType(left), makeType(right)];
      // for (let typeName of left) {
      //   const t = archtype[typeName];
      //   for (let key of Object.keys(t)) {
      //     processedPair[0][key] = t[key];
      //   }
      // }
      // for (let typeName of right) {
      //   const t = archtype[typeName];

      //   for (let key of Object.keys(t)) {
      //     processedPair[1][key] = t[key];
      //   }
      // }

      return processedPair;
    });
    this.history = [];
  }
  getNew() {
    // if (this.customQ.length <= 0) {
    //   const newPair = [new Person(), new Person()]
    //   this.history.push(newPair);
    // return newPair
    // }
    if (this.random === false && this.customQ.length > 0) {
      const currentArray = this.customQ.shift();
      this.history.push([currentArray[0], currentArray[1]]);
      return this.history[this.history.length - 1];
    } else {
      const newPair = [new Person(), new Person()];
      this.history.push(newPair);
      return newPair;
    }
  }
  getRandomSamples(n = 100) {
    const out = [];
    for (let i = 0; i < n; i++) {
      out.push(new Person());
    }
    return out;
  }
  getDiff(a, b) {
    // console.log(a);
    const keys = Object.keys(a.properties);
    const diff = {};
    for (let k of keys) {
      diff[k] = a.properties[k] - b.properties[k];
    }
    return diff;
  }
}

export class StatMaker {
  constructor(one, many) {
    this.one = one;
    this.many = many;
    this.keys = Object.keys(one);
  }
  getWeight() {
    // const many = {this}
    // const blank = archtype.blank
    // const paragons = {
    //   age:{...blank,age:4},
    //   additionalHealthIssues:{...blank,additionalHealthIssues:2},
    //   drinkingHabitPrediagnosis:{...blank,drinkingHabitPrediagnosis:2},
    //   criminalRecord:{...blank,criminalRecord:2},
    //   dependents:{...blank,dependents:2}
    // }
    // const blankWeight = many.map((d, i) => {
    //   const p = net.run(pairMaker.getDiff(testcase, d)).choice;
    //   const prediction = p > 0.66 ? 1 : p < 0.33 ? 0 : 2;
    //   return { prediction, properties: d.properties };
    // });
    // const w = keys.map(d=>{

    // })
    // const predictions = sample.map((d, i) => {
    //   const p = net.run(pairMaker.getDiff(testcase, d)).choice;
    //   const prediction = p > 0.66 ? 1 : p < 0.33 ? 0 : 2;
    //   return { prediction, properties: d.properties };
    // });
    const dist = this.getDistribution();
    console.log(dist);
    return this.keys.reduce(
      (accu, d, i) => {
        accu[d] = 50 - (dist[0][d] - dist[1][d]) / 20;
        return accu;
      },
      {
        ...archtype.blank
      }
    );
  }
  getTotalStat() {
    const stat = [0, 0, 0];
    const { many } = this;
    for (let i = 0; i < many.length; i++) {
      stat[many[i].prediction] += 1;
    }
    return stat;
  }
  getFilteredStat(key = "age", more = true) {
    const stat = [0, 0, 0];
    const { one, many } = this;
    const filteredArr = more
      ? many.filter(d => d.properties[key] > one[key])
      : many.filter(d => d.properties[key] > one[key]);
    for (let i = 0; i < filteredArr.length; i++) {
      stat[filteredArr[i].prediction] += 1;
    }
    return stat;
  }
  getWeightBreakDown(key = "age") {
    const stat = this.getFilteredStat(key);
    const sum = stat.reduce((sum, d) => sum + d, 0) || 1;
    return stat.map(d => Math.round((d / sum) * 100));
  }

  getDistribution(mode = "cat") {
    const { one, many } = this;
    if (mode === "cat") {
      const dist = [
        {
          age: 0,
          drinkingHabitPrediagnosis: 0,
          additionalHealthIssues: 0,
          criminalRecord: 0,
          dependents: 0
        },
        {
          age: 0,
          drinkingHabitPrediagnosis: 0,
          additionalHealthIssues: 0,
          criminalRecord: 0,
          dependents: 0
        },
        {
          age: 0,
          drinkingHabitPrediagnosis: 0,
          additionalHealthIssues: 0,
          criminalRecord: 0,
          dependents: 0
        }
      ];

      for (let i in many) {
        const { prediction, properties } = many[i];
        const keys = Object.keys(one);
        for (let k of keys) {
          if (properties[k] > one[k]) dist[prediction][k] += 1;
        }
      }
      return dist;
    } else {
      const dist = [0, 0, 0];
      for (let i in many) {
        const { prediction, properties } = many[i];

        dist[prediction] += 1;
      }
      return dist;
    }
  }
}

export const expandTranslator = feature => {
  return {
    age: [
      "age",
      "Should age matter? Should preference be given to younger patients?"
    ],
    additionalHealthIssues: [
      "additional health issues",
      "A patient might have additional non-kidney related health problems, which might affect how healthy they will be after receiving a kidney. Should their non-kidney-related health be taken into account in allocating a kidney?"
    ],
    drinkingHabitPrediagnosis: [
      "drinking habit before diagnosis",
      "Should we consider drinking habits when allocating a kidney? Does it matter if the patient’s drinking habits changed after they were diagnosed with a kidney problem?"
    ],
    criminalRecord: [
      "criminal record",
      "Should we judge someone by his/her criminal record when distributing kidneys? Does the nature of the crime matter? Or patterns of behavior?"
    ],
    dependents: [
      "dependents",
      "Sometimes a patient has a child depending on them---does that make the patient more deserving of a kidney?"
    ]
  }[feature];
};

export const predicateTranslater = (feature, value) => {
  switch (feature) {
    case "age":
      return `years old`;
    case "additionalHealthIssues":
      return `additional health issues`;
    case "drinkingHabitPrediagnosis":
      return `drinking habit before diagnosis`;
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
      return [18, 32, 55, 75, 90][value];
    case "additionalHealthIssues":
      return ["no", "mild", "severe"][value];
    case "drinkingHabitPrediagnosis":
      return ["no", "moderate", "serious"][value];
    case "criminalRecord":
      return ["no", "non-violent", "violent"][value];
    case "dependents":
      return ["no", 1, 2][value];
    default:
      return feature;
  }
};

export const valueTranslaterComplete = (feature, value) => {
  switch (feature) {
    case "age":
      return [
        "18 years old",
        "32 years old",
        "55 years old",
        "75 years old",
        "90 years old"
      ][value];
    case "additionalHealthIssues":
      return [
        "no additional health issues",
        "mild additional health issues",
        "severe additional health issues"
      ][value];
    case "drinkingHabitPrediagnosis":
      return [
        "no drinking habit",
        "moderate drinking habit",
        "serious drinking habit"
      ][value];
    case "criminalRecord":
      return [
        "no criminal record",
        "non-violent criminal record",
        "violent criminal record"
      ][value];
    case "dependents":
      return ["no dependents", "1 dependent", "two dependents"][value];
    default:
      return feature;
  }
};

export const subjectTranslater = (feature, name) => {
  switch (feature) {
    case "age":
      return `${name} is`;
    case "additionalHealthIssues":
    case "drinkingHabitPrediagnosis":
    case "criminalRecord":
    case "dependents":
      return `${name} has`;
    default:
      return name;
  }
};

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

export const featuresDisplayName = {
  age: "age",
  additionalHealthIssues: "additional health issues",
  drinkingHabitPrediagnosis: "drinking habits prediagnosis",
  criminalRecord: "criminal record",
  dependents: "dependents"
};

export const relativeValue = feature => {
  switch (feature) {
    case "age":
      return ["younger", "older"];
    case "drinkingHabitPrediagnosis":
      return ["lighter", "heavier"];
    case "criminalRecord":
      return ["less serious", "more serious"];
    case "dependents":
    case "additionalHealthIssues":
      return ["fewer", "more"];
    default:
      return feature;
  }
};

export const modelPrefTitle = feature => {
  switch (feature) {
    case "age":
      return `age`;
    case "additionalHealthIssues":
      return `additional health issues`;
    case "drinkingHabitPrediagnosis":
      return `drinking habit before diagnosis`;
    case "criminalRecord":
      return `criminal record`;
    case "dependents":
      return `number of dependents`;
    default:
      return null;
  }
};

export default PairGen;
