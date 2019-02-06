import { Component } from "react";
import { ComparisonCard } from "./styled/VizSty";
import { FlexContainer } from "./styled/StyComps";
import { FaBirthdayCake } from "react-icons/fa";
import PairGen, { graphicSelector } from "./PairGenerator";
import styled from "styled-components";
const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 8px;
  grid-template-columns: repeat(
    ${props => (props.columns ? props.columns : 20)},
    1fr
  );
  svg {
    margin: auto;
  }
`;

const Cake = styled(FaBirthdayCake)`
  width: 100%;
  height: 100%;
`;

const GridSpan = styled.div`
  grid-column: ${props => (props.span ? `span ${props.span} ` : -1)};
`;

const IconCell = styled.div`
  display: flex;
  svg {
    margin: auto;
  }
`;

const theme = {
  breakpoint: {
    w: ["1000px", "600px"],
    h: ["700px"]
  }
};

const TextHalfRow = styled.div`
  grid-column: span 10;
  background: palegreen;
  text-align: ${props => (props.right ? "right" : "left")};
`;
export default props => {
  return (
    <FlexContainer theme={theme}>
      <Grid>
        <GridSpan span="8" />
        <IconCell>
          <Cake color="blue" />
        </IconCell>
        <IconCell>
          <Cake color="blue" />
        </IconCell>
        <IconCell>
          <Cake />
        </IconCell>
        <IconCell>
          <Cake />
        </IconCell>
        <IconCell>
          <Cake />
        </IconCell>
        <GridSpan span="7" />
        <TextHalfRow right>sdsd</TextHalfRow>
        <TextHalfRow>sdsdss</TextHalfRow>
        <GridSpan span="8" />
        <IconCell>
          <Cake color="blue" />
        </IconCell>
        <IconCell>
          <Cake color="blue" />
        </IconCell>
        <IconCell>
          <Cake />
        </IconCell>
        <IconCell>
          <Cake />
        </IconCell>
        <IconCell>
          <Cake />
        </IconCell>
        <GridSpan span="7" />
        <TextHalfRow right>sdsd</TextHalfRow>
        <TextHalfRow>sdsdss</TextHalfRow>
      </Grid>
    </FlexContainer>
  );
};
