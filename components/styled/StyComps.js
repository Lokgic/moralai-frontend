import styled from "styled-components";

export const FlexContainer = styled.div`
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  /* margin: 1vh 20px; */
  border: ${props => `15px solid ${props.theme.primary}`};
  flex-grow: 1;
  background-color: ${props => props.theme.offWhite};
  /* box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12); */
  display: flex;
  flex-direction: column;
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    /* min-height:700px; */
    margin: 0px 0px;
    border: ${props => `10px solid ${props.theme.primary}`};
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    /* min-height:700px; */
    /* height:100vh; */
    border: 0;
    margin: 0px 0px;
  }
`;

export const ScrollContainer = styled.div`
  height: 100%;
  overflow: scroll;
`;

export const VizCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: ${props => `10px solid ${props.theme.offWhite}`};
  min-height: 50px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  padding: 15px 25px;
  h2 {
    font-family: ${props => props.theme.sans};
    text-transform: uppercase;
    font-size: 2.4rem;
    text-align: center;
    @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
      font-size: 2.1rem;
    }
  }
  p {
    font-family: ${props => props.theme.sans};
    font-size: 2rem;
    line-height: 2.1rem;
    font-weight: 300;
    text-transform: none;
    color: ${props => props.theme.primaryDark};
    text-align: center;
    @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
      font-size: 1.6rem;
      margin: auto;
      padding-left: 10px;
    }
    @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
      padding-left: 5px;
    }
  }
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    padding: 0;
    border: ${props => `2px solid ${props.theme.offWhite}`};
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  display: grid;
  /* grid-auto-flow: column; */
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: auto 9fr 1fr;
  grid-column-gap: 2%;
  .icon {
    display: flex;
    overflow: hidden;
    font-size: 1em;
    padding-top: 5px;
    color: red;
    svg {
      margin: auto;
    }
  }
`;

export const WeightVizCard = styled(VizCard)`
  display: flex;
  flex-direction: column;

  overflow: hidden;
`;

export const WeightGrid = styled.div`
  /* flex-grow: ${props => (props.expand === 1 ? 2 : 0)}; */
  /* position: ${props =>
    props.weightDetails === "none" ? "static" : "absolute"};
  left:2000px; */
  /* transform: ${props =>
    props.weightDetails === "none" ? "" : "translate(2000px,0)"}; */
  transition:all 0.5s;
  display: ${props => (props.weightDetails === "none" ? "grid" : "none")};
  width: 100%;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-rows: 25px 50px 15px;
  grid-template-areas:
    "icon desc next"
    "icon bar next"
    "icon divider next";

  max-width: 1000px;
  margin: 15px auto;
  /* overflow:hidden; */
  cursor:pointer;
  
`;

export const WeightDetail = styled.div`
  display: ${props => (props.weightDetails !== "none" ? "grid" : "none")};
  height: 100%;
  max-width: 1000px;
  margin: auto;
  grid-template-columns: 9fr 1fr;
  grid-template-rows: 2fr 8fr;
  grid-template-areas:
    "title back"
    "plot plot";
`;

export const WeightDetailDesc = styled.p`
  cursor: pointer;
  grid-area: title;
  /* font-size:2rem;
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size:1.6rem;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    font-size:1.2rem;
  } */
  /* &:hover {
    text-decoration: underline;
  }
  ${WeightDetailBackIcon}:hover & {
    text-decoration: underline;
  } */
`;

export const WeightDetailBackIcon = styled.div`
  cursor: pointer;
  grid-area: back;
  &:hover {
    color: black;
  }
  display: flex;
  overflow: hidden;
  font-size: 2.5em;
  color: rgb(118, 118, 118);
  ${WeightDetailDesc}:hover & {
    color: black;
  }
  svg {
    margin: auto 0 auto auto;
  }
`;

export const WeightNext = styled.div`
  grid-area: next;
  display: flex;
  font-size: 1.5em;
  color: rgb(218, 218, 218);
  svg {
    margin: 1px auto auto auto;
  }
  ${WeightGrid}:hover & {
    color: black;
  }
`;
export const WeightDivider = styled.div`
  grid-area: divider;
`;
export const WeightIcon = styled.div`
  grid-area: icon;
  display: flex;
  overflow: hidden;
  font-size: 2em;
  color: rgb(118, 118, 118);
  ${WeightGrid}:hover & {
    color: black;
  }
  svg {
    margin: auto;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 1.7em;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    font-size: 1.2em;
  }
`;

export const WeightDescription = styled.div`
  grid-area: desc;
  text-transform: capitalize;
  color: rgb(33, 33, 33);
  ${WeightGrid}:hover & {
    color: black;
  }
`;

export const WeightBar = styled.div`
  grid-area: bar;
`;

export const FilteredVizGrid = styled.div`
  grid-template-columns: 1fr 11fr;
  grid-auto-rows: 20px;
  display: grid;
  max-width: 1000px;
  margin: auto;
`;

export const ChartControl = styled.div`
  grid-column: 1/-1;
  line-height: 1.2em;
`;

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1000px;
  margin: auto;
  label {
    margin: auto;
    font-size: 15px;
  }
  select {
    margin: auto;
    width: 80%;
  }
`;

export const FIcon = styled.div`
  grid-row: span 4;
  font-size: 25px;
  display: flex;
  color: rgb(118, 118, 118);
  svg {
    margin: auto;
    height: 30px;
    fill: rgb(118, 118, 118);
  }
`;

export const IText = styled.div`
  grid-row: span 2;
  display: flex;
  p {
    margin: auto auto auto 5px;
  }
`;

export const DoMoreCard = styled(VizCard)`
  display: flex;
  cursor: pointer;
  p {
    margin: auto;
    text-align: center;
  }
  svg {
    margin: auto 0 auto auto;
  }

  &:hover {
    background: ${props => props.theme.secondary};
  }
`;

export const IntroBox = styled(VizCard)`
  margin: auto;
  max-width: 600px;
  cursor: pointer;
  transition: all 0.5s;
  padding: 100px 50px;
  &:hover {
    background: ${props => props.theme.secondary};
  }
`;
