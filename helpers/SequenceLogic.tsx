import {
  FeatureMap,
  SequenceProps,
  Patient,
  PatientPair,
  ValueTranslator
} from "../commonTypes";

// export const seqRandomizer = seq => {
//     let out = [...seq];
//     for (let i = out.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [out[i], out[j]] = [out[j], out[i]];
//     }

//     return out.map(d => (Math.random() > 0.5 ? [d[1], d[0]] : d));
//   };

export const arrayRandomizer = (arr: Array<any>) => {
  let out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

export const addEqualDistractionToSeq = (
  pairs: PatientPair[],
  nFeaturesToAdd: number,
  featuresToAddKeys: string[],
  featureMap: FeatureMap
): Patient[][] => {
  return [...pairs].map(d => {
    const df = arrayRandomizer(featuresToAddKeys).slice(0, nFeaturesToAdd);
    const fVal = df.map(d => Math.floor(Math.random() * featureMap[d].length));

    return d.map((patient: Patient) => {
      const newP: Patient = {
        ...patient,
        [df[0]]: fVal[0],
        [df[1]]: fVal[1]
      };
      return newP;
    });
  });
};

export default class SequenceHandler implements SequenceProps {
  seq: PatientPair[];
  randomized?: boolean;
  featureDict: FeatureMap;
  valueTranslator: ValueTranslator;
  current: number;

  constructor(props: SequenceProps) {
    // this.featureTranslator = props.featureTranslator;
    this.featureDict = props.featureDict;
    this.valueTranslator = props.valueTranslator;
    this.seq = props.randomized ? this.seqRandomizer(props.seq) : props.seq;
    this.current = -1;
    this.getCurrentIndex = this.getCurrentIndex.bind(this);
    this.getCurrent = this.getCurrent.bind(this);
    this.getNext = this.getNext.bind(this);
    // this.valueTranslator = this.valueTranslator.bind(this);
  }
  seqRandomizer = (seq: Array<PatientPair>) => {
    let out = [...seq];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }

    return out.map(d => (Math.random() > 0.5 ? [d[1], d[0]] : d));
  };
  keyToFeatureDesc = (fkey: string): string => this.featureDict[fkey] + "";
  keyValToFeatureValue = (fkey: string, val: number) =>
    this.valueTranslator(fkey, val);
  getCurrentIndex() {
    if (this.current === -1) {
      this.current = 0;
    }
    return this.current;
  }
  getCurrent() {
    if (this.current === -1) {
      this.current = 0;
    }
    return this.seq[this.current];
  }
  getFeatureKeys() {
    if (this.current === -1) {
      this.current = 0;
    }
    return Object.keys(this.seq[this.current][0]);
  }
  getNext() {
    if (this.current === -1) {
      this.current = 1;
    } else if (this.current < this.seq.length - 1) {
      this.current += 1;
    }
    return this.getCurrent();
  }
  isCurrentLast() {
    return this.current >= this.seq.length - 1;
  }
}
