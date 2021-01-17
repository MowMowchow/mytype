import './Test1.css';
import React, { useEffect, useState, useCallback } from 'react';
import fapp from '../../firebase_auth/base';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';



function Test1(){
  const [letter, set_letter] = useState("");
  
  const [i, set_i] = useState(0); // index in the string
  const [curr_string, set_curr_string] = useState("");


  let phrase = "i like cheese 123 deetee smeels";

  const logKey = (e) => {
    console.log(e.key);
    set_letter(e.key);
   //  return e.key;
  //  user_string += letter;
    if (e.key === phrase[i]){

      console.log("matching!");
      set_i(prevI=>prevI+1);
      set_curr_string(prevI=>prevI+e.key);
    } else {
      console.log("e.key = ", e.key," and phrase[i] = ", phrase[i]," do not match | i = ", i);
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
      {phrase}
      <br></br>
      {letter}
      <br></br>
      {curr_string}
    </div>

  )
}

export default Test1