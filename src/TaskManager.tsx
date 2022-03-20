import React from 'react';
import { FilterValuesType, TaskType } from './App';

type TaskManagerType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
}

export const TaskManager = (props: TaskManagerType) => {

    const tasks = props.tasks.map(task => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>X</button>
            </li>
        )
    });

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}