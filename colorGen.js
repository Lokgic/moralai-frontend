import {
  scaleSequential,
  schemeCategory10,
  scaleOrdinal,
  interpolateViridis as defaultScheme
} from "d3";

export default (domain, comp) => {
  switch (comp) {
    default:
      return scaleOrdinal(schemeCategory10).domain([
        ...Array(domain[1]).keys()
      ]);
  }
};
