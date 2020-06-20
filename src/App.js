import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import "./styles/styles.sass";

import Header from "./components/Header.js";
import If from './components/If.js';
import Form from './components/Form.js';
import Results from './components/Results.js';
import History from './components/History.js';
import Footer from "./components/Footer.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      method: 'GET',
      body: '',
      headers: '',
      responseBody: '',
      responseHeaders: '',
      history: [],
      loading: false,
    };
  }

  onURLChange(e) {
    this.setState({ ...this.state, url: e.target.value });
  }

  onMethodChange(e) {
    this.setState({ ...this.state, method: e.target.value });
  }

  onBodyChange(e) {
    this.setState({ ...this.state, body: e.target.value });
  }

  onHeadersChange(e) {
    this.setState({ ...this.state, headers: e.target.value });
  }

  async onRerun(request) {
    await this.setState({
      url: request.url, 
      body: request.body, 
      method: request.method, 
      headers: request.headers
    });

    await this.onSubmit({rerun: true});
  }

  async onSubmit(e) {
    await this.setState({loading: true});

    let request = {
      url: this.state.url,
      method: this.state.method,
      headers: this.state.headers,
      body: this.state.body
    };

    let responseBody = {};
    let responseHeaders = {};

    let res = await fetch(this.state.url, {
      method: this.state.method,
      body: this.state.body === 'GET' ? null : this.state.body ? JSON.parse(this.state.body) : null,
      headers: this.state.headers ? {
        ...JSON.parse(this.state.headers),
        Accept: "application/json",
      } : { Accept: 'application/json' },
    });

    if (res.status === 200 || res.status === 201) {
      if (!e.rerun) await this.setState( { history: [...this.state.history, request] });

      responseBody = await res.json();

      for (let entry of res.headers.entries()) {
        responseHeaders[entry[0]] = entry[1];
      }
    } else {
      responseBody = res.status + res.statusText;
    }

    this.setState({ ...this.state, responseHeaders, responseBody, loading: false });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Route path='/' exact>
            <Form 
              url={this.state.url}
              body={this.state.body}
              headers={this.state.headers}
              onURLChange={this.onURLChange.bind(this)}
              onMethodChange={this.onMethodChange.bind(this)}
              onBodyChange={this.onBodyChange.bind(this)}
              onHeadersChange={this.onMethodChange.bind(this)}
              onSubmit={this.onSubmit.bind(this)}
            />

            <History 
              size='light' 
              history={this.state.history} 
              onRerun={this.onRerun.bind(this)}
            />

            <If 
              condition={
                this.state.responseHeaders || this.state.responseBody
              }
            >
              <Results 
                headers={this.state.responseHeaders}
                body={this.state.responseBody}
                tabWidth={5}
              />
            </If>

            <If condition={this.state.loading}>
              <h4>Loading...</h4>
            </If>
          </Route>

          <Route path='/history' exact>
            <History 
              size='heavy' 
              history={this.state.history} 
              onRerun={this.onRerun.bind(this)}
            />
          </Route>

          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;