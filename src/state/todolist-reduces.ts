import { v1 } from "uuid";
import { FilterValuesType, TaskListType } from "../App";

export type RemoveTaskListActionType = {
    type: "REMOVE-TASKLIST"
    id: string
}

export type AddTaskListActionType = {
    type: "ADD-TASKLIST"
    title: string
}

export type ChangeTaskListHeaderActionType = {
    type: "CHANGEHEADER-TASKLIST"
    title: string
    id: string
}

export type ChangeFilterTaskListActionType = {
    type: "CHANGEFILTER-TASKLIST"
    filter: FilterValuesType
    id: string
}

export type ActionType = RemoveTaskListActionType | AddTaskListActionType |
    ChangeTaskListHeaderActionType | ChangeFilterTaskListActionType

export const taskListReducer = (state: Array<TaskListType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASKLIST":
            return state.filter(t => t.id !== action.id)
        case "ADD-TASKLIST":
            const newTaskListID = v1();
            const newtaskList: TaskListType = { id: newTaskListID, title: action.title, filter: 'all' }
            return [...state, newtaskList]
        case "CHANGEHEADER-TASKLIST":
            return state.map(t => t.id === action.id ? { ...t, title: action.title } : t)
        case "CHANGEFILTER-TASKLIST":
            return state.map(t => t.id === action.id ? { ...t, filter: action.filter } : t)

        default:
            return state
    }
}

export const RemoveTaskListAC = (id: string): RemoveTaskListActionType => {
    return { type: "REMOVE-TASKLIST", id: id }
}
export const AddTaskListAC = (title: string): AddTaskListActionType => {
    return { type: "ADD-TASKLIST", title: title }
}
export const ChangeTaskListHeaderAC = (title: string, id: string): ChangeTaskListHeaderActionType => {
    return { type: "CHANGEHEADER-TASKLIST", title: title, id: id }
}
export const ChangeFilterTaskAC = (filter: FilterValuesType, id: string): ChangeFilterTaskListActionType => {
    return { type: "CHANGEFILTER-TASKLIST", filter: filter, id: id }
}