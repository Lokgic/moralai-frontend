import styled from "styled-components";

export const SummaryTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(12, 1fr);
  grid-area: table;
`;

export const SplitScreenContainer = styled.div`
  background: ${({ theme }) => theme.primary};
  width: 100vw;
  padding: 0;
  display: grid;
  grid-template-rows:
    min-content 2rem 8rem repeat(3, minmax(min-content, 1fr))
    1rem;
  grid-template-columns: 2fr 1fr 1fr 2fr 6fr;
  grid-column-gap: 0.8rem;
  height: 100%;
  justify-self: center;
  grid-template-areas:
    "choosea choosea chooseb chooseb table"
    "prog prog prog prog table"
    "abouta abouta aboutb aboutb table"
    "a0 a0 b0 b0 table"
    "a1 a1 b1 b1 table"
    "a2 a2 b2 b2 table";

  .progress {
    grid-area: prog;
    background: ${({ theme }) => theme.offWhite};
    margin: 0.5rem 0;
    border-radius: 5rem;
    .p-bar {
      height: 100%;
      border-radius: 5rem;
      background: ${({ theme }) => theme.tertiaryDark};
    }
  }
  .about-a {
    grid-area: abouta;
  }
  .about-b {
    grid-area: aboutb;
  }
  .about {
    text-align: center;
    display: flex;
    margin-top: 2rem;
    background: #212121; /* fallback for old browsers */

    h4 {
      color: ${({ theme }) => theme.milky};
      font-weight: 300;
      font-size: 1.8rem;
      margin: auto;
    }
  }

  @media (min-width: ${props => props.theme.breakpoint.w[0]}) {
    /* grid-template-rows: 0rem 10rem 1fr 0rem;
    grid-column-gap: 0.8rem;
    grid-row-gap: 4rem; */
    grid-column-gap: 2rem;
    .about {
      h4 {
        font-size: 3rem;
        line-height: 4rem;
      }
    }
  }
`;

export const InterfaceContainer = styled.div`
  background: ${({ theme }) => theme.primary};
  max-width: none;
  width: 100vw;
  max-width: 990px;
  max-height: 990px;
  padding: 0;
  display: grid;
  grid-template-rows:
    min-content 2rem 8rem repeat(3, minmax(min-content, 1fr))
    1rem;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  grid-column-gap: 0.8rem;
  height: 100%;
  justify-self: center;
  grid-template-areas:
    "choosea flip flip chooseb"
    "prog prog prog prog"
    "abouta abouta aboutb aboutb"
    "a0 a0 b0 b0"
    "a1 a1 b1 b1"
    "a2 a2 b2 b2";

  .progress {
    grid-area: prog;
    background: ${({ theme }) => theme.offWhite};
    margin: 0.5rem 0;
    border-radius: 5rem;
    .p-bar {
      height: 100%;
      border-radius: 5rem;
      background: ${({ theme }) => theme.tertiaryDark};
    }
  }
  .about-a {
    grid-area: abouta;
  }
  .about-b {
    grid-area: aboutb;
  }
  .about {
    text-align: center;
    display: flex;
    margin-top: 2rem;
    background: #212121; /* fallback for old browsers */

    h4 {
      color: ${({ theme }) => theme.milky};
      font-weight: 300;
      font-size: 1.8rem;
      margin: auto;
    }
  }

  @media (min-width: ${props => props.theme.breakpoint.w[0]}) {
    /* grid-template-rows: 0rem 10rem 1fr 0rem;
    grid-column-gap: 0.8rem;
    grid-row-gap: 4rem; */
    grid-column-gap: 2rem;
    .about {
      h4 {
        font-size: 3rem;
        line-height: 4rem;
      }
    }
  }
`;

export const ChoiceContainer = styled.div`
  display: grid;
  grid-template-rows: min-content min-content;

  grid-template-areas:
    "icon"
    "button";
  div {
    display: flex;
  }
`;

export const CFSVGContainer = styled.div`
  grid-area: icon;
`;
export const CoinFlipContainer = styled(ChoiceContainer)`
  grid-row: 1 / span 1;
  grid-column: 2/4;

  svg {
    height: 4.5rem;
    margin: auto;
    fill: ${({ theme }) => theme.offWhite};

    z-index: 0;

    @media (min-width: ${props => props.theme.breakpoint.w[0]}) {
      height: 8rem;
    }
  }
