import './Graph.css';
import Bar from './Bar/Bar';
import React, { Component, useEffect, useState } from 'react';
import fapp from '../../firebase_auth/base';


function Graph(props){

  
  return(
    <div className="skill-bars">
      {props.arr.map((x) => {return <Bar letter={x[0]} value={x[1]} max={props.max}></Bar>})}
    </div>
  );
  }

export default Graph;
