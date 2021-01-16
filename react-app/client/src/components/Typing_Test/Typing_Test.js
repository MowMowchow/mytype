import React, { Component, createContext } from 'react';
import './Typing_Test.css'

/*
let time = 60; 
let quotes_array = [ 
  "This is a test lol lol lol", 
  "Array fo rglhasflk this is a string", 
  "MyType is going to replace MonkeyType", 
  "how fast can you type the word poggers", 
  "The only way to do great work is to love what you do."
]; 

let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");

let timeLeft = time;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  current_quote = quotes_array[quoteNo];

  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quote_text.appendChild(charSpan)
  })

  if (quoteNo < quotes_array.length - 1)
    quoteNo++;
  else
    quoteNo = 0;
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeElapsed++;
    timer_text.textContent = timeLeft + "s";
  }
  else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);
  input_area.disabled = true;
  quote_text.textContent = "Click on restart to start a new game.";
  restart_btn.style.display = "block";
  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}

function startGame() {

  resetValues();
  updateQuote();
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
}

*/


class Typing_Test extends Component{
  render() {
    return (
      <div className="background">
        <div className="container">
          <div className="heading">
            {/* MyType Custom Test: {time}  */}
          </div>
          </div> 
            <textarea class="input_area">
              {/* //placeholder="start typing here..."
              //oninput="processCurrentText()"
              //onfocus="startGame()"  */}
              </textarea> 
          </div>
    )
  }
}
export default Typing_Test;