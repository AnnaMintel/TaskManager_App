import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType, TaskType } from './App';

type TaskManagerType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export const TaskManager = (props: TaskManagerType) => {
    const [title, setTitle] = useState<string>(" ");
    const [error, setError] = useState<boolean>(false)
    const tasks = props.tasks.map(task => {
        let taskClass = task.isDone === true ? "is-done" : ""
        return (
            <li key={task.id} >
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                        props.changeTaskStatus(task.id, e.currentTarget.checked)}
                />
                <span className={taskClass}>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>X</button>
            </li>
        )
    });
    const onClickAddTask = () => {
        const validatedTitle = title.trim()
        if (validatedTitle) {
            props.addTask(validatedTitle)
        } else {
            setError(true)
        }
        setTitle(" ")
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") { onClickAddTask(); }
    }

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
                    className={error ? "error" : ""}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={{ color: "red" }}>Title is required!</div>}
            </div><ul>
                {tasks}
            </ul><div>
                <button
                    className={props.filter === "all" ? "activeFilter" : ""}
                    onClick={onClickSetAllFilter}>All
                </button>
                <button
                    className={props.filter === "active" ? "activeFilter" : ""}
                    onClick={onClickSetActiveFilter}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "activeFilter" : ""}
                    onClick={onClickSetCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}