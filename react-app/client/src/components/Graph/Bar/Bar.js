import '../Graph.css';
import React, { Component, useEffect, useState } from 'react';


function Bar(props){
  const high = 1;
  // const bar_length = Math.min(Math.max(20, (props.value/(high))*100), 100);
  const bar_length = (props.value/(high+.1))*100;
// {props.value}
  return(
    <div className="bar">
      <div className="info">
        <h6>{props.letter}</h6>
      </div>
        <div class={`progress-line %{props.letter}`}>
          <span style={{width:`${bar_length}%`}}></span>
        </div>
    </div>
    );
}


export default Bar;
