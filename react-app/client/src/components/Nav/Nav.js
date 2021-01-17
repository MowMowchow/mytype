import './Nav.css';
import React, { Component } from 'react';
import fapp from '../../firebase_auth/base';
import { Link } from 'react-router-dom';

function Nav(props){

  return(
    <div className="nav-container">
      <div className="nav-mytype-container">
      <Link to="/" className="nav-link"><h3 className="nav-header">MyType</h3></Link>
      </div>
      
      
      <div className={!props.loggedin ? "nav-login-container" : "hidden"}>
      <Link to="/login" className="nav-link"><h3 className="nav-header">Login</h3></Link>
      </div>
      
      <div className={props.loggedin ? "nav-login-container" : "hidden"}>
      <Link to="/profile" className="nav-link"><h3 className="nav-header">Profile</h3></Link>
      </div>
      
      <div className="nav-about-container">
        <Link to="/About" className="nav-link"><h3 className="nav-header">About Us</h3></Link>
      </div>
    </div>
  )
}

export default Nav;