import React from 'react';
import './App.css';
import { TaskManager } from "./TaskManager"; 

export type TaskType = {
    title: string
    id: number
    isDone: boolean
}


function App() {
    const tasksOne: Array<TaskType> = [
        {title: "learn JS", id: 1, isDone: false}, 
        {title: "make makeUp", id: 2, isDone: true}, 
        {title: "go for a walk", id: 3, isDone: false}
    ];
    const tasksTwo: Array<TaskType> = [
        {title: "write essay", id: 1, isDone: false}, 
        {title: "learn 15 words", id: 2, isDone: true}, 
        {title: "make training IELTS test", id: 3, isDone: true}
    ];
    
    return (
        <div className="App">
           <TaskManager title={"Today's tasks"} tasks={tasksOne}/>
           <TaskManager title={"English learning tasks"} tasks={tasksTwo}/>
        </div>
    );
}
export default App;