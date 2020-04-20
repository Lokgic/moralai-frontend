import SequenceHandler, {
  addEqualDistractionToSeq
} from "../../helpers/SequenceLogic";
import setupData from "./setup.json";
import { ValueTranslator } from "../../commonTypes";

const setup: {
  [index: string]: any;
} = setupData;
const targetEdDistractionFeature = [
  "income",
  "race",
  "education",
  "tattoos",
  "political",
  "religion",
  "citizenship"
];

const pairBase = [
  [
    { exp: 9, cause: 1 },
    { exp: 4, cause: 0 }
  ],
  [
    { exp: 16, cause: 1 },
    { exp: 11, cause: 0 }
  ],
  [
    { exp: 19, cause: 2 },
    { exp: 14, cause: 0 }
  ],
  [
    { exp: 27, cause: 2 },
    { exp: 22, cause: 0 }
  ],
  [
    { exp: 14, cause: 2 },
    { exp: 4, cause: 0 }
  ],
  [
    { exp: 18, cause: 1 },
    { exp: 8, cause: 0 }
  ],
  [
    { exp: 26, cause: 2 },
    { exp: 16, cause: 0 }
  ],
  [
    { exp: 31, cause: 2 },
    { exp: 21, cause: 0 }
  ],
  [
    { exp: 40, cause: 1 },
    { exp: 30, cause: 0 }
  ],
  [
    { exp: 20, cause: 1 },
    { exp: 5, cause: 0 }
  ],
  [
    { exp: 27, cause: 1 },
    { exp: 12, cause: 0 }
  ],
  [
    { exp: 31, cause: 1 },
    { exp: 16, cause: 0 }
  ],
  [
    { exp: 37, cause: 2 },
    { exp: 22, cause: 0 }
  ],
  [
    { exp: 42, cause: 2 },
    { exp: 27, cause: 0 }
  ],
  [
    { exp: 26, cause: 2 },
    { exp: 6, cause: 0 }
  ],
  [
    { exp: 33, cause: 1 },
    { exp: 13, cause: 0 }
  ],
  [
    { exp: 41, cause: 2 },
    { exp: 21, cause: 0 }
  ],
  [
    { exp: 36, cause: 2 },
    { exp: 11, cause: 0 }
  ],
  [
    { exp: 39, cause: 1 },
    { exp: 14, cause: 0 }
  ],
  [
    { exp: 28, cause: 1 },
    { exp: 21, cause: 0 }
  ]
];

const seq = addEqualDistractionToSeq(
  pairBase,
  2,
  targetEdDistractionFeature,
  setup.featureMap
);

const valueTranslator: ValueTranslator = (
  fkey: string,
  value: number
): string => {
  const featureMap = {
    ...setup.featureMap,
    cause: ["hereditary", "alcohol use", "drug use"]
  };
  switch (fkey) {
    case "exp":
      return `${value} years`;
    case "dependents":
      return value === 0 ? "none" : "" + value;
    case "income":
      return `$${featureMap[fkey][value]} per year`;
    default:
      return featureMap[fkey][value];
  }
};

export default new SequenceHandler({
  seq,
  randomized: true,
  featureDict: setup.featureDict,
  valueTranslator
});
