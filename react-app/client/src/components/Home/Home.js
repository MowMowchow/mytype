import React, { useEffect, useState, Component} from "react";
import './Home.css';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';


const logKey = (e) => {
	window.location.replace(window.location.href+'Typing_Test');
}

const Keypress = () => {
	useEffect(() => {
		window.addEventListener("keypress", logKey);
		return () => {
			window.removeEventListener("keypress", logKey);
		}
	}, [])
	return null;
}

class Home extends Component {
		render() {
			return (
			<div className="home-container">
			<Particles/>
			<div>
				<Keypress />
				<div className="start-prompt-container">
					<h1 className="start-prompt">[Press Any Key to Start]</h1>
				</div>
				</div>
			</div>
			
			)
		}
}

export default Home;