import App, { Container } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
// import ContextProvider from "../ContextProvider";
import Page from "../components/Page";
import { library as faLibrary } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faBirthdayCake,
  faWineGlassAlt,
  faChild,
  faSpinner,
  faUserFriends,
  faArrowAltCircleRight,
  faExchangeAlt
} from "@fortawesome/free-solid-svg-icons";

faLibrary.add(
  faUser,
  faSpinner,
  faBirthdayCake,
  faUserFriends,
  faWineGlassAlt,
  faArrowAltCircleRight,
  faChild,
  faExchangeAlt
);

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Page>
        {/* <ContextProvider> */}
        <Component {...pageProps} />
        {/* </ContextProvider> */}
      </Page>
    );
  }
}

export default MyApp;
