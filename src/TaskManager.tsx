import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddItemForm } from './AddItemForm';
import { FilterValuesType, TaskType } from './App';
import { EditableSpan } from './EditableSpan';
import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { AppRootStateType } from './state/store';
import { TaskListType } from './AppWithReducers';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reduser';
import { ChangeFilterTaskAC, ChangeTaskListHeaderAC, RemoveTaskListAC } from './state/todolist-reduces';
import { Task } from './Task';

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

export const TaskManager = React.memo((
    { id, title, ...props }: TaskManagerType) => {
    console.log('todolist clicked')
    let task = useSelector<AppRootStateType, TaskListType>(state => {
        return state.todolists.filter(task => task.id === id)[0]
    })

    let dispatch = useDispatch();

    const addTask = useCallback((title: string) => dispatch(addTaskAC(title, id)), [id, props.addTask])

    const getTaskJSXElement = (task: TaskType) => {
        let taskClass = task.isDone === true ? "is-done" : ""

        return <Task task={task} id={id}/>

    }

    const onClickSetAllFilter = useCallback(() => dispatch(ChangeFilterTaskAC("all", id)), [id]);
    const onClickSetActiveFilter = useCallback(() => dispatch(ChangeFilterTaskAC("active", id)), [id]);
    const onClickSetCompletedFilter = useCallback(() => dispatch(ChangeFilterTaskAC("completed", id)), [id]);
    const removeWholeTaskList = useCallback( () => dispatch(RemoveTaskListAC(id)), [id]);
    const changeTaskListHeader = useCallback((title: string) => dispatch(ChangeTaskListHeaderAC(title, id)),
                                                                [dispatch, title, id ]);

    let allTaskManagerTasks = props.tasks;
    let tasksForTaskManager = allTaskManagerTasks;
    if (props.filter === "active") {
        tasksForTaskManager = allTaskManagerTasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTaskManager = allTaskManagerTasks.filter(t => t.isDone === true)
    }

    const tasks = tasksForTaskManager.map(getTaskJSXElement);

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTaskListHeader} />
                <IconButton onClick={removeWholeTaskList}>
                    <Delete />
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask} />

            <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                {tasks}
            </ul>
            <div>
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
})