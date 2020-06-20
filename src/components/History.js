import React from 'react';

function History(props) {
  let historyEl = [];

  function onRerun(request) {

  }

  for ( let i = 0; i < props.history.length; i++ ) {
    if (props.size === 'light') {
      historyEl.push(<div key={i}>
        <span className='url'>{props.history[i].url}</span>
        <span className='method'>{props.history[i].method}</span>
        <button onClick={(e) => { 
          onRerun(props.history[i])
          }}
        >
          Rerun
        </button>
      </div>)
    } else {
      historyEl.push(<div key={i}>
        <span className='url'>{props.history[i].url}</span>
        <span className='method'>{props.history[i].method}</span>
        <button onClick={(e) => { 
          onRerun(props.history[i])
          }}
        >
          Rerun
        </button>
        <div>
          <span className='body'>{props.history[i].body}</span>
          <span className='headers'>{props.history[i].headers}</span>
        </div>

      </div>)
    }
  }


  return (
    <div className={props.className} style={props.style}>

    </div>
  )
}

export default History;