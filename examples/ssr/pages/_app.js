import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import Typography from "@material-ui/core/Typography";
import ReactGA from "react-ga";
import Menu from "../components/menu";
import getPageContext from "../src/getPageContext";
import raven from "../modules/raven";

if (typeof window !== "undefined") {
  ReactGA.initialize("UA-135638821-1");
  ReactGA.pageview(window.location.pathname + window.location.search);
}

class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }
  componentDidCatch(error, errorInfo) {
    raven.catchError(error, errorInfo, "critical");
  }
  async componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    await raven.init();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>React-multi-carousel - w3js</title>
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
            <Menu />
            <Component pageContext={this.pageContext} {...pageProps} />
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default MyApp;
