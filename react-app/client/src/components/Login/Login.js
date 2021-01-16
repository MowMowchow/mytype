import './Login.css';
import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router';
import fapp from '../../firebase_auth/base';
import {AuthContext} from '../../firebase_auth/auth';

const Login = ({ history }) => {
  const handleLogIn = useCallback( async (event) => {
    event.preventDefault();
    const {email, password} = event.target.elements;

    try{
      await fapp.auth().signInWithEmailAndPassword(email.value, password.value); // actual firebase auth action
      history.push('/profile');
    } catch(error){alert(error);}
  }, [history]);

  // const { currentUser } = useContext(AuthContext);

  // if (currentUser) {
  //   return <Redirect to="/profile" />;
  // }

  return(
    <div>
      Login
      <form onSubmit={handleLogIn}>
        <input 
          name="email" 
          className="login-email" 
          type="email" 
          placeholder="Email" 
        />

        <input
          name="password"
          className="login-password"
          type="password"
          placeholder="Password"
        />

        <button 
          type="submit" 
          className="login-btn">
          Login
        </button>
      </form>
      <Link className ="signup-link" to="signup">
        Don't have an Account?
      </Link>
    </div>
  )
}


export default withRouter(Login);