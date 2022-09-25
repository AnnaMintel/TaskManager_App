import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { TaskManager } from './TaskManager';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { ChangeFilterTaskAC, ChangeTaskListHeaderAC, AddTaskListAC, RemoveTaskListAC, taskListReducer } from './state/todolist-reduces';
import { removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, tasksReducer } from './state/tasks-reduser';

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

function AppWithReducers() {
    // BLL:
    const taskListID_1 = v1()
    const taskListID_2 = v1()
    const [lists, dispatchLists] = useReducer(taskListReducer, [
        { id: taskListID_1, title: "What to do", filter: "all" },
        { id: taskListID_2, title: "What to buy", filter: "all" },
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [taskListID_1]: [
            { id: v1(), title: "learn JS", isDone: false },
            { id: v1(), title: "make makeUp", isDone: true },
            { id: v1(), title: "run", isDone: false }
        ],
        [taskListID_2]: [
            { id: v1(), title: "bear", isDone: false },
            { id: v1(), title: "fish", isDone: true },
            { id: v1(), title: "meat", isDone: false }
        ]
    })


    function removeTask(taskID: string, taskListID: string) {
        let action = removeTaskAC(taskID, taskListID)
        dispatchTasks(action)

        // tasks[taskListID] = tasks[taskListID].filter(task => task.id !== taskID)
        // setTasks({ ...tasks })
    }
    function addTask(title: string, taskListID: string) {
        // const newTask: TaskType = {
        //     id: v1(),
        //     title,
        //     // title: title - более длинный вариант строки выше, если название совпадает
        //     isDone: false
        // }

        let action = addTaskAC(title, taskListID)
        dispatchTasks(action)

        // tasks[taskListID] = [newTask, ...tasks[taskListID]]
        // setTasks({ ...tasks });
    }
    function changeTaskStatus(taskID: string, isDone: boolean, taskListID: string) {
        let action = changeTaskStatusAC(taskID, isDone, taskListID)
        dispatchTasks(action)
        // tasks[taskListID] = tasks[taskListID].map(t => t.id === taskID ? { ...t, isDone: isDone } : t)
        // setTasks({ ...tasks })
    }
    function changeTaskTitle(taskID: string, newTitle: string, taskListID: string) {
        let action = changeTaskTitleAC(taskID, newTitle, taskListID)
        dispatchTasks(action)
        // tasks[taskListID] = tasks[taskListID].map(t => t.id === taskID ? { ...t, title: newTitle } : t)
        // setTasks({ ...tasks })
    }


    function changeFilter(filter: FilterValuesType, taskListID: string) {
        let action = ChangeFilterTaskAC(filter, taskListID)
        dispatchLists(action)
        // setLists(lists.map(t => t.id === taskListID ? { ...t, filter: filter } : t))
    }
    function changeTaskListHeader(newTitle: string, taskListID: string) {
        let action = ChangeTaskListHeaderAC(newTitle, taskListID)
        dispatchLists(action)
        // setLists(lists.map(t => t.id === taskListID ? { ...t, title: newTitle } : t))
    }
    function removeTaskList(taskListID: string) {
        let action = RemoveTaskListAC(taskListID)
        dispatchLists(action)
        dispatchTasks(action)
        // setLists(lists.filter(t => t.id !== taskListID))
        // const copyTasks = { ...tasks }
        // delete copyTasks[taskListID]
        // setTasks(copyTasks)
    }
    function addTaskList(title: string) {
        let action = AddTaskListAC(title)
        dispatchLists(action)
        dispatchTasks(action)
        // const newTaskListID = v1();
        // const newtaskList: TaskListType = { id: newTaskListID, title, filter: 'all' }
        // setLists([...lists, newtaskList])
        // setTasks({ ...tasks, [newTaskListID]: [] })
    }

    //UI:
    const taskListComponents = lists.map(t => {
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
export default AppWithReducers;

function setTasks(arg0: { [key: string]: import("./App").TaskType[]; }) {
    throw new Error('Function not implemented.');
}
