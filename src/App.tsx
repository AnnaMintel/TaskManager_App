import React, { useState } from 'react';
import './App.css';
import { TaskManager } from './TaskManager';

export type TaskType = {
    title: string
    id: number
    isDone: boolean
}

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
        { id: 1, title: "learn JS", isDone: false },
        { id: 2, title: "make makeUp", isDone: true },
        { id: 3, title: "go for a walk", isDone: false }
    ])

    function removeTask(taskID: number) {
        const filteredTasks = tasks.filter(task => task.id !== taskID) // true
        setTasks (filteredTasks)
        console.log(tasks)
    }

    //UI:
    return (
        <div className="App">
            <TaskManager
                title={"Today's tasks"}
                tasks={tasks}
                removeTask={removeTask}
            />

            {/* <TaskManager title={"English learning tasks"} tasks={tasksTwo}/> */}
        </div>
    );
}
export default App;