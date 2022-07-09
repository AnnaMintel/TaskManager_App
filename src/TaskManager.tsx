import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType, TaskType } from './App';

type TaskManagerType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
}

export const TaskManager = (props: TaskManagerType) => {
    const [title, setTitle] = useState<string>(" ");
    const tasks = props.tasks.map(task => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>X</button>
            </li>
        )
    });
    const onClickAddTask = () => { props.addTask(title), setTitle(" ") }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => { 
        if (e.key === "Enter") { onClickAddTask(); } }
    const onClickSetAllFilter = () => props.changeFilter("all");
    const onClickSetActiveFilter = () => props.changeFilter("active");
    const onClickSetCompletedFilter = () => props.changeFilter("completed");

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div><ul>
                {tasks}
            </ul><div>
                <button onClick={onClickSetAllFilter }>All</button>
                <button onClick={onClickSetActiveFilter }>Active</button>
                <button onClick={onClickSetCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}