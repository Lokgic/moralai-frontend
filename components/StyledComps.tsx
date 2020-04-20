import styled from "styled-components";
import { ChoiceType } from "../commonTypes";
export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

// dialog stuff

export const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(222, 222, 222, 0.9);
  z-index: 5;
  -webkit-transition: all 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  transition: all 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  display: flex;
`;

export const Dialog = styled.div<{ big?: boolean }>`
  margin: auto auto auto auto;
  -webkit-transition: all 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  transition: all 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  background: ${({ theme }) => theme.colors.lightShade};
  border-radius: 0.125em;
  box-shadow: 0 25px 35px 0 rgba(0, 0, 0, 0.5);
  z-index: 6;
  min-width: ${({ big }) => (big ? "80vw" : "30rem")};
  max-width: 100vw;
  display: grid;
  grid-template-rows: min-content min-content min-content;
  @media (max-width: ${props => props.theme.breakpoints.w[1]}) {
    /* padding: 3rem 1rem 1rem 1rem; */
  }
`;

export const DialogTextWrapper = styled.div`
  margin: auto;
  max-width: 90rem;
  padding: 3rem 4rem 1.5rem 4rem;
`;

export const DialogHeader = styled.h2`
  margin-top: 3rem;
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  line-height: 3.3rem;
  color: white;
  font-family: ${({ theme }) => theme.fontStyles.serif};
`;

export const DialogParagraph = styled.p<{ centering?: boolean; big?: boolean }>`
  font-weight: 300;
  color: black;
  text-align: ${({ centering }) => (centering ? "center" : "left")};
  font-size: ${({ big }) => (big ? "2.4rem" : "1.4rem")};
  margin-bottom: 3rem;
  line-height: 2.5rem;
  @media (max-width: ${props => props.theme.breakpoints.w[1]}) {
    font-size: ${({ big }) => (big ? "1.6rem" : "1.4rem")};
    margin-bottom: 1rem;
    line-height: 2.2rem;
  }
`;

export const DialogInputWrapper = styled.div<{ centering?: boolean }>`
  display: flex;
  justify-content: ${({ centering }) => (centering ? "center" : "flex-end")};
  margin: 2rem 0rem;
  /* button {
    margin-right: 1rem;
    border: none;
    background: none;
    font-size: 1.4rem;
    text-transform: uppercase;
    border-radius: 3px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.main};
    -webkit-transition: background 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
    transition: background 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
      background: rgba(200, 200, 200, 0.7);
    }
  } */
`;

export const DialogButton = styled.button<{ emph?: boolean }>`
  margin-right: 1rem;
  border: none;
  background: none;
  font-size: 1.4rem;
  text-transform: uppercase;
  border-radius: 3px;
  font-weight: 500;
  color: ${({ emph, theme }) =>
    emph ? theme.colors.lightAccent : "rgba(0, 0, 0, 0.9)"};
  -webkit-transition: background 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  transition: background 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background: rgba(200, 200, 200, 0.7);
  }
`;

export const MCResponsive = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  /* padding: 0 1rem 1rem 1rem; */

  @media (max-width: ${props => props.theme.breakpoints.w[1]}) {
    flex-direction: column;
  }
`;

export const MCItem = styled.div<{ active?: boolean }>`
  display: flex;
  margin: 1rem 1.5rem;
  flex-direction: column;
  cursor: pointer;
  :hover {
    button {
      background: black;
    }
  }
  p {
    margin: 1rem auto;
    text-align: center;
    font-size: 1.6rem;
    line-height: 1.7rem;
    max-width: 6rem;
    text-transform: capitalize;
    color: black;
  }
  button {
    margin: 1rem auto;
    width: 3rem;
    height: 3rem;
    border: ${({ theme }) => `0.2rem ${theme.colors.black} solid`};
    background: ${({ active, theme }) =>
      active ? theme.colors.black : "none"};
    cursor: pointer;
  }

  @media (max-width: ${props => props.theme.breakpoints.w[1]}) {
    flex-direction: row;
    margin: 0.5rem auto auto 0.5rem;
    p {
      text-align: left;
      margin: auto auto auto 1rem;
      font-size: 1.4rem;
      line-height: 1.6rem;
      max-width: none;
    }
    button {
      width: 1.5rem;
      height: 1.5rem;
      margin: 0.5rem auto;
    }
  }
`;

