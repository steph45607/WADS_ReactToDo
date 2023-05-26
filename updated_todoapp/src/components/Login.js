import axios from "axios";
import "../styles/login.css"
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Welcome from "./welcome"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();

    const data ={
      username: email,
      password : password
    }

    axios
        .post("http://127.0.0.1:8000/token", data,  {
            headers:{
                "accept" : "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })

        .then((response) => {
          window.localStorage.setItem("access_token", response.data.access_token)
          console.log(response.data.access_token)
          setValid(1)
          navigate("/welcome")
        })
        .catch(function(error) {
          console.log(error);
        })
  }

  return (
    <div className="login">
      <form className="login__container" onSubmit={handleSubmit}>
      {valid ? (
        <p>You are logged in</p>
      ):(
        <p>You are not logged in :(</p>
      )}
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
          className="login__btn"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;