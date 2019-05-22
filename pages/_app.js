import App, { Container } from "next/app";
import Page from "../components/Page";
import { library as faLibrary } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faBirthdayCake,
  faWineGlassAlt,
  faChild
} from "@fortawesome/free-solid-svg-icons";

faLibrary.add(
  faUser,

  faBirthdayCake,

  faWineGlassAlt,

  faChild
);
class MyApp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <Page>
          <Component />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
