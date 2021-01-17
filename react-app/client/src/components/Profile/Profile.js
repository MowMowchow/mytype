import './Profile.css';
import React, { Component, useEffect, useState } from 'react';
import fapp from '../../firebase_auth/base';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import Graph from '../Graph/Graph';
import {Bar, Line} from 'react-chartjs-2';


// const get_mappings = async (email) => {
//   const data = { "Email": email };
//     var mappings_temp = await fetch('http://localhost:3001/getwpm', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data), 
//         }).then((response)=>response.json()).then((data)=>{
//         return data.Alphabet;
// })




function Profile (){
  const [loading, set_loading] = useState(true);
  const [username, set_username] = useState("");
  const [wpm_pb, set_wpm_pb] = useState(0);
  const [alphabet_10, set_alphabet_5] = useState([[]]);
  const [wpm_6, set_wpm_6] = useState([]);
  
  
  const get_user = async () => {
    var user_email =  fapp.auth().currentUser.email;
    console.log(user_email)
    // change to heroku thing
    var data = await fetch('http://localhost:3001/getuser', { // Send User Info
    method: 'POST',
    headers: {
    'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({Email: user_email})
    });
    console.log(data);
    return await data;
  }

  useEffect(() => {
		get_user().then((response) => response.json())
    .then((user) => {
      console.log("user", user);
      set_loading(false);
      set_username(user.Username);
      set_wpm_pb(user.wpm_pb);
      set_wpm_6([user.wpm_list[0], user.wpm_list[1], user.wpm_list[2], user.wpm_list[3],user.wpm_list[4],user.wpm_list[5], user.wpm_list[6]])
      var sortable = [];
      for (var i in user.Alphabet) {
          sortable.push([i, user.Alphabet[i]]);
      }
      sortable.sort(function(a, b) {
        return a[1] - b[1];
      });
      console.log(sortable)
      set_alphabet_5(sortable.slice(sortable.length-11, sortable.length-1));
      console.log("alpha5", alphabet_10);
    });
	}, []);

  const data = {
    labels: [1,4,6,7,8],
    datasets: [
      {
        label: "First dataset",
        data: wpm_6,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  return(
    <div className="User-Container-Parent">
      <div className="User-Container">
        <div className="Username-Container">
          <h2 className="Username-header">{username}</h2>
        </div>
        <div className="User-Info-Container">
          <div className="User-Stats-Parent-Container">
            <div className="User-Stats-Container">
              <h2 className="User-Stats-WPM">Highest WPM: {wpm_pb}</h2>
              <div className="App">

              <Line
          data={data}
          options={{
            title:{
              display:true,
              text:'WPM Overtime',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            scales:{
              yAxes: [{
                scaleLabel: {
                  display:true,
                  labelString: 'WPM'
                }
            }],
            xAxes: [{
              scaleLabel: {
                display:true,
                labelString: 'Time Interval'
              }
            }]
            }
          }} 
          
        />

          <div className="User-Graph-Container">
            <h3 className="User-Graph-Header">Slowest Words</h3>
            <Graph arr={alphabet_10}  max={alphabet_10[9]}/>
          </div>
          </div>
          <div className="signout-btn-container">
            <Link to="/" onClick={() => fapp.auth().signOut()}>
              <button className="signout-btn">
                Sign Out
              </button>
            </Link>
          </div>
        </div>
        
      </div>
      </div>
      </div>
      </div>
  )
}

export default Profile;