import React from "react";
import "./styles/styles.sass";

import Header from "./components/Header.js";
import RESTy from "./components/RESTy.js";
import Footer from "./components/Footer.js";

export default function App() {
  return (
    <div className="App">
      <Header />
      <RESTy />
      <Footer />
    </div>
  );
}
