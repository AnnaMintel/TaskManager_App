import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType, TaskType } from './App';

type TaskManagerType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, taskListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, taskListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, taskListID: string) => void
    addTask: (title: string, taskListID: string) => void
    removeTaskList: (taskListID: string) => void
}

export const TaskManager = (props: TaskManagerType) => {
    const [title, setTitle] = useState<string>(" ");
    const [error, setError] = useState<boolean>(false)

    const getTaskJSXElement = (task: TaskType) => {
        let taskClass = task.isDone === true ? "is-done" : ""
        return (
            <li key={task.id} >
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)}
                />
                <span className={taskClass}>{task.title}</span>
                <button onClick={() => props.removeTask(task.id, props.id)}>X</button>
            </li>
        )
    }

    const tasks = props.tasks.map(getTaskJSXElement);

    const onClickAddTask = () => {
        const validatedTitle = title.trim()
        if (validatedTitle) {
            props.addTask(validatedTitle, props.id)
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

    const onClickSetAllFilter = () => props.changeFilter("all", props.id);
    const onClickSetActiveFilter = () => props.changeFilter("active", props.id);
    const onClickSetCompletedFilter = () => props.changeFilter("completed", props.id);
    const removeWholeTaskList = () => props.removeTaskList(props.id);

    return (
        <div>
            <h3>{props.title}<button onClick={removeWholeTaskList}>x</button></h3>
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