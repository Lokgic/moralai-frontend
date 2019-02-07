import styled from "styled-components";

export const BottomCell = styled.div`
  background-color: ${props => props.theme.grey};
  color: ${props => props.theme.offWhite};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  /* min-height: 150px; */
  height: 200px;
  @media (max-height: ${props => props.theme.breakpoint.h[0]}) {
    height: auto;
  }
`;

export const Progress = styled.div`
  width: 100%;
  height: 10px;
  display: grid;
  grid-template-columns: ${props => `${props.len[0]}fr ${props.len[1]}fr`};

  .left-progress {
    background: ${props => props.theme.contrast};
  }
  .right-progress {
    background: ${props => props.theme.milky};
  }
`;

export const ChoiceButton = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props =>
    props.chosen === "chosen" || props.predicted === "predicted"
      ? props.theme.secondary
      : props.theme.offWhite};
  padding-top: 5px;
  &:hover {
    background: ${props => props.theme.secondary};
  }
  p {
    text-align: center;
    color: ${props => props.theme.black};
    font-size: 1.3rem;
    margin: 0 auto auto auto;
  }
  svg {
    margin: auto auto 0 auto;
    height: 55px;
    fill: ${props => props.theme.black};
  }
  .choice-icon {
    font-size: 65px;
    color: ${props => props.theme.black};
  }
  @media (max-height: ${props => props.theme.breakpoint.h[0]}) {
    p {
      font-size: 1.2rem;
    }
    svg {
      height: 30px;
    }
    .choice-icon {
      font-size: 35px;
    }
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    p {
      font-size: 1.2rem;
    }
    svg {
      height: 15px;
    }
    .choice-icon {
      font-size: 35px;
    }
  }
`;

export const MsgBox = styled.div`
  grid-column: 1 / -1;
  background-color: ${props => props.theme.primaryDark};
  display: flex;
  justify-content: center;

  p {
    font-size: 2.7rem;
    color: ${props => props.theme.offWhite};
    margin: auto;
    @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
      font-size: 1.5rem;
    }
    @media (max-height: ${props => props.theme.breakpoint.h[0]}) {
      font-size: 1.7rem;
    }
  }

  button {
    background: ${({ theme }) => theme.primaryDark};
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    display: ${props => (props.chosen === -1 ? "none" : "static")};
    height: 100%;
    color: white;
    @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
      font-size: 1.2rem;
    }
    @media (max-height: ${props => props.theme.breakpoint.h[0]}) {
      font-size: 1.2rem;
    }
    &:hover {
      color: ${({ theme }) => theme.primaryDark};
      background: ${({ theme }) => theme.secondary};
    }
  }
`;

export const GridCell = styled.div`
  background-color: ${({ theme, expand }) =>
    expand == 2 ? theme.grey : theme.offWhite};
  display: grid;
  grid-template-columns: ${props =>
    props.expand === 2 ? "1fr" : "2fr 1fr 2fr"};
  grid-template-rows: ${props => (props.expand === 2 ? "1fr 4fr 4fr" : "1fr")};
  flex-grow: ${props => props.expand};
  flex-basis: 0;
  transition: all 0.2s;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  cursor: pointer;
  &:hover {
    background: ${({ theme, expand }) => theme.grey};
  }
  .expanded-title {
    background-color: ${({ theme, expand }) => theme.offWhite};
    margin: 0;
    display: flex;
    padding-left: 16px;
    h1 {
      margin: auto 0;
      text-align: left;
      font-family: ${props => props.theme.sans};
      text-transform: uppercase;
      font-weight: 400;
      color: ${props => props.theme.primary};
      font-size: 3rem;
      @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
        font-size: 2rem;
      }
    }
  }
  .expanded-description {
    background-color: ${({ theme, expand }) => theme.offWhite};
    margin: 0;
    padding: 16px;
    text-align: left;
    font-family: ${props => props.theme.sans};
    font-weight: 400;
    color: ${props => props.theme.primary};
    font-size: 1.7rem;
    @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
      font-size: 1.2rem;
    }
  }
`;

export const Cell = styled.div`
/* background-color:${props => props.theme.offWhite}; */
display:flex;
flex-direction:column;
align-content: center;
align-items:center;
min-height:60px;

div {
    margin: auto auto auto 16px;
    height:82px;
    width:82px;
    background: ${props => props.theme.secondary};
    display:flex;
    border-radius:2px 2px;
    svg{
        margin:auto;
    }
}
h1{
    font-family: ${props => props.theme.sans}; 
    text-transform:uppercase;
    font-weight:700;
    font-size:3rem;
    line-height:3rem;
    color:${props => props.theme.secondaryDark};
    @media (max-width:${props => props.theme.breakpoint.w[0]}){
        font-size:2.5rem;
        line-height:2.5rem;
    }
    @media (max-width:${props => props.theme.breakpoint.w[1]}){
        font-size:2.3rem;
        line-height:2.3rem;
    }
}
h3 {
    font-family: ${props => props.theme.sans};
    font-weight:300;
    font-size:1.4rem;
    line-height:1.4rem;
    color: #888;
    @media (max-width:${props => props.theme.breakpoint.w[0]}){
        font-size:1.2rem;
        line-height:1rem;
    }
    @media (max-width:${props => props.theme.breakpoint.w[1]}){
        font-size:1rem;
        line-height:1rem;
    }

}
h4 {
    font-family: ${props => props.theme.sans};
    font-weight: 400;
    font-size:2rem;
    line-height:2rem;
    color: ${({ theme }) => theme.black};
    @media (max-width:${props => props.theme.breakpoint.w[0]}){
        font-size:1.5rem;
        line-height:1.5rem;
    }
    @media (max-width:${props => props.theme.breakpoint.w[1]}){
        font-size:1.4rem;
        line-height:1.4rem;
    }

}


`;

export const LeftCell = styled(Cell)`
  h1 {
    margin: 8px auto 8px 16px;
  }
  h3 {
    margin: auto auto 0px 16px;
  }
  h4 {
    margin: 0px auto auto 16px;
  }

  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    h1 {
      margin: 4px auto 4px 8px;
    }
    h3 {
      margin: auto auto 0px 8px;
    }
    h4 {
      margin: 0px auto auto 8px;
    }
  }
`;

export const RightCell = styled(Cell)`
  text-align: right;
  h1 {
    margin: 8px 16px 8px auto;
  }
  h3 {
    margin: auto 16px 0px auto;
  }
  h4 {
    margin: 0px 16px auto auto;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    h1 {
      margin: 4px 8px 4px auto;
    }
    h3 {
      margin: auto 8px 0px auto;
    }
    h4 {
      margin: 0px 8px auto auto;
    }
  }
`;

export const IconCell = styled.div`
  display: flex;

  overflow: hidden;
  font-size: ${props => (props.expand === 2 ? "7em" : "4em")};
  svg {
    margin: auto;
  }
  @media (max-height: ${props => props.theme.breakpoint.h[0]}) {
    font-size: ${props => (props.expand === 2 ? "3em" : "1.7em")};
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    font-size: ${props => (props.expand === 2 ? "3em" : "1.7em")};
  }
`;
