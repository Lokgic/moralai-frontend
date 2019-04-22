import React from "react";
// import { Transition, animated, Keyframes } from "react-spring/renderprops";
import {
  interval,
  randomUniform,
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceLink
} from "d3";
import {
  IntroContainer,
  DescriptiveText,
  HalfJumbo,
  JumboHeader,
  SectionHeader,
  ContrastContainer,
  IntroButton
} from "./styled/IntroSty";
import { ResponsiveSVG } from "./styled/SVGSty";
import Exchange from "./ExchangeSVG";
import { valueTranslaterComplete } from "./PairGenerator";

const runif = randomUniform(5500, 15000);

var nodes_data = [
  { name: "Travis", sex: "M" },
  { name: "Rake", sex: "M" },
  { name: "Diana", sex: "F" },
  { name: "Rachel", sex: "F" },
  { name: "Shawn", sex: "M" },
  { name: "Emerald", sex: "F" }
];

var links_data = [
  { source: "Travis", target: "Rake" },
  { source: "Diana", target: "Rake" },
  { source: "Diana", target: "Rachel" },
  { source: "Rachel", target: "Rake" },
  { source: "Rachel", target: "Shawn" },
  { source: "Emerald", target: "Rachel" }
];

class ForceGraph extends React.Component {
  render() {
    const simulation = forceSimulation()
      //add nodes
      .nodes(nodes_data);
    simulation
      .force("charge_force", forceManyBody())
      .force("center_force", forceCenter(100 / 2, 100 / 2));

    var link_force = forceLink(links_data).id(function(d) {
      return d.name;
    });
    simulation.force("links", link_force);
    console.log(nodes_data);
    return <ResponsiveSVG />;
  }
}

// class RandomWords extends React.Component {
//   state = { loc: 0, show: true, content: [1, 2, 3, 4] };
//   componentDidMount() {
//     this.t = interval(e => {
//       this.updateText();
//     }, runif());
//   }

//   updateText() {
//     this.setState({ show: false });
//     setTimeout(e => {
//       this.setState({ show: true });
//     }, 500);
//   }
//   render() {
//     const content = this.props.content;

//     const toShow = Math.floor(randomUniform(0, 3)());

//     return (
//       <Transition
//         native
//         items={this.state.show}
//         from={{ overflow: "hidden", height: 0 }}
//         enter={[{ height: "auto" }]}
//         leave={{ height: 0 }}
//       >
//         {show =>
//           show &&
//           (props => (
//             <animated.div style={props}>
//               {valueTranslaterComplete(content, toShow)}
//             </animated.div>
//           ))
//         }
//       </Transition>
//     );
//   }
// }

export default props => (
  <IntroContainer>
    <HalfJumbo bg="primary" alignRight>
      <div className="main-title"> Who should get</div>
      <div className="main-title main-bottom"> the kidney?</div>
      <IntroButton onClick={props.startDecision}>Begin</IntroButton>
    </HalfJumbo>
    <HalfJumbo bg="primary">
      <JumboHeader lean="bottom" fontColor="tertiaryLight">
        Your choices express your values
      </JumboHeader>
      <DescriptiveText fontColor="tertiaryLight">
        Learn about your moral judgment and contribute to the scientific
        understand of morality by deciding who gets the kidney in different
        scenarios.
      </DescriptiveText>
    </HalfJumbo>
    <HalfJumbo bg="offWhite">
      <div className="centering">
        {/* <Exchange /> */}
        <ForceGraph />
      </div>
    </HalfJumbo>
    <HalfJumbo bg="offWhite">
      <SectionHeader lean="bottom">Kidney Exchange and Morality</SectionHeader>
      <DescriptiveText>
        In a kidney exchange, patients in need of a kidney transplant who have a
        willing but medically incompatible donor can attempt to swap, or
        exchange, their donors with other patients who also have a medically
        incompatible donor. Determining the optimal way to make these donor
        exchanges is a computationally challenging problem. In addition, kidney
        exchanges may bring up moral issues. Please help us determine what the
        moral priorities of kidney exchanges should be.
      </DescriptiveText>
    </HalfJumbo>

    <HalfJumbo bg="grey">
      <SectionHeader lean="bottom" alignRight>
        Your Decisions
      </SectionHeader>
      <DescriptiveText alignRight>
        Choose which of two patients should receive a kidney. Information about
        Patient A will always be on the left. Information about Patient B will
        always be on the right. The characteristics of each patient (age, number
        of dependents, drinking habit before diagnosis, other health issues, and
        criminal record) will change in each trial.
      </DescriptiveText>
    </HalfJumbo>
    <ContrastContainer bg="grey">
      {/* <div className="leftContrast" style={{ fontSize: "1.8rem" }}>
        Patient A
      </div>
      <div className="rightContrast" style={{ fontSize: "1.8rem" }}>
        Patient B
      </div>
      <div className="leftContrast">
        <RandomWords content={"age"} />
      </div>
      <div className="rightContrast">
        <RandomWords content={"age"} />
      </div>{" "}
      <div className="leftContrast">
        <RandomWords content={"additionalHealthIssues"} />
      </div>{" "}
      <div className="rightContrast">
        <RandomWords content={"additionalHealthIssues"} />
      </div>{" "}
      <div className="leftContrast">
        <RandomWords content={"drinkingHabitPrediagnosis"} />
      </div>{" "}
      <div className="rightContrast">
        <RandomWords content={"drinkingHabitPrediagnosis"} />
      </div>{" "}
      <div className="leftContrast">
        <RandomWords content={"criminalRecord"} />
      </div>{" "}
      <div className="rightContrast">
        <RandomWords content={"criminalRecord"} />
      </div>
      <div className="leftContrast">
        <RandomWords content={"dependents"} />
      </div>
      <div className="rightContrast">
        <RandomWords content={"dependents"} />
      </div> */}
    </ContrastContainer>
    {/* <ContrastContainer>
      <div className="contrast-header">
        <SectionHeader>Your Decision</SectionHeader>
        <DescriptiveText centering>
          Choose which of two patients should receive a kidney. Information
          about Patient A will always be on the left. Information about Patient
          B will always be on the right. The characteristics of each patient
          (age, number of dependents, drinking habit before diagnosis, other
          health issues, and criminal record) will change in each trial.
        </DescriptiveText>
      </div>
      <HalfJumbo>
        <ContrastHalf>
          <LeftContrast>
            <RandomWords />
          </LeftContrast>
        </ContrastHalf>
      </HalfJumbo>
      <HalfJumbo>
        <ContrastHalf>
          <RightContrast>
            <RandomWords />
          </RightContrast>
        </ContrastHalf>
      </HalfJumbo>
    </ContrastContainer> */}
  </IntroContainer>
);
