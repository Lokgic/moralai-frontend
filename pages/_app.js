import App, { Container } from "next/app";
import Page from "../components/Page";
import { library as faLibrary } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleRight,
  faUser,
  faThumbsUp,
  faBirthdayCake,
  faBriefcaseMedical,
  faWineGlassAlt,
  faGavel,
  faChild,
  faCheckCircle,
  faGraduationCap,
  faTransgenderAlt,
  faIdCard,
  faHandHoldingUsd,
  faUserCheck,
  faUserTimes,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

faLibrary.add(
  faChevronDown,
  faAngleRight,
  faUser,
  faThumbsUp,
  faBirthdayCake,
  faBriefcaseMedical,
  faWineGlassAlt,
  faGavel,
  faChild,
  faCheckCircle,
  faGraduationCap,
  faTransgenderAlt,
  faIdCard,
  faHandHoldingUsd,
  faUserCheck,
  faUserTimes
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
