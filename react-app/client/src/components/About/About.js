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
            <div className="project-container-info">
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
                  <p>MyType is a full stack web application made with React.js, Node.js, Python, MongoDB, and Express.js. 
              It is open-sourced and can be found on <a className="abt-repolink" href="https://github.com/MowMowchow/mytype">[Github]</a>
              </p>
                </div>
            <div className="project-container-info">
              <div className="heading2"><h1>How To Use?</h1></div>
              </div>
							  <div className="step-block">
								  <p className="step-block-text">1) Create a MyType Acconut</p>
							</div>

							<div className="step-block">
								<p className="step-block-text">2) Download the executable file to begin tracking your typing statistics. If you are in a rush, try out a quick typing test.</p>
							</div>

							<div className="step-block">
								<p className="step-block-text">
									3) Check your typing stats and try a custom typing test!{' '}
								</p>
              </div>
              
              <div className="step-block">
								<p className="step-block-text"> 4) Become a typing master! </p>
							</div>
            <div>
            </div>
            </div>

            <div className="team-container">
            <h1 className="heading3">The Team</h1>
              <div className="about-person-left-container">
              <div className= "about-person-left">
                  <p>Jason Hou: 1B Computer Engineering at the University of Waterloo -</p>
                  <p2> - Favourite Programming Language: Python</p2>
                </div>
              </div>
              <div className= "about-person-right-container">
              <div className= "about-person-right">
                <p>Christian Kapsales: 1B Computer Science at the University of Waterloo -</p>
                <p2>- Favourite Programming Language: Java</p2>
                </div>
              </div>
              <div className= "about-person-left-container">
              <div className= "about-person-left">
                  <p>Ankit Batra: 1B Mechatronics Engineering at the University of Waterloo -</p>
                  <p2>- Favourite Programming Language: C++ </p2>
                </div>
              </div>
              <div className= "about-person-right-container">
                <div className= "about-person-right">
                  <p>Aditya Mehrotra: 1st year Computer Science at the University of Toronto  -</p>
                  <p2> -Favourite Programming Language: Python</p2>
                  </div>
                </div>
              </div>
            </div>
          </div>
      

      )
	}
}
export default About;