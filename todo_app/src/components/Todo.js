// import React, { Component } from 'react'
import "../App.css"

function Todo({children}, props) {
    function deleteTask(){
        console.log(props.key)
    }
  return (
    <div className="patty">
        <input type="checkbox"></input>
        <h4>{children}</h4>
        <button className='pattyBtn' onClick={() => deleteTask()}>Delete</button>
        {/* <button className='pattyBtn'>Edit</button> */}
    </div>
  )
}

export default Todo