// Decision Stuff

export const PairwiseContainer = styled.div`
  margin: auto;
  background: ${({ theme }) => theme.colors.main};
  max-width: none;
  width: 100vw;
  max-width: 990px;
  max-height: 800px;
  min-height: 450px;
  height: 90vh;
  padding: 0;
  display: grid;
  grid-template-rows: 2rem min-content min-content 1fr 1rem;
  grid-template-columns: 2fr 0.2fr 0.2fr 2fr;
  /* grid-column-gap: 0.8rem; */
  height: 100%;
  justify-self: center;
  grid-template-areas:
    "prog prog prog prog"
    "choosea optional optional chooseb"
    "abouta abouta aboutb aboutb"
    "ftable ftable ftable ftable";

  .about-a {
    grid-area: abouta;
  }
  .about-b {
    grid-area: aboutb;
  }

  .patient-button {
    cursor: pointer;
    :hover {
      background: #ccc;
    }
  }

  @media (min-width: ${props => props.theme.breakpoints.w[0]}) {
    .about {
      h4 {
        font-size: 2.4rem;
        padding: 3rem 0;
      }
    }
  }
`;

export const ChoiceTitleSty = styled.div<ChoiceType>`
  text-align: center;
  display: flex;
  background: ${({ theme }) => theme.colors.grey};
  color: black;
  grid-area: ${({ side }) => (side === "a" ? "abouta" : "aboutb")};
  h4 {
    font-weight: 700;
    font-size: 1.5rem;
    margin: auto;
    padding: 1.5rem 0;
    text-transform: uppercase;
  }
`;

export const ActionButtonSty = styled.button`
  cursor: pointer;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${props => props.theme.colors.lightShade};
  background: ${({ theme }) => theme.colors.darkAccent};
  box-shadow: inset 0 0.3rem 0 rgb(183, 53, 100), 0 3px 5px hsla(0, 0%, 0%, 0.2);
  -webkit-transition: background 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  transition: background 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  border-radius: 5px;
  border: 0;
  line-height: 2;

  margin: auto;
  width: 100%;

  :hover {
    box-shadow: none;
  }
  @media (min-width: ${props => props.theme.breakpoints.w[0]}) {
    font-size: 2.5rem;
  }
`;

export const DecisionButtonSty = styled(ActionButtonSty)<ChoiceType>`
  grid-area: ${props => (props.side === "a" ? "choosea" : "chooseb")};
`;

export const FeatureTableSty = styled.div`
  grid-area: ftable;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  background: ${({ theme }) => theme.colors.lightShade};
  @media (min-width: ${props => props.theme.breakpoints.w[0]}) {
    .f-cell {
      h2 {
        font-size: 2.8rem;
        font-weight: 300;
        margin-left: 5rem;
      }
      h3 {
        font-size: 1.8rem;
        line-height: 1.8rem;
        margin-left: 5rem;
      }
    }
  }
`;

export const FeatureCellSty = styled.div<ChoiceType>`
  border-right: ${props => (props.side === "a" ? "1px grey solid" : "none")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  h2 {
    font-size: 2rem;
    line-height: 2rem;
    font-weight: 300;
    margin: 1rem auto auto 2rem;
    text-transform: capitalize;
  }
  h3 {
    text-transform: capitalize;
    font-size: 1.3rem;
    line-height: 1.3rem;
    margin: auto auto 1rem 2rem;
  }
`;

export const PatientEmphasis = styled.div<ChoiceType>`
  grid-row: 1/-1;
  grid-column: ${({ side }) => (side === "a" ? "1/3" : "3/5")};
  border: tomato 1rem solid;
  z-index: 0;
  background: none;
  pointer-events: none;
`;
