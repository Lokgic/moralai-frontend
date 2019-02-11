import React, { Component } from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import Header from "./Header";
import Meta from "./Meta";
import reakitTheme from "reakit-theme-default";

export const theme = {
  ...reakitTheme,
  blue: "#5276d0",
  sans: "Roboto",
  offWhite: "#EDEDED",
  darkblue: "rgb(96, 135, 150)",
  milky: "#f5f1e4",
  secondaryDark: "#f59a12",
  contrast: "rgb(157, 23, 72)",
  sharpContrast: "rgb(255, 51, 102)",
  primary: "#344955",
  primaryDark: "#232f34",
  primaryLight: "#4a6572",
  secondary: "#f9aa33",
  grey: "#E5E5E5",
  tertiary: "#EDF0F2",
  tertiaryDark: "#D2DBE0",
  tertiaryLight: "rgb(210, 235, 245)",
  black: "#202124",
  breakpoint: {
    w: ["1000px", "600px"],
    h: ["700px"]
  }
};

injectGlobal`
    html {
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {

        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
        font-family: ${theme.sans};
        color:${theme.black};
        background:${theme.primary};
      }
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 450px 1fr;
  height: 100vh;
  min-height: 550px;
  @media (max-width: ${theme.breakpoint.w[0]}) {
    /* flex-direction:column; */
    height: 100vh;
    grid-template-columns: 1fr;
    grid-template-rows: auto 9fr;
  }
  @media (max-width: ${theme.breakpoint.w[1]}) {
    grid-template-rows: auto 7fr;
  }
`;
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerState: {
        title: "default",
        subtitle: "default"
      }
    };
    this.setHeaderState = this.setHeaderState.bind(this);
  }
  setHeaderState(newState) {
    this.setState({
      headerState: {
        ...this.state,
        ...newState
      }
    });
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <MainContainer>
          <Meta />
          <Header headerState={this.state.headerState} />
          {this.props.children}
        </MainContainer>
      </ThemeProvider>
    );
  }
}

export default Page;
