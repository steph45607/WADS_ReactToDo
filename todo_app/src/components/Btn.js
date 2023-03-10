import React from "react";
const Btn = (props) => {
    return <button className="AddBtn" onClick={props.onClick}>{props.text}</button>
}

export {Btn};