import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FFn from "../components/FeatureHelpers";
import CF from "../components/CoinFlip";
export const InterfaceContainer = styled.div`
  background: ${({ theme }) => theme.primary};
  max-width: none;
  width: 100vw;
  max-width: 990px;
  max-height: 990px;
  padding: 0;
  display: grid;
  grid-template-rows:
    min-content 8rem repeat(3, minmax(min-content, 1fr))
    4rem;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  grid-column-gap: 0.8rem;
  height: 100%;
  justify-self: center;
  grid-template-areas:
    "choosea flip flip chooseb"
    "abouta abouta aboutb aboutb"
    "a0 a0 b0 b0"
    "a1 a1 b1 b1"
    "a2 a2 b2 b2"
    "bar bar bar bar";

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

const CFSVGContainer = styled.div`
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

const UserIconContainer = styled(ChoiceContainer)`
  grid-row: 1 / span 2;
  grid-column: ${props => `${props.side * 3 + 1} / span 1`};
  font-size: 4.5rem;
  color: ${props => props.theme.offWhite};

  .user-icon {
    margin: auto auto;
    grid-area:icon;
  }
  @media (min-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 8rem;
    }
  /* @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 5rem;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    font-size: 3.5rem;
    padding-bottom: 0rem;
  } */
`;

// const BackgroundColor = styled.div`
//   grid-row: 1/3;
//   grid-column: ${props => `${props.side * 3 + 1} / span 1`};
//   background: ${({ theme, bg }) => (bg ? theme[bg] : theme.milky)};
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.19);
//   z-index: -0.5;
// `;

// const CFBackgroundColor = styled(BackgroundColor)`
//   grid-row: 1/2;
//   grid-column: 2 / 4;
// `;

const BackgroundColor = styled.div`
  /* background: ${({ theme, bg }) => (bg ? theme[bg] : theme.grey)}; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.19); */
  background: #212121;  /* fallback for old browsers */

  z-index: -0.5;
  grid-row: ${props => props.row};
  grid-column: ${props => props.col};
`;

const BackgroundFrame = styled.div`
  border-radius: 2px;
  z-index: -0.5;
  grid-row: ${props => props.row};
  grid-column: ${props => props.col};
  background: #424242;
  /* border: 5px solid; */
  box-shadow: 0 1px 3px rgba(50, 50, 50, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-top: 1rem;
  /* box-shadow: inset 0 0 3px #000000;
  border-radius: 5px; */
`;

const DecideButton = styled.button`
  cursor: pointer;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${props => props.theme.offWhite};
  background: ${({ theme }) => theme.contrast};
  box-shadow: inset 0 0.5rem 0 rgb(183, 53, 100), 0 3px 5px hsla(0, 0%, 0%, 0.2);
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

const CoinFlipButton = styled(DecideButton)``;

const PatientNameButton = styled(DecideButton)``;

const FeatureContainer = styled.div`
  display: grid;
  grid-column: ${props => `${props.side * 2 + 1} / span 2`};
  grid-row: ${({ index }) => `${3 + index} / span 1`};
  padding: 1rem 2rem 1rem 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: minmax(min-content, 1fr) 1rem min-content 1rem;

  grid-template-areas:
    "value icon"
    ". icon"
    "desc desc"
    ". .";
`;

const FeatureIconContainer = styled.div`
  /* grid-row: ${({ index }) => `${5 + index * 2} / span 1`};
  grid-column: 1 / span 1;
  justify-items: left;
  align-items: end;
  font-size: 4rem;
  line-height: 0;
  display: grid;
  color: ${props => props.theme.offWhite};
  padding: 0 1rem 0 2rem; */
  grid-area:icon;
  display:grid;
  place-items:end center;
  font-size:4.5rem;
  color: ${props => props.theme.offWhite};

  @media (min-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 8rem;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    /* display: none; */
  }
`;

const PredicateContainer = styled.div`
  /* grid-row: ${({ index }) => `${6 + index * 2} / span 1`};
  grid-column: 2 / span 1; */
  grid-area:desc;
  font-size: 1.3rem;
  font-weight: 300;
  display: grid;
  text-align: left;
  /* align-items: start; */
  justify-items: left;
  p {
    padding-top:0.2rem;
    line-height: 2rem;
    color: ${props => props.theme.offWhite};
    /* padding: 0 1rem; */
    margin: auto auto auto 1rem;
  }
  @media (min-width: ${props => props.theme.breakpoint.w[0]}) {
    
    p{
      line-height: 3rem;
      font-size: 2rem;
      margin: auto auto auto 3rem;
    }
    
  }
  /* @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
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
  } */
