import React, { Component } from 'react';
import './About.css';


class About extends Component {
	render() {
			return (
        <div className="abt-container">
          <div className="abt-header"> 
            About Us
          </div>
          <div className="abt-content-container">
            <div className="project-container-info"></div>
              <div className="heading1"><h1>What is MyType?</h1></div>
                <div className="pog">
                  <p>MyType is the perfect way to improve your typing skills, 
                  FAST! Our app uses an effective keystroke tracking algorithm, 
                  to pick up on your typing habits while going about your day. 
                  After logging in to the app, you can view your statistics and 
                  do our customized typing test tailored to you. If you are in a rush,
                  try a quick typing test and view your stats now!
                  </p>
                  <p2>Master your typing skills now!</p2>
                  <p>MyType is a full stack web application made with React.js, node.js, Python, MongoDB, and express.js. 
              It is open-sourced and can be found on GitHub <p><a href="https://github.com/MowMowchow/mytype">Here</a></p>
              </p>
                </div>
            </div>
            <div className="project-container-info">
              <div className="heading2"><h1>How To Use?</h1></div>
              1)
              
              
            </div>
            <div className="about-person-left-container">
            <div className= "about-person-left">
                
              </div>
            </div>
            <div className= "about-person-right-container">
            <div className= "about-person-right">
                p2
              </div>
            </div>
            <div className= "about-person-left-container">
            <div className= "about-person-left">
                p3
              </div>
            </div>
            <div className= "about-person-right-container">
              <div className= "about-person-right">
                p4
              </div>
            </div>
          </div>
      

      )
	}
}
export default About;