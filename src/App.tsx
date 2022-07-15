import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskManager } from './TaskManager';

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    console.log(v1());
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
        { id: v1(), title: "learn JS", isDone: false },
        { id: v1(), title: "make makeUp", isDone: true },
        { id: v1(), title: "go for a walk", isDone: false }
    ])

    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter(task => task.id !== taskID) // true
        setTasks (filteredTasks)
        console.log(tasks)
    }

    function changeFilter(newFilterValue: FilterValuesType){
        setFilter(newFilterValue) 
    }

    function addTask(title: string){
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks);
        // setTasks([{id: v1(), title, isDone: false}, ...tasks]); // краткий вариант строк 35-41
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
                filter={filter}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}
export default App;