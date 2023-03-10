import React from 'react'
import { useState } from 'react';
import "../App.css"
import Filter from './Filter';

// function Todo(props) {
//   function deleteTask(){
//       console.log(props.taskKey)
//       const newArray = tasks.filter(task => task.id)
//   }
// return (
//   <div className="patty">
//       <input type="checkbox"></input>
//       <h4>{props.value}</h4>
//       <button className='pattyBtn' onClick={() => deleteTask()}>Delete</button>
//       {/* <button className='pattyBtn'>Edit</button> */}
//   </div>
// )
// }

function TodoForm() {
  const [newTask, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  function Todo(props) {
    function deleteTask(){
        console.log(props.taskKey)
        const newArray = tasks.filter(task => task.id !== props.taskKey);
        setTasks(newArray);
    }
  return (
    <div className="patty">
        <input type="checkbox"></input>
        <h4>{props.value}</h4>
        <button className='pattyBtn' onClick={() => deleteTask()}>Delete</button>
        {/* <button className='pattyBtn'>Edit</button> */}
    </div>
  )
  }
  function addTask(){

    if(!newTask){
      alert("Task can not be empty. Please enter a task!")
      return;
    }

    console.log(newTask);
    const task = {
      id: Math.floor(Math.random()*1000),
      value: newTask
    };

    setTasks(oldList => [...oldList, task]);

    setTask("");
    console.log(tasks);
  }

  return (<>
    <div className='form'>
        <input type="text" placeholder='Type here' value={newTask} onChange={e => setTask(e.target.value)}></input>
        <button onClick={()=>addTask()}>Submit</button>
    </div>
    <div>
      <Filter></Filter>
    </div>
    <div>
    {tasks.map(task =>{
            return (
              <Todo taskKey={task.id} value ={task.value}></Todo>
            )
          })}
    </div>
          
    </>
  )
}


export default TodoForm;
