import React from "react";
import { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
// import "slate-simple-editor/dist/index.css";
import "@/styles/main.scss";
// import "normalize.css/normalize.css";

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;

//if we call getInitialProps from here, other pages getInitialProps would be invalid. we have to call all other pages getInitialProps here manually
// it will break the static optimization
