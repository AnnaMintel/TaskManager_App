import React, { useState } from 'react';
import './App.css';
import { TaskManager } from './TaskManager';

export type TaskType = {
    title: string
    id: number
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
        { id: 1, title: "learn JS", isDone: false },
        { id: 2, title: "make makeUp", isDone: true },
        { id: 3, title: "go for a walk", isDone: false }
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(taskID: number) {
        const filteredTasks = tasks.filter(task => task.id !== taskID) // true
        setTasks (filteredTasks)
        console.log(tasks)
    }

    function changeFilter(newFilterValue: FilterValuesType){
        setFilter(newFilterValue) 
    }

    let tasksForTaskManager = tasks
    if(filter === "active"){
        tasksForTaskManager = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed"){
        tasksForTaskManager = tasks.filter(t => t.isDone === true)
    }

    //UI:
    return (
        <div className="App">
            <TaskManager 
                title={"Today's tasks"}
                tasks={tasksForTaskManager}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}
export default App;