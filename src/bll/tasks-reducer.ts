import { TaskType } from '../components/Todolist';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';
import { TasksStateType } from '../App';
import { todoApi } from '../api/todolist-api';
import { Dispatch } from 'redux';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: any
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
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
            const newTask: TaskType = {
                todolistId: v1(),
                title: action.title,
                isDone: false
            }
            //@ts-ignore
            const tasks = stateCopy[action.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.todolistId === action.taskId ? { ...t, title: action.title } : t);

            state[action.todolistId] = newTasksArray;
            return ({ ...state });
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.todolistId === action.taskId ? { ...t, isDone: action.isDone } : t);

            state[action.todolistId] = newTasksArray;
            return ({ ...state });
        }
        case 'REMOVE-TASK': {
            const stateCopy = { ...state }
            const tasks = stateCopy.tasks[action.todolistId];
            //@ts-ignore
            const newTasks = tasks.filter((t: any) => t.todolistId !== action.taskId);
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
export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return { type: 'ADD-TASK', todolistId, title }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId }
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', todolistId, taskId, title }
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId }
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
    let res = await todoApi.createTask(todolistId, title)
    dispatch(addTaskAC(todolistId, title))
}

// put
export const updateTasksTC = (todolistId: string, taskId: string, title: string) =>
    async (dispatch: Dispatch<ActionsType>) => {
        let res = await todoApi.updateTask(todolistId, taskId, title)
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }

// delete
export const deleteTasksTC = (todolistId: string, taskId: string) => async (dispatch: Dispatch<ActionsType>) => {
    let res = await todoApi.deleteTask(todolistId, taskId)
    dispatch(removeTaskAC(todolistId, taskId))
}


