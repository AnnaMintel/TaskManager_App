import React from 'react';
import { TaskType } from './App';

type TaskManagerType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
}

export const TaskManager = (props: TaskManagerType) => {

    const tasks = props.tasks.map(task => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => { props.removeTask(task.id); console.log('as') }}>X</button>
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
                {/* <li>
                <input type="checkbox" checked={props.tasks[0].isDone} />
                <span>{props.tasks[0].title}</span>
            </li>
            <li>
                <input type="checkbox" checked={props.tasks[1].isDone} />
                <span>{props.tasks[1].title}</span>
            </li>
            <li>
                <input type="checkbox" checked={props.tasks[2].isDone} />
                <span>{props.tasks[2].title}</span>
            </li> */}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}