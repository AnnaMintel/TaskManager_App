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

type TaskListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    // 
    const taskListID_1 = v1()
    const taskListID_2 = v1()
    const [lists, setLists] = useState<Array<TaskListType>>([
        { id: taskListID_1, title: "What to do", filter: "all" },
        { id: taskListID_2, title: "What to buy", filter: "all" },
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [taskListID_1]: [
            { id: v1(), title: "learn JS", isDone: false },
            { id: v1(), title: "make makeUp", isDone: true },
            { id: v1(), title: "run", isDone: false }
        ],
        [taskListID_2]: [
            { id: v1(), title: "bear", isDone: false },
            { id: v1(), title: "fish", isDone: true },
            { id: v1(), title: "meat", isDone: false }
        ]
    })

    function removeTask(taskID: string, taskListID: string) {
        tasks[taskListID] = tasks[taskListID].filter(task => task.id !== taskID)
        setTasks({...tasks})
    }
    function addTask(title: string, taskListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            // title: title - более длинный вариант строки выше, если название совпадает
            isDone: false
        }
        tasks[taskListID] = [newTask, ...tasks[taskListID]]
        setTasks({ ...tasks });
    }
    function changeTaskStatus(taskID: string, isDone: boolean, taskListID: string) {
        tasks[taskListID] = tasks[taskListID].map(t => t.id === taskID ? { ...t, isDone: isDone } : t)
        setTasks({ ...tasks })
    }
    function changeFilter(filter: FilterValuesType, taskListID: string) {
        setLists(lists.map(t => t.id === taskListID ? { ...t, filter: filter } : t))
    }
    const removeTaskList = (taskListID: string) => {
        setLists(lists.filter(t => t.id === taskListID))
        const copyTasks = { ...tasks }
        delete copyTasks[taskListID]
        setTasks(copyTasks)
    }

    //UI:
    const taskListComponents = lists.map(t => {
        let tasksForTaskManager = tasks[t.id]
        if (t.filter === "active") {
            tasksForTaskManager = tasks[t.id].filter(t => t.isDone === false)
        }
        if (t.filter === "completed") {
            tasksForTaskManager = tasks[t.id].filter(t => t.isDone === true)
        }

        return (
            <TaskManager
                key={t.id}
                id={t.id}
                filter={t.filter}
                title={t.title}
                tasks={tasksForTaskManager}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                removeTaskList={removeTaskList}
                changeTaskStatus={changeTaskStatus}
            />
        )
    })

    return (
        <div className="App">
            {taskListComponents}
        </div>
    );
}
export default App;