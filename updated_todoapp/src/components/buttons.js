import React, { useState } from "react";
import axios from "axios";

const Buttons = () => {
  const [valid, setValid] = useState(0);

    const handleClick = () => {
        // const data = {
        //     username : "steph0188"
        // }
        // axios
        // .get("http://127.0.0.1:8000/users/me", {
        //     headers:{
        //         "accept" : "application/json",
        //         // "Content-Type": "application/json"
        //         "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZG9lIiwiZXhwIjoxNjg1MDMwNDcxfQ.rTmBbbmv6M6kPcthgLTvvqQd4WmoP83o4TUFRTVJWdw"
        //     }
        // })
        // .then((response) => {
        // if (response['data'].status == "ok"){
        //     setValid(1)
        //     console.log("same")
        // }
        // else{
        //     setValid(0)
        //     console.log("not same")
        // }
        // console.log(response)

    // })
    //     .catch(function (error) {
    //     console.log(error);
    //     });
    console.log(window.localStorage.getItem("access_token"))
    };


  return (
    <div>
        {valid ? (
            <p>Logged in Yeay</p>
        ):(
            <p>not logged in :(</p>
        )}
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
};

export default Buttons;
