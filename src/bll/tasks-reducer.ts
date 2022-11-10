import { TaskType } from '../components/Todolist';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';
import { TasksStateType } from '../App';
import { todoApi } from '../api/todolist-api';
import { Dispatch } from 'redux';
import { useSelector } from 'react-redux';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    _id: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string
    newTask: any
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    _id: string
    title: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    _id: string
    title: string
    isDone: boolean
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {

    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = { ...state }
            const newTask: any = action.newTask;
            const tasks = stateCopy[action.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t._id === action._id ? { ...t, title: action.title } : t);

            state[action.todolistId] = newTasksArray;
            return ({ ...state });
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t._id === action._id ? { ...t, isDone: action.isDone } : t);

            state[action.todolistId] = newTasksArray;
            return ({ ...state });
        }
        case 'REMOVE-TASK': {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter((t: any) => t._id !== action._id);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const copyState = { ...state };
            delete copyState[action._id];
            return copyState;
        }
        default:
            return state;
    }
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return { type: 'SET-TASKS', tasks, todolistId }
}
export const addTaskAC = (todolistId: string, newTask: any): AddTaskActionType => {
    return { type: 'ADD-TASK', todolistId, newTask }
}
export const changeTaskStatusAC = (todolistId: string, _id: string, title: string, isDone: boolean): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', todolistId, _id, title, isDone }
}
export const changeTaskTitleAC = (todolistId: string, _id: string, title: string, isDone: boolean): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', todolistId, _id, title, isDone }
}
export const removeTaskAC = (todolistId: string, _id: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, _id }
}

//thunk
// get
export const getTasksTC = (_id: string) => async (dispatch: Dispatch<ActionsType>) => {
    let res = await todoApi.getTasks(_id)
    const tasks = res.data
    const action = setTasksAC(tasks, _id)
    dispatch(action)
}

// post
export const addTasksTC = (todolistId: string, title: string) => async (dispatch: Dispatch<ActionsType>) => {
    await todoApi.createTask(todolistId, title).then(response =>
        dispatch(addTaskAC(todolistId, response.data))).catch(err => console.log(err))
}

// put
export const updateTasksTC = (todolistId: string, _id: string, title: string, isDone: boolean) =>
    async (dispatch: any) => {
        await todoApi.updateTask(todolistId, _id, title, isDone).then((response: any )=> {
            dispatch(changeTaskTitleAC(todolistId, _id, title, isDone))
            dispatch(changeTaskStatusAC(todolistId, _id, title, isDone))
        }).catch(err => console.log(err))
    }

// delete
export const deleteTasksTC = (todolistId: string, taskId: string) => async (dispatch: Dispatch<ActionsType>) => {
    let res = await todoApi.deleteTask(todolistId, taskId)
    dispatch(removeTaskAC(todolistId, taskId))
}


