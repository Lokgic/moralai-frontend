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
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    padding: 0;
    /* border: none; */
  }
`;

export const WeightVizCard = styled(VizCard)`
  display: flex;
  flex-direction: column;
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

export const WeightGrid = styled.div`
  /* flex-grow: ${props =>
    props.expand < 0 ? 1 : props.expand === 1 ? 10 : 0}; */
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-rows: 25px 50px 15px;
  grid-template-areas:
    "icon desc next"
    "icon bar next"
    "icon divider divider";

  max-width: 1000px;
  margin: 15px auto;
`;

export const WeightDivider = styled.div`
  grid-area: divider;
`;
export const WeightIcon = styled.div`
  grid-area: icon;
  display: flex;
  overflow: hidden;
  font-size: 2em;
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
`;

export const WeightBar = styled.div`
  grid-area: bar;
`;

export const FilteredVizGrid = styled.div`
  grid-template-columns: 2fr 8fr;
  grid-auto-rows: 10px;
  display: grid;
`;

export const ChartControl = styled.div`
  grid-column: 1/-1;
  line-height: 1.2em;
`;

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  label {
    margin: auto;
    padding-right: 5px;
  }
  select {
    margin: auto;
    // background: grey;
  }
`;

export const FIcon = styled.div`
  grid-row: span 3;
`;
