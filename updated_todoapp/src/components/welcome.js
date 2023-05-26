import React, { useState , useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/welcome.css"

const Welcome = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = window.localStorage.getItem("access_token");
        axios
            .get("http://localhost:8000/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setName(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleLogout = () => {
        window.localStorage.removeItem("access_token");
        navigate("/");
      };

    return(
        <div className="container">
          <div className="topBun"></div>
        <h1>Welcome!</h1>
        <p className="name">{name}</p>
        <button
          className="logout_btn"
          type="submit"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    )
}

export default Welcome;