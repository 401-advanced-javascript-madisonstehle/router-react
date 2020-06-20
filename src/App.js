import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom';
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
      history: []
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

  onSubmit(e) {
    let request = {
      url: this.state.url,
      method: this.state.method,
      headers: this.state.headers,
      body: this.state.body
    };

    this.setState( {history: [...this.state.history, request] });
  }

  render() {
    return (
    <div className="App">
      <Header />
      <BrowserRouter>  
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

            <If 
              condition={
                this.state.responseHeaders || this.state.responseBody
              }
            >
              <Results 
              
              />
            </If>

            <History size='light' history={this.state.history}/>
            
          </Route>

          <Route path='/history' exact>

          </Route>
        <Footer />
      </BrowserRouter>
    </div>
    );
  }
}

export default App;