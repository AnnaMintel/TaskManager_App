import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { TaskManager } from './TaskManager';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { ChangeFilterTaskAC, ChangeTaskListHeaderAC, AddTaskListAC, RemoveTaskListAC, taskListReducer } from './state/todolist-reduces';
import { removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, tasksReducer } from './state/tasks-reduser';
import { AppRootStateType } from './state/store';

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TaskListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    // BLL:
     let taskLists = useSelector<AppRootStateType, TaskListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, taskListID: string) => {
        let action = removeTaskAC(taskID, taskListID)
        dispatch(action)
    }, [])
    const addTask = useCallback((title: string, taskListID: string) => {
        let action = addTaskAC(title, taskListID)
        dispatch(action)
    }, [])
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, taskListID: string) => {
        let action = changeTaskStatusAC(taskID, isDone, taskListID)
        dispatch(action)
    }, [])
    const changeTaskTitle = useCallback((taskID: string, newTitle: string, taskListID: string) => {
        let action = changeTaskTitleAC(taskID, newTitle, taskListID)
        dispatch(action)
    }, [])

    const changeFilter = useCallback((filter: FilterValuesType, taskListID: string) => {
        let action = ChangeFilterTaskAC(filter, taskListID)
        dispatch(action)
    }, [])
    const changeTaskListHeader = useCallback((newTitle: string, taskListID: string) => {
        let action = ChangeTaskListHeaderAC(newTitle, taskListID)
        dispatch(action)
    }, [])
    const removeTaskList = useCallback((taskListID: string) => {
        let action = RemoveTaskListAC(taskListID)
        dispatch(action)
    }, [])
    const addTaskList = useCallback((title: string) => {
        let action = AddTaskListAC(title)
        dispatch(action)
    }, [])

    //UI:
    const taskListComponents = taskLists.map(t => {
        return (
            <Grid item key={t.id}>
                <Paper elevation={6} style={{ padding: "20px" }}>
                    <TaskManager
                        key={t.id}
                        id={t.id}
                        filter={t.filter}
                        title={t.title}
                        tasks={tasks[t.id]}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        removeTaskList={removeTaskList}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskListHeader={changeTaskListHeader}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">LOgin</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "20px 0px" }}>
                    <AddItemForm addItem={addTaskList} />
                </Grid>
                <Grid container spacing={4}>
                    {taskListComponents}
                </Grid>
            </Container>
        </div>
    );
}
export default AppWithRedux;

