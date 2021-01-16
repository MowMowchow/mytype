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
              Hack info 1
            </div>
            <div className="project-container-info">
              Hack info 2
            </div>
            <div className="about-Person-Left">
              p1
            </div>
            <div className= "about-Person-Right">
              p2
            </div>
            <div className= "about-Person-Left">
              p3
            </div>
            <div className= "about-Person-Right">
              p4
            </div>
          </div>
        </div>

      )
	}
}
export default About;