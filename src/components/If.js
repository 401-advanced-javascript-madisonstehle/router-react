import React from 'react';

function If(props) {
  if (props.condition) return <>{props.children}</>
  else return null;
}

export default If;
