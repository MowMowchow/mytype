import './Profile.css';
import React, { Component } from 'react';
import fapp from '../../firebase_auth/base';
import { Link } from 'react-router-dom';

function Profile(){

  return(
    <div>
      profile
      <Link to="/" onClick={() => fapp.auth().signOut()}>
        <button>
          Sign Out
        </button>
      </Link>

      <div className="User-Container">
        <div className="Username-Container">
          username  goes here
        </div>
        <div className="User-Info-Container">
          <div className="User-Stats-Parent-Container">
            <div className="User-Stats-Container">
              stats go here
            </div>
          <div className="User-Graph-Container">
            Graph goes here
          </div>
          </div>
        </div>



      </div>

    </div>
  )
}

export default Profile;