import React, { useCallback, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import fapp from './firebase_auth/base';
import {AuthProvider} from './firebase_auth/auth';
import PrivateRoute from './firebase_auth/PrivateRoute';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import Typing_Test from './components/Typing_Test/Typing_Test';
import EndScreen from './components/EndScreen/EndScreen';
import About from './components/About/About';
import Nav from './components/Nav/Nav';
import chart from './components/chart/chart';
import Test1 from './components/Test1/Test1';



function App() {
	var [loggedIn, setloggedIn] = useState(null);
	var [loggedOut, setloggedOut] = useState(null);

	fapp.auth().onAuthStateChanged(user => {
		if (user){
			setloggedIn(loggedIn = true);
			setloggedOut(loggedOut = false);
		} else {
			setloggedIn(loggedIn = false);
			setloggedOut(loggedOut = true);
		}
	})
	

	return (
		<AuthProvider>
			<Router>
				<div>
					<Nav loggedin = {loggedIn} loggedout = {loggedOut} />
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/signup" exact component={SignUp}/>
						<Route path="/endscreen" exact component={EndScreen}/>
						<Route path="/Typing_Test" exact component={Typing_Test}/>
						<Route path="/about" exact component={About}/>
						<Route path="/chart" exact component={chart}/>
						<PrivateRoute path="/profile" exact component={Profile}/>
						<Route path="/test" exact component={Test1}/>
					</Switch>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
