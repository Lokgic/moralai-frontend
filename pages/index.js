import React, { Component } from "react";
import Grid from "../components/Grid";
import styled from "styled-components";
// import Feedback from "../components/Feedback";
import ModelRep from "../components/ModelRep";
// import brain from "brain.js";

const DecisionContainer = styled.div`
  width: auto;
  padding: 40px 40px 0px 80px;
  flex-grow: 1;
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    width: 100%;
    padding: 20px 20px;
  }
`;

class index extends Component {
  state = {
    currentpage: "",
    data: null
  };
  getFeedback = data => {
    this.setState({ data, currentpage: "feedback" });
  };
  render() {
    // console.log(da);
    return this.state.currentpage === "feedback" ? (
      <ModelRep data={this.state.data} />
    ) : (
      <Grid getFeedback={this.getFeedback} />
    );
  }
}

export default index;
