import styled from "styled-components";

export const breakpoint = [
  {
    x: "1500px"
  },
  {
    x: "1000px"
  },
  {
    x: "650px"
  }
];

export const ComparisonCard = styled.div`
  width: 600px;
  height: 350px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  margin: 50px auto;
  overflow: hidden;
  display: flex;
  @media (max-width: ${breakpoint[2].x}) {
    width: 100%;
    height: auto;
    flex-direction: column;
    margin: 30px 0;
    box-shadow: none;
  }
`;
