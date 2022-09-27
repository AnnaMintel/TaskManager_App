import React from 'react';
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
    // const taskListID_1 = v1()
    // const taskListID_2 = v1()
    // const [lists, dispatchLists] = useReducer(taskListReducer, [
    //     { id: taskListID_1, title: "What to do", filter: "all" },
    //     { id: taskListID_2, title: "What to buy", filter: "all" },
    // ])

    // const [tasks, dispatchTasks] = useReducer(tasksReducer, {
    //     [taskListID_1]: [
    //         { id: v1(), title: "learn JS", isDone: false },
    //         { id: v1(), title: "make makeUp", isDone: true },
    //         { id: v1(), title: "run", isDone: false }
    //     ],
    //     [taskListID_2]: [
    //         { id: v1(), title: "bear", isDone: false },
    //         { id: v1(), title: "fish", isDone: true },
    //         { id: v1(), title: "meat", isDone: false }
    //     ]
    // })

    let taskLists = useSelector<AppRootStateType, TaskListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    function removeTask(taskID: string, taskListID: string) {
        let action = removeTaskAC(taskID, taskListID)
        dispatch(action)
    }
    function addTask(title: string, taskListID: string) {
        let action = addTaskAC(title, taskListID)
        dispatch(action)
    }
    function changeTaskStatus(taskID: string, isDone: boolean, taskListID: string) {
        let action = changeTaskStatusAC(taskID, isDone, taskListID)
        dispatch(action)
    }
    function changeTaskTitle(taskID: string, newTitle: string, taskListID: string) {
        let action = changeTaskTitleAC(taskID, newTitle, taskListID)
        dispatch(action)
    }


    function changeFilter(filter: FilterValuesType, taskListID: string) {
        let action = ChangeFilterTaskAC(filter, taskListID)
        dispatch(action)
    }
    function changeTaskListHeader(newTitle: string, taskListID: string) {
        let action = ChangeTaskListHeaderAC(newTitle, taskListID)
        dispatch(action)
    }
    function removeTaskList(taskListID: string) {
        let action = RemoveTaskListAC(taskListID)
        dispatch(action)
    }
    function addTaskList(title: string) {
        let action = AddTaskListAC(title)
        dispatch(action)
    }

    //UI:
    const taskListComponents = taskLists.map(t => {
        let tasksForTaskManager = tasks[t.id]
        if (t.filter === "active") {
            tasksForTaskManager = tasks[t.id].filter(t => t.isDone === false)
        }
        if (t.filter === "completed") {
            tasksForTaskManager = tasks[t.id].filter(t => t.isDone === true)
        }

        return (
            <Grid item key={t.id}>
                <Paper elevation={6} style={{ padding: "20px" }}>
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

