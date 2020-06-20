import React from 'react';
import If from './If.js';
import { Redirect } from 'react-router-dom';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  
  onRerun(request) {
    this.props.onRerun(request);
    this.setState({ redirect: true });
  }
  
  render() {
    let historyEl = [];
    for ( let i = 0; i < this.props.history.length; i++ ) {
      if (this.props.size === 'light') {
        historyEl.push(
          <div key={i}>
            <span className='url'>{this.props.history[i].url}</span>
            <span className='method'>{this.props.history[i].method}</span>
            <button 
              onClick={(e) => { 
                this.onRerun(this.props.history[i])
              }}
            >
              Rerun
            </button>
          </div>
        );
      } else {
        historyEl.push(
          <div key={i}>
            <span className='url'>{this.props.history[i].url}</span>
            <span className='method'>{this.props.history[i].method}</span>
            <button onClick={(e) => { 
              this.onRerun(this.props.history[i])
              }}
            >
              Rerun
            </button>
            <div>
              <span className='body'>{this.props.history[i].body}</span>
              <span className='headers'>{this.props.history[i].headers}</span>
            </div>
          </div>
        )
      }
    }
  
  
    return (
      <>
        <If condition={this.state.redirect}>
          <Redirect push to='/' />
        </If>

        <If condition={!this.state.redirect}>
          <div className={this.props.className} style={this.props.style}>
            {historyEl}
          </div>
        </If>
      </>
    )
  }
}

export default History;