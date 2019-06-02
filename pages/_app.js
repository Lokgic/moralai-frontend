import App, { Container } from "next/app";
// import ContextProvider from "../ContextProvider";
import Page from "../components/Page";
import { library as faLibrary } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faBirthdayCake,
  faWineGlassAlt,
  faChild,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

faLibrary.add(
  faUser,
  faSpinner,
  faBirthdayCake,

  faWineGlassAlt,

  faChild
);

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Page>
          {/* <ContextProvider> */}
          <Component {...pageProps} />
          {/* </ContextProvider> */}
        </Page>
      </Container>
    );
  }
}

export default MyApp;
