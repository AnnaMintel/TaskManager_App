import React, { useCallback, useEffect } from 'react'
import './App.css';
import { TaskType, Todolist } from './components/Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import {
    addTodolistsThunk,
    changeTodolistFilterAC,
    deleteTodolistsThunk,
    getTodolistsThunk,
    updateTodolistsThunk
} from './bll/todolists-reducer';
import { addTasksTC, deleteTasksTC, updateTasksTC } from './bll/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './bll/store'

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    _id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodolistsThunk());
    }, [dispatch])

    let todolistId1 = v1();
    let todolistId2 = v1();


    // tasks
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTasksTC(todolistId, title));
    }, [dispatch]);

    // const changeTaskTitle = useCallback((todolistId: string, id: string, title:string, isDone: boolean) => {
    //     dispatch(updateTasksTC(todolistId, id, title, isDone));
    // }, [dispatch]);

    
    // const changeStatus = useCallback(function (todolistId: string, id: string, title:string, isDone: boolean) {
    //     dispatch(updateTasksTC(todolistId, id, title, isDone));
    // }, [dispatch]);

    const updateTask = useCallback((todolistId: string, id: string, title:string, isDone: boolean) => {
        dispatch(updateTasksTC(todolistId, id, title, isDone));
    }, [dispatch]);

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTasksTC(todolistId, taskId));
    }, [dispatch]);


    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    // todolist
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistsThunk(title));
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistsThunk(todolistId));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistsThunk(todolistId, title));
    }, [dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="primary" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        TaskManager
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "20px"}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl._id];

                            return <Grid item key={tl._id}>
                                <Paper style={{ padding: "10px" }}>
                                    <Todolist
                                        _id={tl._id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        updateTask={updateTask}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
