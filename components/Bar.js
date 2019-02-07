import { Component } from "react";
import styled from "styled-components";

import { Object } from "es6-shim";
import { Spring, animated } from "react-spring";

// const StackContainer = styled.div`
//   transition: all 0.2s;
//   display: grid;
//   width: 100%;
//   height: 100%;
//   grid-template-columns: ${props =>
//     props.landscape ? props.data.map(d => `${d}fr `) : "1fr"};
//   grid-template-rows: ${props =>
//     props.landscape ? "1fr" : props.data.map(d => `${d}fr `)};
// `;

const StackContainer = styled.div`
  /* display: grid; */
  width: 100%;
  height: 100%;
`;

const BarViz = styled.div`
  width: ${props => props.len};
  background: ${props => props.color};
  height: 100%;
  transition: width 0.2s;
`;

const Slice = styled.div`
  background: ${props => props.color};
  /* transition: all 0.2s; */
`;

const FlexBarContainer = styled.div`
  /* margin: auto auto 0 auto; */
  height: 100%;
  width: 100%;
`;

class StackedBar extends Component {
  constructor(props) {
    super(props);
    const data = props.data;
    const keys = Object.keys(data);
    let state = {
      data,
      keys,
      slices: []
    };

    this.state = state;
    this.processStack = this.processStack.bind(this);
  }
  componentDidMount() {
    this.setState({ slices: this.processStack() });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
    if (prevState.data !== this.state.data) {
      this.setState({ slices: this.processStack() });
    }
  }
  processStack() {
    const { data, keys } = this.state;
    return keys.map(d => data[d]);
  }
  render() {
    const { slices, keys, data } = this.state;
    const { landscape } = this.props;
    const color = landscape
      ? [this.props.color, "none"]
      : ["none", this.props.color];

    // return (
    //   <Spring
    //     from={{ 0: 0, 1: 0 }}
    //     to={{ 0: slices[0], 1: slices[1] }}
    //     config={{ tension: 180, friction: 12 }}
    //   >
    //     {props => {
    //       console.log(props);
    //       const data = props.data;
    //       return (
    //         <StackContainer
    //           data={[props[0], props[1]]}
    //           landscape={this.props.landscape}
    //         >
    //           {Object.keys(props).map((d, i) => (
    //             <Slice key={`slice_key_${keys[i]}`} color={color[i]} />
    //           ))}
    //         </StackContainer>
    //       );
    //     }}
    //   </Spring>
    // );

    return (
      <StackContainer data={slices} landscape={this.props.landscape}>
        {/* {slices.map((d, i) => (
          <Slice key={`slice_key_${keys[i]}`} color={color[i]} />
        ))} */}
        <Spring from={{ w: "0%" }} to={{ w: data + "%" }} native>
          {({ w }) => (
            <animated.div
              style={{
                height: "100%",
                width: w,
                background: this.props.color
              }}
            />
          )}
        </Spring>
        {/* <BarViz len={data + "%"} color={this.props.color} /> */}
      </StackContainer>
    );
  }
}

export default StackedBar;
