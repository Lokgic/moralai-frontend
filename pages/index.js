import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FFn from "../components/FeatureHelpers";
import CF from "../components/CoinFlip";
export const InterfaceContainer = styled.div`
  background: ${props => props.theme.primary};
  max-width: 150rem;
  padding: 0;
  display: grid;
  grid-template-rows: 0.5rem 10rem 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1vw;
  grid-row-gap: 7rem;
  justify-self: center;
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    grid-template-rows: 0rem 10rem 1fr 0rem;
    grid-column-gap: 0.8rem;
    grid-row-gap: 4rem;
    max-width: none;
    width: 100vw;
  }
`;

export const PatientContainer = styled.div`
  min-width: 20rem;
  grid-row: 3/4;
  grid-column: ${props => `${props.side * 2 + 1} / span 2`};
  display: grid;

  grid-template-columns: 1fr 5fr;
  grid-template-rows: repeat(2, min-content) min-content repeat(
      3,
      min-content min-content
    );
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    grid-template-columns: 1fr;
  }
`;

export const CoinFlipContainer = styled.div`
  grid-row: 2/3;
  grid-column: 2/4;
  display: grid;
  grid-template-rows: repeat(2, min-content);
  background: ${({ theme }) => theme.darkGrey};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  svg {
    height: 5.5rem;
    margin: 1rem auto;
    fill: ${({ theme }) => theme.grey};
  }

  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    grid-column: 1/-1;
    svg {
      height: 3rem;
      margin: 1rem auto auto auto;
    }
  }
`;

const DecideButton = styled.div`
  cursor: pointer;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 500;
  color: ${props => props.theme.offWhite};
  background: ${({ theme }) => theme.contrast};
  line-height: 1;
  padding: 1rem;
  margin: 2rem 0;
  box-shadow: inset 0 2px 0 rgb(183, 53, 100), 0 1px 3px hsla(0, 0%, 0%, 0.2);
  -webkit-transition: background 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  transition: background 600ms cubic-bezier(0.2, 0.965, 0, 1.005);
  border-radius: 5px;
  :hover {
    box-shadow: none;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 2rem;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    font-size: 1.5rem;
  }
`;

const CoinFlipMsg = styled(DecideButton)``;
const UserIconContainer = styled.div`
  grid-row: 1/3;
  grid-column: 1 / -1;
  font-size: 7rem;
  line-height: 0;
  display: grid;
  color: ${props => props.theme.grey};
  padding-bottom: 1rem;
  justify-items: center;
  .user-icon {
    /* margin: auto; */
  }
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 5rem;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    font-size: 3.5rem;
    padding-bottom: 0rem;
  }
`;

const FeatureIconContainer = styled.div`
  grid-row: ${({ index }) => `${4 + index * 2} / span 1`};
  grid-column: 1 / span 1;
  justify-items: left;
  align-items: end;
  font-size: 4rem;
  line-height: 0;
  display: grid;
  color: ${props => props.theme.offWhite};
  padding: 0 1rem 0 2rem;

  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 3rem;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    display: none;
  }
`;

const PatientNameContainer = styled(DecideButton)`
  grid-row: 3/4;
  grid-column: 1 / -1;
`;

const BackgroundColor = styled.div`
  grid-row: 2/-1;
  grid-column: 1 / -1;
  background: ${({ theme }) => theme.darkGrey};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.19);
`;

const PredicateContainer = styled.div`
  grid-row: ${({ index }) => `${5 + index * 2} / span 1`};
  grid-column: 2 / span 1;
  font-size: 2.5rem;
  font-weight: 300;
  display: grid;
  text-align: left;
  /* align-items: start; */
  justify-items: left;
  p {
    line-height: 4rem;
    color: ${props => props.theme.offWhite};
    padding: 0 1rem;
    margin: 1rem 1rem 2rem 0;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 2rem;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    font-size: 1.5rem;
    grid-column: 1 / span 1;
    p {
      line-height: 2.5rem;
      padding-left: 0.5rem;
      margin: 0.5rem 0.5rem 1rem 0;
    }
  }
`;

