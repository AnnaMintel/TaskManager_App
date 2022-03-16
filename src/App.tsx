import React from 'react';
import './App.css';
import { TaskManager } from "./TaskManager"; 

export type TaskType = {
    title: string
    id: number
    isDone: boolean
}

function App() {
    // BLL: business logic lair
    let tasks: Array<TaskType> = [
        {title: "learn JS", id: 1, isDone: false},  
        {title: "make makeUp", id: 2, isDone: true}, 
        {title: "go for a walk", id: 3, isDone: false}
    ];

    function removeTask(taskID: number) {
        const filteredTasks = tasks.filter(t => t.id !== taskID) // true
        tasks = filteredTasks
        console.log(tasks)
    }
    
    //UI:
    return (
        <div className="App">
           <TaskManager title={"Today's tasks"} tasks={tasks}/>

           {/* <TaskManager title={"English learning tasks"} tasks={tasksTwo}/> */}
        </div>
    );
}
export default App;