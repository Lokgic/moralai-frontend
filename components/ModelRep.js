import brain from "brain.js";
import { Component } from "react";
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
  WeightGrid,
  WeightBar,
  WeightDescription,
  WeightIcon,
  WeightDivider,
  WeightVizCard
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
    this.state = { testcase, sample };
    this.propertyKeys = Object.keys(testcase.properties);
    this.handleUpdateTestcase = this.handleUpdateTestcase.bind(this);
    const blank = makeType(["blank"]);

    const predictions = sample.map((d, i) => {
      const p = net.run(pairMaker.getDiff(blank, d)).choice;
      const prediction = p > 0.66 ? 1 : p < 0.33 ? 0 : 2;
      return { prediction, properties: d.properties };
    });

    const smForWeight = new StatMaker(blank.properties, predictions);
    this.w = smForWeight.getWeight();
    console.log(this.w);
  }
  handleUpdateTestcase(event) {
    const oldCase = this.state.testcase.properties;
    const newCase = { ...oldCase };
    const { name, value } = event.target;
    newCase[name] = value;
    this.setState({ testcase: new Person(newCase) });
  }

  render() {
    const { propertyKeys, net, w } = this;
    const { testcase, sample } = this.state;
    const { pairMaker } = this.props.data;
    const predictions = sample.map((d, i) => {
      const p = net.run(pairMaker.getDiff(testcase, d)).choice;
      const prediction = p > 0.66 ? 1 : p < 0.33 ? 0 : 2;
      return { prediction, properties: d.properties };
    });
    const sm = new StatMaker(testcase.properties, predictions);

    const dis = sm.getDistribution();
    const color = [theme.blue, theme.contrast, theme.secondary];
    const testProperties = testcase.properties;
    return (
      <FlexContainer style={{ height: "100vh" }}>
        <ScrollContainer>
          <WeightVizCard>
            {propertyKeys.map((k, i) => (
              <WeightGrid expand={k === "age" ? 1 : 0}>
                <WeightDescription>{modelPrefTitle(k)}</WeightDescription>
                <WeightIcon>
                  <FontAwesomeIcon
                    icon={graphicSelector(k)}
                    key={`weighticon${k + i}`}
                  />
                </WeightIcon>
                <WeightBar>
                  <Scale relation={relativeValue(k)} degree={w[k]} />
                </WeightBar>
                <WeightDivider>
                  <Divider />
                </WeightDivider>
              </WeightGrid>
            ))}
          </WeightVizCard>
          <VizCard>
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
          </VizCard>
          <VizCard>
            <ChartContainer>
              <ChartControl>
                Each bar represent the number of situations in which the
                recipent of a kidney is your patient, the other patient, or
                decided by a coin flip.
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
            </ChartContainer>
          </VizCard>
          <VizCard>
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
          </VizCard>
        </ScrollContainer>
      </FlexContainer>
    );
  }
}
