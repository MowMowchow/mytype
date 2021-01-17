import './SignUp.css';
import React, { useCallback } from 'react';
import {withRouter} from 'react-router';
import fapp from '../../firebase_auth/base';
import 'whatwg-fetch';
import keyboard_img from './keyboard_signup.svg';


const SignUp = ({history}) =>{
  const handleSignUp = useCallback( async (event) => {
    event.preventDefault();
    const {username, email, password} = event.target.elements;

    try{
      await fapp.auth().createUserWithEmailAndPassword(email.value, password.value) // actual firebase auth action
      console.log(username.value, email.value);
      const data = {
        "Email":email.value,
        "Username": username.value,
        "wpm_list": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "Alphabet": {'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0, 'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0, 'q': 0, 'r': 0, 's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0, 'I': 0, 'J': 0, 'K': 0, 'L': 0, 'M': 0, 'N': 0, 'O': 0, 'P': 0, 'Q': 0, 'R': 0, 'S': 0, 'T': 0, 'U': 0, 'V': 0, 'W': 0, 'X': 0, 'Y': 0, 'Z': 0, '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '!': 0, '@': 0, '#': 0, '%': 0, '^': 0, '&': 0, '*': 0, '(': 0, ')': 0, '-': 0, '=': 0, '+': 0, '`': 0, '~': 0, '[': 0, ']': 0, '{': 0, '}': 0, '|': 0, ';': 0, ':': 0, "'": 0, '"': 0, ',': 0, '<': 0, '>': 0, '/': 0, '?': 0}
      };
      console.log(JSON.stringify(data));
      // send user data to mongo
      // https://mytypee.herokuapp.com/newuser
      // http://localhost:3001/newuser
      fetch('http://localhost:3001/newuser', { // Send User Info
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
        });
      history.push('/profile');

    } catch(error){alert(error);}
  }, [history]);


  return(
    <div className="background">
    <div className="vertical-center">
    <div className="horizontal-center">
      <div className="row signup-container">
        <div className="col-7 signup-pic-col">
          <img src={keyboard_img} className="signup-pic" alt="sign up" />

          {/* <img src={#} className="signup-pic" alt="signup" /> */}
        </div>
        <div className="col-5 signup-form-col">
          <div className="signup-form-container-all">
            <div className="signup-form-title-container">
              <h1 className="signup-form-title"> Sign Up </h1>
            </div>
            <div className="signup-form-container">
              <form onSubmit={handleSignUp}>
                <div className="signup-username-container">
                  {/* <label htmlFor="signup-email" classname="signup-email-label">
            Email
          </label> */}
                  <input
                    name="username"
                    className="signup-username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="signup-email-container">
                  {/* <label htmlFor="signup-email" classname="signup-email-label">
            Email
          </label> */}
                  <input name="email" className="signup-email" type="email" placeholder="Email" />
                </div>
                <div className="signup-password-container">
                  {/* <label htmlFor="signup-password" classname="signup-password-label">
            Password
          </label> */}
                  <input
                    name="password"
                    className="signup-password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="signup-btn-container">
                  <button type="submit" className="signup-btn">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    
  
);

    }


export default withRouter(SignUp);