`;

export const UserIconContainer = styled(ChoiceContainer)`
  grid-row: 1 / span 2;
  grid-column: ${props => `${props.side * 3 + 1} / span 1`};
  grid-area: ${props => (props.area ? props.area : null)};
  font-size: 4.5rem;
  color: ${props => props.theme.offWhite};

  .user-icon {
    margin: auto auto;
    grid-area: icon;
  }
  @media (min-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 8rem;
  }
`;

export const FeatureBackgroundColor = styled.div`
  /* background: #212121;  */
  border-bottom: 3px solid #212121;
  z-index: -0.5;
  grid-row: ${props => props.row};
  grid-column: ${props => props.col};
`;

export const FeatureViz = styled.div`
  grid-row: 1/-1;
  grid-column: 1/-1;
  background: ${props => props.theme.darkGrey};
  .left {
    background: ${props => props.theme.primaryDark};
    height: 100%;
  }
`;

export const BackgroundFrame = styled.div`
  border-radius: 2px;
  z-index: -0.5;
  grid-row: ${props => props.row};
  grid-column: ${props => props.col};
  background: #7b7b7b;
  background: linear-gradient(#7b7b7b 0%, #717171 85%);
  box-shadow: 0 1px 3px rgba(50, 50, 50, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  /* margin-top: 1rem; */
`;

export const DecideButton = styled.button`
  cursor: pointer;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${props => props.theme.offWhite};
  background: ${({ theme }) => theme.contrast};
  box-shadow: inset 0 0.3rem 0 rgb(183, 53, 100), 0 3px 5px hsla(0, 0%, 0%, 0.2);
  -webkit-transition: background 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  transition: background 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  border-radius: 5px;
  border: 0;
  line-height: 2;

  grid-area: button;
  /* padding: 1rem; */
  /* margin: 2rem 0; */

  margin: auto;
  width: 100%;
  /* height:100%; */
  :hover {
    box-shadow: none;
  }
  @media (min-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 2.5rem;
  }
`;

export const CoinFlipButton = styled(DecideButton)``;

export const PatientNameButton = styled(DecideButton)``;

export const StackedButton = styled(DecideButton)`
  margin: 0.5rem 0rem 0.5rem auto;
  width: 90%;
  font-size: 1.5rem;
  line-height: 2em;
  @media (min-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 2.5rem;
    margin: 1rem 0.2rem 1rem auto;
  }
`;

export const FeatureContainer = styled.div`
  display: grid;
  grid-column: ${props => `${props.side * 2 + 1} / span 2`};
  grid-row: ${({ index }) => `${4 + index} / span 1`};
  padding: 1rem 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;

  grid-template-areas:
    "value"
    "desc";
  @media (min-width: ${props => props.theme.breakpoint.w[1]}) {
    grid-template-columns: 1.5fr 2fr;
    grid-template-rows: 1fr;
    padding: 2rem 2rem;
    grid-template-areas: "value desc";
  }
`;

export const FeatureIconContainer = styled.div`
  grid-area: icon;
  display: none;
  place-items: center;
  font-size: 2rem;
  color: ${props => props.theme.offWhite};

  @media (min-width: ${props => props.theme.breakpoint.w[1]}) {
    display: none;
    font-size: 4.5rem;
  }
  @media (min-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 5rem;
  }
`;

export const PredicateContainer = styled.div`
  /* grid-row: ${({ index }) => `${6 + index * 2} / span 1`};
  grid-column: 2 / span 1; */
  grid-area:desc;
  font-size: 1.6rem;
  font-weight: 300;
  display: grid;
  text-align: left;
  /* align-items: start; */
  justify-items: left;
  p {
      display:${({ dead }) => (dead ? "none" : "inline-block")};
    padding-top:0.2rem;
    padding-right:1rem;
    line-height: 2rem;
    color: ${props => props.theme.offWhite};
    /* padding: 0 1rem; */
    margin: auto ;
    /* text-align:center; */
  }
  @media (min-width: ${props => props.theme.breakpoint.w[1]}) {
    
    p{
      line-height: 3rem;
      font-size: 2.3rem;
      margin: auto auto auto .1rem ;
      /* padding-right:0rem; */
      /* text-align:center; */
    }
    
  }

`;

export const ValueContainer = styled.div`
  grid-area: value;
  font-size: 4rem;
  font-weight: 300;
  line-height: 1em;
  text-transform: uppercase;
  display: flex;
  color: ${({ theme, dead }) => theme.secondary};

  p {
    margin: auto;
  }

  @media (min-width: ${props => props.theme.breakpoint.w[1]}) {
    font-size: 6rem;
  }
`;

export const DarkOverlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(200, 200, 200, 0.7);
  z-index: 5;
  -webkit-transition: all 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  transition: all 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  display: flex;
`;

export const Dialog = styled.div`
  margin: auto auto auto auto;
  -webkit-transition: all 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  width: ${({ big }) => (big ? `80rem` : `45rem`)};
  /* min-height: 10rem; */

  border-radius: 0.125em;
  box-shadow: 0 25px 35px 0 rgba(0, 0, 0, 0.5);
  z-index: 6;
  background: ${({ theme }) => theme.offWhite};
  display: grid;
  grid-template-rows: min-content min-content min-content;
  /* padding: 1rem; */
  .analysis-progress {
    width: 55rem;
    height: 2rem;
    margin: auto auto 2rem auto;
    max-width: 100%;
    .anal-bar {
      background: ${({ theme }) => theme.contrast};
      border-radius: 0.5rem;
      height: 100%;
      /* transition: width 0.1s; */
    }
  }
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    width: ${({ big }) => (big ? `98vw` : `95vw`)};
    height: auto;
    min-width: 25rem;
    .analysis-progress {
      width: 70vw;
    }
  }
  .ass-spinner {
    display: flex;
    svg {
      margin: auto;
    }
  }
  .message {
    padding: 2rem;
    color: rgba(0, 0, 0, 0.8);
    p {
      line-height: 2rem;
    }
    .light {
      font-weight: 300;
      font-size: 1.2rem;
      color: grey;
    }
    .centering {
      text-align: center;
    }
    .choice-message {
      color: rgba(0, 0, 0, 1);
      margin-top: 3rem;
      font-size: 2.4rem;
      font-weight: 300;
      text-align: center;
      line-height: 2.7rem;
      .emph {
        font-weight: 700;
      }
    }
  }
  .dialog-header {
    padding-left: 2rem;
    background: ${({ theme }) => theme.primaryDark};
    color: ${({ theme }) => theme.offWhite};
    h2 {
      font-weight: 300;
      line-height: 3rem;
    }
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
    button {
      margin-right: 1rem;
      border: none;
      background: none;
      font-size: 1.4rem;
      text-transform: uppercase;
      border-radius: 3px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.9);
      -webkit-transition: background 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
      transition: background 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
      padding: 0.5rem;
      cursor: pointer;
      &:hover {
        background: rgba(200, 200, 200, 0.7);
      }
    }
    .confirm-button {
      color: ${({ theme }) => theme.blue};
    }
    .agree-button {
      color: ${({ theme }) => theme.blue};
      text-transform: none;
      margin: auto;
    }
    .disagree-button {
      color: ${({ theme }) => theme.contrast};
      text-transform: none;
      margin: auto;
    }
  }
`;

export const LikertScale = styled.div`
  display: flex;
  flex-direction: row;
  .likert-item {
    display: flex;
    margin: 1rem auto;
    flex-direction: column;

    p {
      margin: 1rem auto;
      text-align: center;
      font-size: 1.5rem;
      max-width: 6rem;
      text-transform: capitalize;
    }
  }
`;

export const LikertOption = styled.div`
  margin: 1rem auto;
  width: 3rem;
  height: 3rem;
  border: 0.5rem black solid;
  background: ${props => (props.active ? "black" : "none")};
  cursor: pointer;
  :hover {
    background: grey;
  }
`;

export const MCQuestion = styled.div`
  display: flex;
  flex-direction: column;
`;
export const MCItem = styled.div`
  display: flex;
  margin: 1rem auto 1rem 1rem;
  flex-direction: row;

  p {
    margin: auto auto auto 3rem;
    text-align: center;
    font-size: 1.6rem;
    cursor: pointer;
    line-height: 1.5rem;
    /* text-transform: capitalize; */
  }
  .click-box {
    margin: auto auto auto 3rem;
    width: 1.5rem;
    height: 1.5rem;
    border: 0.2rem black solid;
    background: ${props => (props.active ? "black" : "none")};
    cursor: pointer;
    :hover {
      background: grey;
    }
  }
`;

export const PatientEmphasis = styled.div`
  grid-row: 3/6;
  grid-column: ${({ side }) => (side === 0 ? "1/3" : "3/5")};
  border: tomato 1rem solid;
  z-index: 3;
`;
