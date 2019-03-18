import styled from "styled-components";

export const IntroContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.offWhite};
  display: grid;
  grid-auto-rows: 550px;
  grid-template-columns: 1fr 1fr;
`;

export const WholeJumbo = styled.div`
  grid-column: 1 / -1;
  background: ${({ theme, bg }) => (bg ? theme[bg] : theme.grey)};
`;

export const HalfJumbo = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme, bg }) => (bg ? theme[bg] : theme.grey)};

  .main-title {
    width: 500px;
    margin: auto auto 2px auto;
    font-family: ${({ theme }) => theme.serif};
    color: ${({ theme }) => theme.secondary};
    font-size: 6rem;
    text-align: right;
  }
  .main-bottom {
    margin: 2px auto 8px auto;
    font-size: 8rem;
  }
  .centering {
    margin: auto;
  }
`;
export const DescriptiveText = styled.div`
  width: 500px;
  font-weight: 300;
  font-size: 17px;
  line-height: 28px;
  color: ${({ theme, fontColor }) =>
    fontColor ? theme[fontColor] : theme.primaryDark};
  text-align: ${({ alignRight }) => (alignRight ? "right" : "left")};
  margin: ${({ centering }) => (centering ? "auto" : "2px auto auto auto;")};
`;

export const JumboHeader = styled.div`
  color: ${({ theme, fontColor }) =>
    fontColor ? theme[fontColor] : theme.primaryDark};
  text-align: ${({ alignRight }) => (alignRight ? "right" : "left")};
  margin: auto auto 2px auto;
  font-size: 2.5rem;
  font-weight: 300;
  width: 500px;
`;

export const SectionHeader = styled.div`
  color: ${({ theme, fontColor }) =>
    fontColor ? theme[fontColor] : theme.blue};
  text-align: ${({ alignRight }) => (alignRight ? "right" : "left")};
  margin: auto auto 2px auto;
  font-size: 21px;
  font-weight: 400;
  width: 500px;
  text-transform: uppercase;
`;

export const ContrastContainer = styled(HalfJumbo)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  /* height: 700px; */
  padding: 60px 0;

  .leftContrast {
    margin: auto 16px auto auto;
    font-size: 1.5rem;
    text-transform: capitalize;
    color: ${({ theme }) => theme.blue};
  }
  .rightContrast {
    margin: auto auto auto 16px;
    font-size: 1.5rem;
    text-transform: capitalize;
    color: ${({ theme }) => theme.contrast};
  }
  .contrast-header {
    display: flex;
    flex-direction: column;
    grid-column: 1/-1;
    text-align: center;
  }
`;

export const IntroButton = styled.div`
  margin: 16px auto auto auto;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  color: ${props => props.theme.tertiaryLight};
  text-transform: uppercase;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background: ${props => props.theme.contrast};
  text-shadow: 0 1px 3px rgba(36, 180, 126, 0.4);
  height: 40px;
  line-height: 40px;
  letter-spacing: 0.025em;
  padding: 0 14px;
  cursor: pointer;
`;

export const ContrastText = styled.div`
  text-transform: uppercase;
  font-size: 3.5rem;
  /* margin: auto 0 auto auto; */
  div {
    /* width: 100%; */
    /* margin: auto 0 auto auto; */
  }
`;

// export const LeftContrast = styled(ContrastText)`
//   margin: auto;
// `;

// export const RightContrast = styled(ContrastText)`
//   margin: auto;
// `;
