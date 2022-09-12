import { v1 } from "uuid";
import { FilterValuesType, TaskListType, TasksStateType, TaskType } from "../App";
import { AddTaskListActionType, RemoveTaskListActionType } from "./todolist-reduces";

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    taskID: string,
    todolistID: string
}

export type AddTaskActionType = {
    type: 'ADD_TASK',
    title: string,
    todolistID: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE_STATUS'
    taskID: string,
    todolistID: string,
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TITLE',
    taskID: string,
    title: string,
    todolistID: string
}

export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTaskListActionType
    | RemoveTaskListActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            let copyState = { ...state }
            copyState[action.todolistID] = copyState[action.todolistID]
                .filter(task => task.id !== action.taskID)
            return copyState;
        }
        case 'ADD_TASK': {
            let newTask: TaskType = { id: v1(), title: action.title, isDone: false }
            return { ...state, [action.todolistID]: [newTask, ...state[action.todolistID]] }
        }
        case 'CHANGE_STATUS': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => {
                    if (task.id === action.taskID) {
                        return { ...task, isDone: action.isDone }
                    } else {
                        return task
                    }
                })
            }
        }
        case 'CHANGE_TITLE': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => {
                    if (task.id === action.taskID) {
                        return { ...task, title: action.title }
                    } else {
                        return task
                    }
                })
            }
        }
        case "ADD-TASKLIST":
            let todolistID = action.todolistID
            return { ...state, [todolistID]: [] }
        case "REMOVE-TASKLIST": {
            let copyState = { ...state }
            delete copyState[action.id]
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return { type: 'REMOVE_TASK', taskID, todolistID }
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return { type: 'ADD_TASK', title, todolistID }
}
export const changeTaskStatusAC = (taskID: string, todolistID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return { type: 'CHANGE_STATUS', taskID, todolistID, isDone }
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE_TITLE', taskID, todolistID, title }
}


