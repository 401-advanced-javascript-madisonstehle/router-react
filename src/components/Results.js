import React from "react";

function Results(props) {
  return (
    <div className={props.className} style={props.style}>
      <div className="headers">
        <pre>{JSON.stringify(props.headers, null, props.tabWidth)}</pre>
      </div>
      <div className="body">
        <pre>{JSON.stringify(props.body, null, props.tabWidth)}</pre>
      </div>
    </div>
  );
}

export default Results;