`;

const ValueContainer = styled.div`
  /* grid-row: ${({ index }) => `${5 + index * 2} / span 1`};
  grid-column: 2 / span 1; */
  grid-area:value;
  font-size: 4rem;
  font-weight: 300;
  text-transform: uppercase;
  display: flex;
  color: ${({ theme }) => theme.secondary};
  /* line-height: 4rem; */

  p {
    margin: auto auto 1rem 1rem;
  }

  @media (min-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 7rem;
    p {
    margin: auto auto 2rem 3rem;
  }
  }
  /* @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 4.5rem;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    font-size: 3.5rem;
    p {
      padding: 0 0.5rem;
      margin: 1rem 0 0 0;
    }
    grid-column: 1 / span 1;
  } */
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

// const Patient = ({ side, handleClick }) => (
//   <PatientContainer side={side}>
//     <BackgroundColor col />
//     <UserIconContainer>
//       <FontAwesomeIcon icon="user" className="user-icon" />
//     </UserIconContainer>
//     <PatientNameContainer onClick={() => handleClick(side)}>
//       {side === 0 ? `Choose A` : `Choose B`}
//     </PatientNameContainer>
//     {["age", "drinkingHabitPrediagnosis", "dependents"].map((d, i) => [
//       <FeatureIconContainer index={i} key={`key_for_fconc_${d}_${i}_${side}`}>
//         <FontAwesomeIcon
//           key={`key_for_fcon_${d}_${i}_${side}`}
//           icon={FFn.graphicSelector(d)}
//         />
//       </FeatureIconContainer>,
//       <PredicateContainer index={i} key={`key_for_pcon_${d}_${i}_${side}`}>
//         <p>{FFn.predicateTranslater(d)}</p>
//       </PredicateContainer>,
//       <ValueContainer index={i} key={`key_for_vcon_${d}_${i}_${side}`}>
//         <p>{FFn.valueTranslater(d, Mock[side][i])}</p>
//       </ValueContainer>
//     ])}
//   </PatientContainer>
// );

export default props => {
  const [chosen, setChosen] = useState(-1);
  const [popUp, setPopUp] = useState(0);
  const handleClick = selected => {
    setChosen(selected);
    setPopUp(1);
  };

  return (
    <InterfaceContainer>
      <BackgroundFrame col="1/span 2" row="2/6" />
      <BackgroundFrame col="3/span 2" row="2/6" />
      <div className="about-a about">
        <h4>Patient A</h4>
      </div>
      <div className="about-b about">
        <h4>Patient B</h4>
      </div>

      <CoinFlipContainer>
        {/* <ButtonBackground /> */}
        <CFSVGContainer>
          <CF />
        </CFSVGContainer>
        <CoinFlipButton onClick={() => handleClick(2)}>
          Flip a coin
        </CoinFlipButton>
      </CoinFlipContainer>
      {[0, 1].map(d => [
        // <CardBackground row="1/3" col={d * 3 + 1 + "/ span 1"} />,
        <UserIconContainer side={d}>
          {/* <ButtonBackground /> */}
          <FontAwesomeIcon icon="user" className="user-icon" />

          <PatientNameButton onClick={() => handleClick(d)}>
            Choose {["A", "B"][d]}
          </PatientNameButton>
        </UserIconContainer>,
        ...["age", "drinkingHabitPrediagnosis", "dependents"].map((f, i) => (
          <FeatureContainer side={d} index={i}>
            <BackgroundColor row="2 / span 3" col="1/-1" />
            <FeatureIconContainer
              index={i}
              side={d}
              key={`key_for_fconc_${d}_${i}_${f}`}
            >
              <FontAwesomeIcon
                key={`key_for_fcon_${f}_${i}_${d}`}
                icon={FFn.graphicSelector(f)}
              />
            </FeatureIconContainer>
            <PredicateContainer index={i} key={`key_for_pcon_${d}_${i}_${f}`}>
              <p>{FFn.predicateTranslater(f)}</p>
            </PredicateContainer>
            <ValueContainer index={i} key={`key_for_vcon_${d}_${i}_${f}`}>
              <p>{FFn.valueTranslater(f, Mock[d][i])}</p>
            </ValueContainer>
          </FeatureContainer>
        ))
      ])}
      {/* {[0, 1].map(d => (
        <Patient
          // onClick={() => setChosen(d)}
          handleClick={handleClick}
          chosen={chosen}
          side={d}
          key={`key-patient-${d}`}
        />
      ))} */}
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
    </InterfaceContainer>
  );
};
