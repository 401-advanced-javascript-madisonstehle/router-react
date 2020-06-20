import React from "react";

import Form from "./Form.js";
import Results from "./Results.js";

class RESTy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      method: "GET",
      headers: {},
      body: {}
    };
  }

  onURLChange(e) {
    this.setState({ ...this.state, url: e.target.value });
  }

  onMethodChange(e) {
    this.setState({ ...this.state, method: e.target.value });
  }

  async onSubmit(e) {
    let body;
    let headers = {};

    let res = await fetch(this.state.url, {
      method: this.state.method,
      headers: {
        Accept: "application/json"
      }
    });

    if (res.status === 200) {
      body = await res.json();

      for (let entry of res.headers.entries()) {
        headers[entry[0]] = entry[1];
      }
    }

    this.setState({ ...this.state, headers, body });
  }

  render() {
    return (
      <section>
        <Form
          url={this.state.url}
          className="form"
          onURLChange={this.onURLChange.bind(this)}
          onMethodChange={this.onMethodChange.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
        />
        <Results
          tabWidth={4}
          className="results"
          headers={this.state.headers}
          body={this.state.body}
        />
      </section>
    );
  }
}

export default RESTy;
