import {
  ComparisonContainer,
  BackgroundFrame
  // FeatureCell,
  // FeatureTable,
  // FeatureHeader,
  // TextInputForm
} from "../comp-styled/featureDisplayComps";
import { useReducer, useEffect } from "react";

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

const prePairs = [
  [
    { exp: 20, dependents: 0, cause: "drug" },
    { exp: 12, dependents: 0, cause: "hereditary" }
  ],
  [
    { exp: 16, dependents: 0, cause: "alcohol" },
    { exp: 11, dependents: 0, cause: "hereditary" }
  ],
  [
    { income: "110,000", gender: "female", smoking: "never smoker" },
    { income: "40,000", gender: "male", smoking: "smoker" }
  ],
  [
    { income: "30,000", gender: "female", smoking: "heavy smoker" },
    { income: "90,000", gender: "male", smoking: "heavy smoker" }
  ],
  [
    { age: 24, criminal: "violent crime", health: "excellent" },
    { age: 62, criminal: "none", health: "fair" }
  ],
  [
    { age: 31, criminal: "non-violent crime", health: "good" },
    { age: 40, criminal: "violent crime", health: "fair" }
  ],
  [
    { race: "black", occupation: "high school teacher", activity: "active" },
    {
      race: "asian",
      occupation: "office adminstrator",
      activity: "very active"
    }
  ],
  [
    {
      race: "native amercian",
      occupation: "corporate lawyer",
      activity: "moderate"
    },
    { race: "white", occupation: "dentist", activity: "sedentary" }
  ],
  [
    {
      education: "bachelor's degree",
      citizenship: "green card",
      religion: "christian-non catholic"
    },
    {
      education: "master's degree",
      citizenship: "non-citizen",
      religion: "jewish"
    }
  ],
  [
    {
      education: "high school graduate",
      citizenship: "non-citizen",
      religion: "christian-catholic"
    },
    {
      education: "high school graduate",
      citizenship: "us citizen",
      religion: "muslim"
    }
  ]
];

const postPairs = [
  [
    { exp: 25, dependents: 0, cause: "drug" },
    { exp: 18, dependents: 0, cause: "hereditary" }
  ],
  [
    { exp: 16, dependents: 0, cause: "alcohol" },
    { exp: 11, dependents: 0, cause: "hereditary" }
  ],
  [
    { exp: 9, dependents: 1, cause: "drug" },
    { exp: 4, dependents: 1, cause: "obesity" }
  ],
  [
    { exp: 12, dependents: 1, cause: "drug" },
    { exp: 10, dependents: 1, cause: "hereditary" }
  ],
  [
    { exp: 5, dependents: 0, cause: "obesity" },
    { exp: 2, dependents: 0, cause: "hereditary" }
  ]
  //   [
  //     { exp: 16, dependents: 0, cause: "alcohol" },
  //     { exp: 11, dependents: 0, cause: "hereditary" }
  //   ],
  //   [
  //     { exp: 20, dependents: 0, cause: "drugs" },
  //     { exp: 12, dependents: 0, cause: "hereditary" }
  //   ],
  //   [
  //     { exp: 16, dependents: 0, cause: "alcohol" },
  //     { exp: 11, dependents: 0, cause: "hereditary" }
  //   ],
  //   [
  //     { exp: 20, dependents: 0, cause: "drugs" },
  //     { exp: 12, dependents: 0, cause: "hereditary" }
  //   ],
  //   [
  //     { exp: 16, dependents: 0, cause: "alcohol" },
  //     { exp: 11, dependents: 0, cause: "hereditary" }
  //   ]
  //   , [
  //     { exp: 20, dependents: 0, cause: "drugs" },
  //     { exp: 12, dependents: 0, cause: "hereditary" }
  //   ],
  //   [
  //     { exp: 16, dependents: 0, cause: "alcohol" },
  //     { exp: 11, dependents: 0, cause: "hereditary" }
  //   ]
];
const sequence = ["pre", "distraction", "intervention", "post"];

const initialState = {
  display: {
    popUp: 0,
    intro: 0,
    predecision: 0,
    distraction: -1,
    intervention: -1,
    post: -1
  },
  pairSeq: {},
  pair: {}
};
const reducer = (state, action) => {
  switch (action.type) {
    case "nextSequence":

    default:
      return initialState;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ComparisonContainer>
      <BackgroundFrame col="1/-1" row="3/-1" />
    </ComparisonContainer>
  );
};
