import React, { useState } from "react";
import axios from "axios";

const Forms = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState("");

  
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e.target.value)
        // console.log(username)
        const data = {
            username : username,
            password: password
        }
        
        axios
        .post("http://127.0.0.1:8000/token", data,  {
            headers:{
                "accept" : "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })


        .then((response) => {
        // if (response['data'].status == "ok"){
        //     setValid(1)
        //     console.log("same")
        // }
        // else{
        //     setValid(0)
        //     console.log("not same")
        // }
        window.localStorage.setItem("access_token", response.data.access_token)
        console.log(response.data.access_token)

})
    .catch(function (error) {
    console.log(error);
    });
    };
  
    return (
      <div>
        {valid ? (
            <p>Logged in Yeay</p>
        ):(
            <p>not logged in :(</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default Forms;