import React from "react";
import {Link} from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <h1>RESTy</h1>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/history'>History</Link></li>
      </ul>
    </header>
  );
}

export default Header;
