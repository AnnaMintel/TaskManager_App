
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterValuesType, TaskType } from './App';
import { EditableSpan } from './EditableSpan';
import { Button, Checkbox,  IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

type TaskManagerType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, taskListID: string) => void
    removeTask: (taskID: string, taskListID: string) => void
    removeTaskList: (taskListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, taskListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, taskListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, taskListID: string) => void
    changeTaskListHeader: (newTitle: string, taskListID: string) => void
}

export const TaskManager = (props: TaskManagerType) => {

    const addTask = (title: string) => props.addTask(title, props.id);

    const getTaskJSXElement = (task: TaskType) => {
        let taskClass = task.isDone === true ? "is-done" : ""
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(task.id, newTitle, props.id)
        }
        const removeTask = () => props.removeTask(task.id, props.id)

        return (
            <li key={task.id} >
                <Checkbox
                color={"secondary"}
                checked={task.isDone}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)}
                />
                <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
                <IconButton onClick={removeTask}>
                    <Delete />
                </IconButton>
            </li>
        )
    }
    const onClickSetAllFilter = () => props.changeFilter("all", props.id);
    const onClickSetActiveFilter = () => props.changeFilter("active", props.id);
    const onClickSetCompletedFilter = () => props.changeFilter("completed", props.id);
    const removeWholeTaskList = () => props.removeTaskList(props.id);
    const changeTaskListHeader = (title: string) => props.changeTaskListHeader(title, props.id)
    

    const tasks = props.tasks.map(getTaskJSXElement);

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTaskListHeader} />
                <IconButton onClick={removeWholeTaskList}>
                    <Delete />
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask} />

            <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                {tasks}
            </ul><div>
                <Button
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    size={"small"}
                    onClick={onClickSetAllFilter}>All
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    size={"small"}
                    onClick={onClickSetActiveFilter}>Active
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    size={"small"}
                    onClick={onClickSetCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}