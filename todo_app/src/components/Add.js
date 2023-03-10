import { useState } from "react";
import Task from "./Task"
let taskArr = []
function Add(){
    const [task, setTask] = useState('');
    const [newTask, setNew] = useState(task);
    // let taskArr = []

    const handleChange = (event) => {
        setTask(event.target.value);
    }

    const addClick = () => {
        setNew(task);
        console.log(task);
        taskArr.push(task);
        console.log(taskArr);
    }
    const deleteClick = () => {
        setNew(task);
        console.log(task);
        taskArr.pop();
        console.log(taskArr);
    }
    return(
        <div>
            <input type="text" id="task" name="task" onChange={handleChange} value={task}></input>
            <p>{newTask}</p>
            <Task></Task>
            <button onClick={addClick}>Add</button>
            <button onClick={deleteClick}>Delete</button>
        </div>
    )
}
export default Add;