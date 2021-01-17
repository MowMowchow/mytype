import './Typing_Test.css';
import React, { useEffect, useState, useCallback } from 'react';
import fapp from '../../firebase_auth/base';
import { get_mappings } from './EventsPersonal';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';

let spaces = 0;
let time_Started = 0;
let wpm = 0;
let base = new Date();

function Typing_Test(props) {
	const [ letter, set_letter ] = useState('');
	const [ loaded, set_loaded ] = useState(false);
	const [ i, set_i ] = useState(0); // index in the string
	const [ curr_string, set_curr_string ] = useState('');
	const [ mass_string, set_mass_string ] = useState('');

	// var user_email = fapp.auth().currentUser;
	// console.log(user_email)

	useEffect(() => {
		get_mappings().then((data) => {
			set_loaded(true);
			set_mass_string(data);
		});
	}, []);



	const logKey = (e) => {
		set_letter(e.key);
		
		if (i === mass_string.length-2){
			if (props.loggedin){
				console.log("LOGGEDIN")
				window.location = "https://mytypee.herokuapp.com/#/profile"
			} else if (props.loggedout){
				console.log("LOGGEDIN")
				window.location = "https://mytypee.herokuapp.com/#/signup"
			} else {
				console.log("LOGGEDIN")
				window.location = "https://mytypee.herokuapp.com/"
			}

		}



		if (e.key === mass_string[i]) {

    if (i === 0) {
      time_Started = base.getTime()
    } else {
      wpm = spaces / ((new Date().getTime() - time_Started)/(60000))
      console.log(wpm)
    }

    if (e.which === 32){
      spaces = spaces + 1;

    }
    
			console.log('matching!');
			set_i((prevI) => prevI + 1);
			set_curr_string((prevI) => prevI + e.key);
		} else {
			console.log('e.key = ', e.key, ' and phrase[i] = ', mass_string[i], ' do not match | i = ', i);
		}
	};

	const Keypress = () => {
		useEffect(() => {
			window.addEventListener('keypress', logKey);
			return () => {
				window.removeEventListener('keypress', logKey);
			};
		}, []);
		return null;
	};

	return (
	


			<div className="typing-test-container-wrapper">
			<div className="typing-test-container">
        			<Keypress />

				<div className="text-container">
          <div className="text-wrapper">
            <div className="original-text-container">
              <p className="original-text">{!loaded ? 'loading' : mass_string}</p>
            </div>
            <div className="layover-text-container">
              <p className="layover-text">{curr_string}</p>
            </div>
          </div>
				</div>
				{/* <div className="input-text-container">
					<p className="input-text">{curr_string}</p>
				</div> */}
			</div>
			</div>
		
	);
}

export default Typing_Test;