const ValueContainer = styled.div`
  grid-row: ${({ index }) => `${4 + index * 2} / span 1`};
  grid-column: 2 / span 1;
  font-size: 5.5rem;
  font-weight: 700;
  text-transform: uppercase;
  display: grid;
  color: ${({ theme }) => theme.secondary};
  justify-items: left;
  align-items: end;
  line-height: 4rem;
  font-weight: 300;
  p {
    padding: 0 1rem;
    margin: 3rem 0 0 0;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 4.5rem;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    font-size: 3.5rem;
    p {
      padding: 0 0.5rem;
      margin: 1rem 0 0 0;
    }
    grid-column: 1 / span 1;
  }
`;

const DarkOverlay = styled.div`
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

const Dialog = styled.div`
  margin: 15% auto auto auto;
  width: 45rem;
  /* min-height: 10rem; */
  border-radius: 0.125em;
  box-shadow: 0 25px 35px 0 rgba(0, 0, 0, 0.5);
  z-index: 6;
  background: ${({ theme }) => theme.offWhite};
  display: grid;
  grid-template-rows: min-content min-content min-content;
  /* padding: 1rem; */
  .message {
    padding: 2rem;
    color: rgba(0, 0, 0, 0.5);
    .choice-message {
      color: rgba(0, 0, 0, 1);
      margin-top: 3rem;
      font-size: 3rem;
      font-weight: 300;
      text-align: center;
    }
  }
  .dialog-header {
    padding-left: 2rem;
    background: ${({ theme }) => theme.primaryDark};
    color: ${({ theme }) => theme.offWhite};
    h2 {
      font-weight: 300;
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
      &:hover {
        background: rgba(200, 200, 200, 0.7);
      }
    }
    .confirm-button {
      color: ${({ theme }) => theme.blue};
    }
  }
`;

const Mock = [[25, 3, 3], [75, 0, 0]];

const Patient = ({ side, handleClick }) => (
  <PatientContainer side={side}>
    <BackgroundColor />

    <UserIconContainer>
      <FontAwesomeIcon icon="user" className="user-icon" />
    </UserIconContainer>
    <PatientNameContainer onClick={() => handleClick(side)}>
      {side === 0 ? `Choose A` : `Choose B`}
    </PatientNameContainer>
    {["age", "drinkingHabitPrediagnosis", "dependents"].map((d, i) => [
      <FeatureIconContainer index={i} key={`key_for_fconc_${d}_${i}_${side}`}>
        <FontAwesomeIcon
          key={`key_for_fcon_${d}_${i}_${side}`}
          icon={FFn.graphicSelector(d)}
        />
      </FeatureIconContainer>,
      <PredicateContainer index={i} key={`key_for_pcon_${d}_${i}_${side}`}>
        <p>{FFn.predicateTranslater(d)}</p>
      </PredicateContainer>,
      <ValueContainer index={i} key={`key_for_vcon_${d}_${i}_${side}`}>
        <p>{FFn.valueTranslater(d, Mock[side][i])}</p>
      </ValueContainer>
    ])}
  </PatientContainer>
);

export default props => {
  const [chosen, setChosen] = useState(-1);
  const [popUp, setPopUp] = useState(0);
  const handleClick = selected => {
    setChosen(selected);
    setPopUp(1);
  };

  return (
    <InterfaceContainer>
      <CoinFlipContainer>
        <CF />
        <CoinFlipMsg onClick={() => handleClick(2)}>Flip a coin</CoinFlipMsg>
      </CoinFlipContainer>
      {[0, 1].map(d => (
        <Patient
          // onClick={() => setChosen(d)}
          handleClick={handleClick}
          chosen={chosen}
          side={d}
          key={`key-patient-${d}`}
        />
      ))}
      {popUp ? (
        <DarkOverlay onClick={() => setPopUp(0)}>
          <Dialog>
            <div className="dialog-header">
              <h2>Are you sure?</h2>
            </div>
            <div className="message">
              <p>You have decided to...</p>
              <p className="choice-message">
                {
                  ["give A the kidney", "give B the kidney", "flip a coin"][
                    chosen
                  ]
                }
              </p>
            </div>
            <div className="buttons">
              <button className="confirm-button">Yes, proceed</button>
              <button>On a second thought... </button>
            </div>
          </Dialog>
        </DarkOverlay>
      ) : null}
      ;
    </InterfaceContainer>
  );
};
