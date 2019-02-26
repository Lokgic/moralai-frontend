import React, { Component } from "react";
import Grid from "../components/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IntroBox, FlexContainer } from "../components/styled/StyComps";
// import Feedback from "../components/Feedback";
import ModelRep from "../components/ModelRep";
import PairGen, { featuresDisplayName } from "../components/PairGenerator";
import queries from "../static/typedpairs";
import { v1 } from "uuid";
import { shuffle } from "d3";
import { noAuto } from "@fortawesome/fontawesome-svg-core";

const introText =
  "Who should get the kidney? You will be shown two patients, both in need of the same kidney, and you get to decide who gets it. After a number of scenarios, you will see how a model will make decisions based on your inputs.";

class index extends Component {
  state = {
    currentpage: "intro",
    data: null,
    nDecisions: 15,
    step: 5,
    pairMaker: new PairGen(queries, false),
    responses: [],
    userId: "atfl_" + v1(),
    featuresKey: shuffle(Object.keys(featuresDisplayName)),
    trialId: "atfl"
  };
  getFeedback = data => {
    this.setState({ responses: data.responses, currentpage: "code" });
  };
  moreDecisions = () => {
    const nDecisions = this.state.nDecisions + this.state.step;
    this.setState({ currentpage: "", nDecisions });
  };
  start = () => {
    this.setState({ currentpage: "" });
  };
  render() {
    const { pairMaker, responses } = this.state;
    return this.state.currentpage === "code" ? (
      <FlexContainer>
        <IntroBox style={{ cursor: "auto" }}>
          <h4>code 1:</h4>
          <p>{this.state.userId}</p>
          <h4>code 2:</h4>
          <p>{this.state.responses.map(d => d + "-")}</p>
        </IntroBox>
      </FlexContainer>
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
        featuresKey={this.state.featuresKey}
        userId={this.state.userId}
        getFeedback={this.getFeedback}
        nDecisions={this.state.nDecisions}
        responses={this.state.responses}
        pairMaker={this.state.pairMaker}
        disableFlip={false}
        trialId={this.state.trialId}
      />
    );
  }
}

export default index;
