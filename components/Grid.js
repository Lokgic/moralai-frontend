import React, { Component } from "react";
import styled, { consolidateStreamedStyles } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "./Page";
import { FlexContainer } from "./styled/StyComps";
import queries from "../static/typedpairs";
import PairGen, {
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
  ChoiceButton
} from "./styled/GridSty";

const MsgSelector = (chosen, names) => {
  switch (chosen) {
    case 0:
    case 1:
      return `You have chosen ${names[chosen]}`;
    case 2:
      return "The choice will be made by flipping a coin";
    case 3:
    case 4:
      return `Our AI predicts that you will choose ${names[chosen - 3]}`;
    default:
      return "who should get the kidney?";
  }
};

const featuresKey = Object.keys(featuresDisplayName);

class Grid extends Component {
  constructor(props) {
    super(props);
    this.clean = {
      expand: "none",
      chosen: -1
    };
    const pairMaker = new PairGen(queries, false);

    this.state = {
      ...this.clean,
      // queries: [],
      responses: [],
      pair: pairMaker.getNew()
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
  handleConfirm(el) {
    const responses = [...this.state.responses, this.state.chosen];
    if (responses.length >= 5) {
      this.props.getFeedback({ pairMaker: this.pairMaker, responses });
    } else {
      const pair = this.pairMaker.getNew();
      this.setState({
        // queries,
        responses,
        pair,
        ...this.clean
      });
    }
  }
  render() {
    const names = ["Patient A", "Patient B"];
    const { setHeaderState } = this.props;
    const { chosen, expand } = this.state;

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
        <BottomCell id="tour1">
          <MsgBox chosen={chosen}>
            <p>{MsgSelector(chosen, names)}</p>
            <button onClick={this.handleConfirm}>
              confirm <FontAwesomeIcon icon="check-circle" />
            </button>
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
            chosen={chosen === 2 ? "chosen" : "notChosen"}
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
