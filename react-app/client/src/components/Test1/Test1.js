import './Test1.css';
import React, { useEffect, useState, useCallback } from 'react';
import fapp from '../../firebase_auth/base';
import {get_mappings} from '../Typing_Test/EventsPersonal';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';



function Test1(){
  const [letter, set_letter] = useState("");
  const [loaded, set_loaded] = useState(false);
  const [i, set_i] = useState(0); // index in the string
  const [curr_string, set_curr_string] = useState("");
  const [mass_string, set_mass_string] = useState("");

  // var user_email = fapp.auth().currentUser;
  // console.log(user_email)
  

  
  useEffect(() => {
    get_mappings()
    .then((data) => {
      set_loaded(true);
      set_mass_string(data);
    });
  }, []);

  const logKey = (e) => {
    set_letter(e.key);

    if (e.key === mass_string[i]){
      console.log("matching!");
      set_i(prevI=>prevI+1);
      set_curr_string(prevI=>prevI+e.key);
    } else {
      console.log("e.key = ", e.key," and phrase[i] = ", mass_string[i]," do not match | i = ", i);
    }
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


  return(
    <div>
      <Keypress></Keypress>
      <br></br>
      <br></br>
      <br></br>
      <div>
      <p>{!loaded ? "loading" : mass_string}</p>
      </div>
      <div>
      <p>{curr_string}</p>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div>
      <p>{curr_string}</p>
      </div>
    </div>

  )
}

export default Test1