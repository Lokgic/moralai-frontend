import React, { Component } from "react";
import Grid from "../components/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IntroBox, FlexContainer } from "../components/styled/StyComps";
// import Feedback from "../components/Feedback";
import ModelRep from "../components/ModelRep";
import PairGen from "../components/PairGenerator";
import queries from "../static/typedpairs";
import { v1 } from "uuid";

console.log(process.env.NODE_ENV);
const introText =
  "Who should get the kidney? You will be shown two patients, both in need of the same kidney, and you get to decide who gets it. After a number of scenarios, you will see how a model will make decisions based on your inputs.";

class index extends Component {
  state = {
    currentpage: "intro",
    data: null,
    nDecisions: 11,
    step: 5,
    pairMaker: new PairGen(queries, false),
    responses: [],
    userId: v1()
  };
  getFeedback = data => {
    this.setState({ responses: data.responses, currentpage: "feedback" });
  };
  moreDecisions = () => {
    const nDecisions = this.state.nDecisions + this.state.step;
    this.setState({ currentpage: "", nDecisions });
  };
  start = () => {
    this.setState({ currentpage: "" });
  };
  render() {
    // console.log(da);
    const { pairMaker, responses } = this.state;
    console.log(this.state);
    return this.state.currentpage === "feedback" ? (
      <ModelRep
        data={{ pairMaker, responses }}
        moreDecisions={this.moreDecisions}
      />
    ) : this.state.currentpage === "intro" ? (
      <FlexContainer>
        <IntroBox onClick={this.start}>
          <p>{introText}</p>
          <p>
            <FontAwesomeIcon icon="chevron-down" size="4x" />
          </p>
        </IntroBox>
      </FlexContainer>
    ) : (
      <Grid
        userId={this.state.userId}
        getFeedback={this.getFeedback}
        nDecisions={this.state.nDecisions}
        responses={this.state.responses}
        pairMaker={this.state.pairMaker}
      />
    );
  }
}

export default index;
