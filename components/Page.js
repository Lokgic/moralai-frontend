import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Header from "./Header";
import Meta from "./Meta";

export const theme = {
  blue: "#5276d0",
  serif: "Playfair Display, serif",
  sans: "Roboto, sans-serif",
  offWhite: "#EDEDED",
  darkblue: "rgb(96, 135, 150)",
  milky: "#ECE9DE",
  secondaryDark: "#FFA010",
  contrast: "rgb(157, 23, 72)",
  sharpContrast: "rgb(255, 51, 102)",
  primary: "hsl(222.7, 21.5%, 21%)",
  primaryDark: "hsl(222.7, 15.5%, 20%)",
  primaryLight: "hsl(222.7, 55.5%, 35%)",
  secondary: "#f9aa33",
  grey: "hsl(0, 0%, 85%)",
  darkGrey: "hsl(220, 4%, 87%)",
  tertiary: "#EDF0F2",
  tertiaryDark: "#6795af",
  tertiaryLight: "rgb(210, 235, 245)",
  black: "#202124",
  breakpoint: {
    w: ["1000px", "750px"],
    h: ["800px"]
  }
};

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 62.5%;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {

        padding: 0;
        margin: 0;
        font-size: 1.6rem;
        line-height: .5;
        font-family: ${theme.sans};
        color:${theme.black};
        background:${theme.primary};
      }
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  height: 90vh;
  @media (max-width: ${theme.breakpoint.w[0]}) {
    /* 
    height: 100vh;
    grid-template-columns: 1fr;
    grid-template-rows: auto 9fr; */
  }
  @media (max-width: ${theme.breakpoint.w[1]}) {
    /* grid-template-rows: auto 7fr; */
  }
`;

const ContentContainer = styled.div`
  place-self: stretch;
  display: grid;
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
          <GlobalStyle />
          <Header headerState={this.state.headerState} />
          <ContentContainer>{this.props.children}</ContentContainer>
        </MainContainer>
      </ThemeProvider>
    );
  }
}

export default Page;
