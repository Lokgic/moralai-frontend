import { Component } from "react";

export default props => {
  const { queries, responses } = props.data;
  console.log(responses);
  const processed = responses.reduce(
    (ass, rec, i) => {
      console.log(ass);
      const { flip, decided } = ass;
      if (rec < 2) {
        const notRec = 1 - rec;
        const diff = Object.keys(queries[i][rec]).map(key => [
          key,
          queries[i][rec][key] - queries[i][notRec][key]
        ]);
        return {
          flip,
          decided: [...decided, diff]
        };
      } else {
        return {
          flip,
          decided
        };
      }
    },
    { decided: [], flip: [] }
  );

  console.log(processed);

  return null;
};
