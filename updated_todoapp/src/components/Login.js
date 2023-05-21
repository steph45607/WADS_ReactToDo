import "../styles/login.css"
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useCookies} from 'react-cookie';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(['user']);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handle = () => {
    setCookie('Email', email, {path: "/"});
    setCookie("Password", password, {path:"/"});
  }

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }

    if(user){
      console.log(user.displayName)
      navigate("/dashboard");
    }

    if(error) alert(error);
  }, [error, loading, navigate, user]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          onClick={handle}>Set Cookie</button>
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
      {cookies.Email && (
        <div>
          Email: <p>{cookies.Email}</p>
        </div>
      )}
      {
        cookies.Password && (
          <div>
            Password: <p>{cookies.Password}</p>
          </div>
        )
      }
    </div>
  );
}
export default Login;