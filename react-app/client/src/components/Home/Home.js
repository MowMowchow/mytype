import React, { useEffect, useState } from "react";
import './Home.css';
import { Link } from 'react-router-dom';


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

const Home = () => {

		return (
			<div className="home-container">
				<Keypress />
				<div className="start-prompt-container">
					<h1 className="start-prompt">[Press Any Key to Start]</h1>
				</div>
			</div>
		)
}

export default Home;