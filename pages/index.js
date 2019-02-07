import React, { Component } from "react";
import Grid from "../components/Grid";
import styled from "styled-components";
// import Feedback from "../components/Feedback";
import ModelRep from "../components/ModelRep";
import PairGen from "../components/PairGenerator";
import queries from "../static/typedpairs";
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
    data: null,
    nDecisions: 11,
    step: 5,
    pairMaker: new PairGen(queries, false),
    responses: []
  };
  getFeedback = data => {
    this.setState({ responses: data.responses, currentpage: "feedback" });
  };
  moreDecisions = () => {
    const nDecisions = this.state.nDecisions + this.state.step;
    this.setState({ currentpage: "", nDecisions });
  };
  render() {
    // console.log(da);
    const { pairMaker, responses } = this.state;

    return this.state.currentpage === "feedback" ? (
      <ModelRep
        data={{ pairMaker, responses }}
        moreDecisions={this.moreDecisions}
      />
    ) : (
      <Grid
        getFeedback={this.getFeedback}
        nDecisions={this.state.nDecisions}
        responses={this.state.responses}
        pairMaker={this.state.pairMaker}
      />
    );
  }
}

export default index;
