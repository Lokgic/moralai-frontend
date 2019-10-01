import styled from "styled-components";

export const ComparisonContainer = styled.div`
  background: ${({ theme }) => theme.primary};
  max-width: none;
  width: 100vw;
  max-width: 990px;
  max-height: 990px;
  padding: 0;
  display: grid;
  grid-template-rows:
    min-content 2rem 8rem min-content 1rem;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  /* grid-column-gap: 0.8rem; */
  height: 100%;
  justify-self: center;
  grid-template-areas:
    "choosea flip flip chooseb"
    "prog prog prog prog"
    "abouta abouta aboutb aboutb"
    "ftable ftable ftable ftable";

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
    margin-top: 1rem;
    margin-bottom: 1rem;
    /* background: ${({ theme }) => theme.primaryDark}; */
    color: ${({ theme }) => theme.primaryDark};

    h4 {
      /* color: ${({ theme }) => theme.primaryDark}; */
      font-weight: 400;
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
        font-size: 4rem;
        line-height: 4rem;
      }
    }
  }
`;

export const FeatureTable = styled.div`
  grid-area: ftable;
  display: grid;
  width: 100%;
  min-height: 450px;
  color: ${({ theme }) => theme.offWhite};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: ${({ n }) =>
    n ? `repeat(${n},5rem minmax(min-content,2fr))` : `repeat(2,5rem 2fr)`};
`;

export const FeatureCell = styled.div`
  grid-row: ${({ fi }) => `${2 + fi * 2}/span 1`};
  grid-column: ${({ side }) => `${side + 1}/span 1`};
  display: flex;
  p {
    font-weight: 500;
    font-size: ${({ valType }) => (valType === "n" ? "4rem" : "2.8rem")};
    margin: auto;
    text-align: center;
    color: ${({ theme }) => theme.primaryDark};
  }

  @media (min-width: ${props => props.theme.breakpoint.w[0]}) {
    p {
      font-size: ${({ valType }) => (valType === "n" ? "6rem" : "3rem")};
    }
  }
`;

export const FeatureHeader = styled.div`
  grid-row: ${({ fi }) => `${1 + fi * 2}/span 1`};
  grid-column: 1/-1;
  background: ${({ theme }) => theme.darkGrey};
  display: flex;

  div {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 400;
    margin: auto;
    line-height: 2rem;
  }

  @media (min-width: ${props => props.theme.breakpoint.w[0]}) {
    div {
      font-size: 2.4rem;
    }
  }
`;

export const BackgroundFrame = styled.div`
  border-radius: 2px;
  z-index: -0.5;
  grid-row: ${props => props.row};
  grid-column: ${props => props.col};
  background: #7b7b7b;
  background: ${({ theme }) => theme.offWhite};
  box-shadow: 0 1px 3px rgba(50, 50, 50, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  /* margin-top: 1rem; */
`;

export const FeatureList = styled.div`
  display: grid;
`;
