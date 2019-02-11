import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FlexContainer, CallForAction } from "./styled/StyComps";

import {
  featuresDisplayName,
  expandTranslator,
  predicateTranslater,
  valueTranslater,
  subjectTranslater,
  graphicSelector
} from "./PairGenerator";
import CF from "./CoinFlip";
import {
  MsgBox,
  BottomCell,
  IconCell,
  RightCell,
  LeftCell,
  GridCell,
  ChoiceButton,
  Progress
} from "./styled/GridSty";

const MsgSelector = (chosen, names) => {
  switch (chosen) {
    case 0:
    case 1:
      return `You have chosen ${names[chosen]}`;
    case 0.5:
      return "Flip a coin!";
    case 3:
    case 4:
      return `Our AI predicts that you will choose ${names[chosen - 3]}`;
    default:
      return "Who should get the kidney?";
  }
};

const postURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/post-dps"
    : "https://moral-ai-backend.herokuapp.com/post-dps";

const featuresKey = Object.keys(featuresDisplayName);

class Grid extends Component {
  constructor(props) {
    super(props);
    this.clean = {
      expand: "none",
      chosen: -1
    };
    // const pairMaker = new PairGen(queries, false);
    const { pairMaker, responses, nDecisions } = props;
    const baseline = responses.length;
    this.state = {
      ...this.clean,
      // queries: [],
      responses,
      pair: pairMaker.getNew(),
      target: nDecisions,
      baseline,
      timeStamp: Date.now()
    };

    this.pairMaker = pairMaker;
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleExpand.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  handleExpand(el) {
    const expand = el === this.state.expand ? "none" : el;
    this.setState({ expand });
  }
  handleClick(el) {
    const chosen = el === this.state.chosen ? -1 : el;
    this.setState({ chosen });
  }
  sendPayload = async pl => {
    const rawResponse = await fetch(postURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pl)
    });
    const content = await rawResponse;
    console.log(content);
  };
  handleConfirm(el) {
    const { target, chosen, timeStamp, pair } = this.state;
    const responses = [...this.state.responses, this.state.chosen];
    const order = ["left", "right"];
    const featureOrder = [
      "age",
      "additionalHealthIssues",
      "drinkingHabitPrediagnosis",
      "criminalRecord",
      "dependents"
    ];

    const newTS = Date.now();
    const payload = {
      userId: this.props.userId,
      decision: chosen,
      start: timeStamp,
      end: newTS,
      delay: newTS - timeStamp,
      decisionRank: responses.length,
      trialId: 0
    };

    for (let i = 0; i < order.length; i++) {
      for (let j = 0; j < featureOrder.length; j++) {
        payload[`${order[i]}_${j + 1}`] = pair[i].properties[featureOrder[j]];
      }
    }
    this.sendPayload(payload);
    if (responses.length === target) {
      this.props.getFeedback({ pairMaker: this.pairMaker, responses });
    } else {
      const pair = this.pairMaker.getNew();
      this.setState({
        // queries,
        responses,
        pair,
        timeStamp: newTS,
        ...this.clean
      });
    }
  }
  render() {
    const names = ["Patient A", "Patient B"];
    const featuresKey = this.props.featuresKey;
    const { chosen, expand, responses, target, baseline } = this.state;

    const pair = [this.state.pair[0].properties, this.state.pair[1].properties];
    let cells = [];
    for (let feat of featuresKey) {
      const key1 = `${feat}_L`;
      const key2 = `${feat}_R`;
      const key3 = `${feat}_M`;

      cells.push(
        <GridCell
          onClick={() => this.handleExpand(feat)}
          expand={expand === "none" ? 1 : expand === feat ? 2 : 0}
          key={`${feat}_gridcell`}
        >
          {expand !== feat ? (
            <LeftCell key={`${key1}_cell`}>
              <h3 key={`${key1}_h3`}>{subjectTranslater(feat, names[0])}</h3>
              <h1 key={`${key1}_h1`}>{valueTranslater(feat, pair[0][feat])}</h1>
              <h4 key={`${key1}_h4`}>
                {predicateTranslater(feat, pair[0][feat])}
              </h4>
            </LeftCell>
          ) : (
            <div className="expanded-title">
              <h1>{expandTranslator(feat)[0]}</h1>
            </div>
          )}

          <IconCell
            key={`${feat}_icon_cell`}
            expand={expand === "none" ? 1 : expand === feat ? 2 : 0}
          >
            <FontAwesomeIcon
              icon={graphicSelector(feat)}
              key={`cellicon_${feat}`}
            />
          </IconCell>
          {expand !== feat ? (
            <RightCell key={`${key2}_cell`}>
              <h3 key={`${key2}_h3`}>{subjectTranslater(feat, names[1])}</h3>
              <h1 key={`${key2}_h1`}>{valueTranslater(feat, pair[1][feat])}</h1>
              <h4 key={`${key2}_h4`}>
                {predicateTranslater(feat, pair[1][feat])}
              </h4>
            </RightCell>
          ) : (
            <div className="expanded-description">
              {expandTranslator(feat)[1]}
            </div>
          )}
        </GridCell>
      );
    }

    return (
      <FlexContainer>
        {cells}
        <Progress
          len={[responses.length - baseline, target - responses.length]}
        >
          <div
            className="left-progress"
            style={{
              height: "100%",
              width:
                Math.round(
                  ((responses.length - baseline) / (target - baseline)) * 100
                ) + "%"
            }}
          />
          {/* <div className="right-progress" /> */}
        </Progress>
        <BottomCell id="tour1">
          <MsgBox chosen={chosen}>
            <p>{MsgSelector(chosen, names)}</p>
            <CallForAction onClick={this.handleConfirm}>
              Next <FontAwesomeIcon icon="angle-right" />
            </CallForAction>
          </MsgBox>
          <ChoiceButton
            chosen={chosen === 0 ? "chosen" : "notChosen"}
            predicted={chosen === 3 ? "predicted" : "notPredicted"}
            onClick={() => this.handleClick(0)}
          >
            <FontAwesomeIcon icon="user" className="choice-icon" />
            <p>Choose {names[0]}</p>
          </ChoiceButton>
          <ChoiceButton
            chosen={chosen === 0.5 ? "chosen" : "notChosen"}
            onClick={() => this.handleClick(0.5)}
          >
            <CF />
            <p>Flip a coin</p>
          </ChoiceButton>
          <ChoiceButton
            onClick={() => this.handleClick(1)}
            chosen={chosen === 1 ? "chosen" : "notChosen"}
            predicted={chosen === 4 ? "predicted" : "notPredicted"}
          >
            <FontAwesomeIcon className="choice-icon" icon="user" />
            <p>Choose {names[1]}</p>
          </ChoiceButton>
        </BottomCell>
      </FlexContainer>
    );
  }
}

export default Grid;
