import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
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
export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
