import brain from "brain.js";
import { Component } from "react";
import CF from "./CoinFlip";
import { theme } from "./Page";
import {
  makeType,
  StatMaker,
  graphicSelector,
  valueTranslaterComplete,
  Person,
  relativeValue,
  modelPrefTitle
} from "./PairGenerator";
import { Input, Label, Divider } from "reakit";
import {
  FlexContainer,
  ScrollContainer,
  VizCard,
  ChartContainer,
  FilteredVizGrid,
  ChartControl,
  DropdownContainer,
  FVizCard,
  FIcon,
  IText,
  WeightGrid,
  WeightBar,
  WeightDescription,
  WeightIcon,
  WeightDivider,
  WeightVizCard,
  WeightNext,
  WeightDetail,
  WeightDetailBackIcon,
  WeightDetailDesc,
  DoMoreCard
} from "./styled/StyComps";
import Bar from "./Bar";
const net = new brain.NeuralNetwork({
  inputSize: 10,
  outputSize: 1,
  log: true
});
import Scale from "./Scale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import archtype from "../static/archtype";
import { Spring, animated } from "react-spring";
import { faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons";
export default class ModelRep extends Component {
  constructor(props) {
    super(props);
    const net = new brain.NeuralNetwork({
      inputSize: 5,
      outputSize: 1,
      log: true
    });
    const { pairMaker, responses } = props.data;
    const q = pairMaker.history.map((pair, i) => {
      const input = pairMaker.getDiff(pair[0], pair[1]);
      const output = { choice: responses[i] };
      return { input, output };
    });

    const sample = pairMaker.getRandomSamples(1000);

    net.train(q);
    // console.log(net.run(sample))
    const testcase = makeType(["sickparent", "middleage"]);
    this.net = net;
    // this.sm = sm;
    this.state = { testcase, sample, weightDetails: "none" };
    this.propertyKeys = Object.keys(testcase.properties);
    this.handleUpdateTestcase = this.handleUpdateTestcase.bind(this);
    this.handleWeightDetails = this.handleWeightDetails.bind(this);
    const blank = makeType(["blank"]);

    const predictions = sample.map((d, i) => {
      const p = net.run(pairMaker.getDiff(blank, d)).choice;
      const prediction = p > 0.66 ? 1 : p < 0.33 ? 0 : 2;
      return { prediction, properties: d.properties };
    });

    const smForWeight = new StatMaker(blank.properties, predictions);
    this.smForWeight = smForWeight;
    this.w = smForWeight.getWeight();
  }
  handleUpdateTestcase(event) {
    const oldCase = this.state.testcase.properties;
    const newCase = { ...oldCase };
    const { name, value } = event.target;
    newCase[name] = value;
    this.setState({ testcase: new Person(newCase) });
  }
  handleWeightDetails(key) {
    this.setState({ weightDetails: key });
  }

  render() {
    const { propertyKeys, net, w } = this;
    const { testcase, sample, weightDetails } = this.state;
    const { pairMaker } = this.props.data;
    const predictions = sample.map((d, i) => {
      const p = net.run(pairMaker.getDiff(testcase, d)).choice;
      const prediction = p > 0.66 ? 1 : p < 0.33 ? 0 : 2;
      return { prediction, properties: d.properties };
    });
    const sm = new StatMaker(testcase.properties, predictions);

    const dis = sm.getDistribution("sum");
    const color = [theme.blue, theme.contrast, theme.secondary];
    const testProperties = testcase.properties;
    return (
      <FlexContainer style={{ height: "100vh" }}>
        <ScrollContainer>
          <DoMoreCard onClick={this.props.moreDecisions}>
            <p>
              Not happy with your result? Continue training your model by making
              more decisions.
            </p>
            <FontAwesomeIcon icon={"angle-right"} size="2x" />
          </DoMoreCard>
          <WeightVizCard>
            <h2>Your Preference Model</h2>
            <p>
              Our model has determined the following preferences best represent
              your moral judgment based the decisions you have made so far.
            </p>
            {propertyKeys.map((k, i) => (
              <WeightGrid
                weightDetails={weightDetails}
                key={`weightgrid${k}`}
                onClick={() => this.handleWeightDetails(k)}
              >
                <WeightDescription key={`weightdes${k}`}>
                  {modelPrefTitle(k)}
                </WeightDescription>
                <WeightIcon key={`weighticon${k}`}>
                  <FontAwesomeIcon
                    icon={graphicSelector(k)}
                    key={`weighticon${k + i}`}
                  />
                </WeightIcon>
                <WeightBar key={`weightbar${k}`}>
                  <Scale
                    key={`weightscale${k}`}
                    relation={relativeValue(k)}
                    degree={w[k]}
                  />
                </WeightBar>
                <WeightNext key={`weightnextcell${k}`}>
                  <FontAwesomeIcon
                    key={`weightangleright${k}`}
                    icon={"angle-right"}
                    key={`angleright${k + i}`}
                  />
                </WeightNext>
                <WeightDivider key={`weightdiv${k}`}>
                  <Divider key={`weightdivider${k}`} />
                </WeightDivider>
              </WeightGrid>
            ))}
            <WeightDetail weightDetails={weightDetails}>
              <WeightDetailDesc
                onClick={() => this.handleWeightDetails("none")}
              >
                <FontAwesomeIcon icon={graphicSelector(weightDetails)} />
                {
                  " preference breakdown: how does the model choose based on "
                }{" "}
                {modelPrefTitle(weightDetails)} ?{/* <Divider /> */}
              </WeightDetailDesc>
              <WeightDetailBackIcon
                onClick={() => this.handleWeightDetails("none")}
              >
                <FontAwesomeIcon icon={"angle-right"} />
              </WeightDetailBackIcon>
              <div style={{ gridArea: "plot", display: "flex" }}>
                <svg
                  height="100%"
                  width="100%"
                  style={{
                    minHeight: "400px",

                    margin: "auto"
                  }}
                >
                  {weightDetails !== "none"
                    ? this.smForWeight
                        .getWeightBreakDown(weightDetails)
                        .map((d, i) => (
                          <g>
                            <Spring
                              from={{ h: "0%", y: "95%", topTextY: "95%" }}
                              to={{
                                h: (d / 100) * 90 + "%",
                                y: 90 - (d / 100) * 90 + 3 + "%",
                                topTextY: 90 - (d / 100) * 90 + 2.25 + "%"
                              }}
                              native
                              key={weightDetails + i + "spring"}
                            >
                              {({ h, y, topTextY }) => [
                                <animated.rect
                                  x={[22.5, 47.5, 72.5][i] + "%"}
                                  y={y}
                                  height={h}
                                  width="5%"
                                  fill={color[i]}
                                  key={h + y + topTextY + "rec"}
                                />,
                                <animated.text
                                  x={[25, 50, 75][i] + "%"}
                                  y={topTextY}
                                  textAnchor="middle"
                                  fontSize="12"
                                  key={h + y + topTextY + "text1"}
                                >
                                  {d} % of the time
                                </animated.text>,
                                <text
                                  x={[25, 50, 75][i] + "%"}
                                  y="99%"
                                  textAnchor="middle"
                                  fontSize="12"
                                  key={h + y + topTextY + "text2"}
                                >
                                  {
                                    [
                                      ...relativeValue(weightDetails),
                                      "flipping a coin"
                                    ][i]
                                  }
                                </text>
                              ]}
                            </Spring>
                          </g>
                        ))
                    : null}
                  <text x="0%" y="99%" textAnchor="start" fontSize="12">
                    It prefers:
                  </text>
                </svg>
              </div>
            </WeightDetail>
          </WeightVizCard>

          <VizCard>
            <h2>Who has a chance?</h2>
            <p>
              Find out if a type of patient has a good chance to get a kidney by
              choosing a profile below
            </p>
            {propertyKeys.map((k, i) => (
              <DropdownContainer key={`dropdown${k + i}`}>
                <Label key={`key+${k + i}`}>
                  <FontAwesomeIcon
                    icon={graphicSelector(k)}
                    key={`celliconcinputlabel_${k + i}`}
                  />
                </Label>

                <Input
                  as="select"
                  key={`${k + i}input`}
                  value={testProperties[k]}
                  name={k}
                  onChange={this.handleUpdateTestcase}
                >
                  {k === "age"
                    ? Array.from(Array(5).keys()).map(j => (
                        <option
                          key={`option_${k}_${i}_${j}`}
                          // selected={testProperties[k] === j}

                          value={j}
                        >
                          {valueTranslaterComplete(k, j)}
                        </option>
                      ))
                    : Array.from(Array(3).keys()).map(j => (
                        <option
                          key={`option_${k}_${i}_${j}`}
                          // selected={testProperties[k] === j}
                          value={j}
                        >
                          {valueTranslaterComplete(k, j)}
                        </option>
                      ))}
                </Input>
              </DropdownContainer>
            ))}
            {/* <ChartContainer>
              <ChartControl>
                How the model make the de patients with this profile
              </ChartControl>
              {dis.map((d, i) => {
                const keys = Object.keys(d);
                return keys.map(k => (
                  <Bar
                    color={color[i]}
                    data={[1000 - d[k], d[k]]}
                    key={`${i}_${k}`}
                  />
                ));
              })}
              {dis.map((d, i) => {
                const keys = Object.keys(d);
                return keys.map(k => (
                  <div
                    className="icon"
                    key={`${k + i}_icon_chart`}
                    style={{ color: color[i] }}
                  >
                    <FontAwesomeIcon
                      icon={graphicSelector(k)}
                      key={`celliconchart_${k + 1}`}
                    />
                  </div>
                ));
              })}
            </ChartContainer> */}
            <p>Based on the model, a patient with the above profile will...</p>
            <FilteredVizGrid>
              {dis.map((d, i) => [
                <FIcon key={"ficon" + d + i}>
                  {
                    [
                      <FontAwesomeIcon icon={faUserCheck} />,
                      <FontAwesomeIcon icon={faUserTimes} />,
                      <CF />
                    ][i]
                  }
                </FIcon>,
                <IText key={"itext" + d + i}>
                  <p>
                    {
                      [
                        `receive a kidney ${d / 10}% of the time.`,
                        `not receive a kidney ${d / 10}% of the time.`,
                        `face a coinflip ${d / 10}% of the time.`
                      ][i]
                    }
                  </p>
                </IText>,
                <Spring
                  from={{ a: 0, b: 0 }}
                  to={{ a: d, b: 1000 - d }}
                  key={"spring" + d + i}
                >
                  {({ a, b }) => (
                    <Bar
                      color={color[i]}
                      data={[a, b]}
                      landscape
                      key={`filtered${+i + d}`}
                    />
                  )}
                </Spring>,
                // <Bar
                //   color={color[i]}
                //   data={[d, 1000 - d]}
                //   landscape
                //   key={`filtered${+i + d}`}
                // />
                <Divider key={"div" + d + i} />
              ])}
            </FilteredVizGrid>
          </VizCard>
          {/* <VizCard>
            <FilteredVizGrid>
              {propertyKeys.map((p, i) => {
                const out = sm
                  .getFilteredStat(p)
                  .map((d, j) => (
                    <Bar
                      color={color[j]}
                      data={[d, 1000 - d]}
                      landscape
                      key={`filtered${+j + d}`}
                    />
                  ));
                return [
                  <FIcon>
                    <FontAwesomeIcon
                      icon={graphicSelector(p)}
                      key={`fcelliconchart_${p + 1}`}
                    />
                  </FIcon>,
                  ...out
                ];
              })}
            </FilteredVizGrid>
          </VizCard> */}
        </ScrollContainer>
      </FlexContainer>
    );
  }
}
