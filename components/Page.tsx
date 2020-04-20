import styled, {
  ThemeProvider,
  createGlobalStyle,
  DefaultTheme
} from "styled-components";
import Meta from "./Meta";

export const colors = {
  lightShade: "rgb(237, 237, 237)",
  lightAccent: "rgb(82, 118, 208);",
  main: "hsl(222.7, 21.5%, 21%)",
  darkAccent: "rgb(157, 23, 72)",
  darkShade: "#323335",
  black: "#111",
  grey: "hsl(0, 0%, 85%)",
  hightlight: "#882255"
};
const breakpoints = {
  w: ["1200px", "900px", "650px"],
  h: ["800px"]
};

const fontStyles = {
  serif: "Roboto Slab",
  sans: "Roboto"
};

const theme: DefaultTheme = {
  colors,
  breakpoints,
  fontStyles
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
        line-height: 2rem;
        font-family: ${fontStyles.sans};
        color:${colors.black};
        background:${colors.main};
      }

`;
const MainContainer = styled.div`
  height: 90vh;
`;

export default (props: { children?: JSX.Element | JSX.Element[] }) => (
  <ThemeProvider theme={theme}>
    <MainContainer>
      <Meta />
      <GlobalStyle />
      {props.children}
    </MainContainer>
  </ThemeProvider>
);
