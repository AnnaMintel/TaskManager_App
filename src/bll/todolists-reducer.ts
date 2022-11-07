import { Dispatch } from 'redux';
import { v1 } from 'uuid';
import { todoApi } from '../api/todolist-api';
import { FilterValuesType, TodolistType } from '../App';
import { getTasksTC } from './tasks-reducer';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    _id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    _id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    _id: string
    filter: FilterValuesType
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        // get
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        // post
        case 'ADD-TODOLIST': {
            return [{
                _id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
        }
        // update (put)
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl._id === action._id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl._id === action._id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        //delete
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl._id !== action._id)
        }
        default:
            return state;
    }
}

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return { type: 'SET-TODOLISTS', todolists }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: v1() }
}

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', _id: todolistId, title: title }
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', _id: id, filter: filter }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', _id: todolistId }
}

//thunk
// get
export const getTodolistsThunk = () => async (dispatch: Dispatch) => {
    const res = await todoApi.getTodolists()
    //@ts-ignore
    res.data.map((el: any) => dispatch(getTasksTC(el._id)))
    //@ts-ignore
    dispatch(setTodolistsAC(res.data))
}
// post
export const addTodolistsThunk = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todoApi.createTodolist(title)
            .then((res: any) => {
                dispatch(addTodolistAC(title))
            })
    }
}
// export const addTodolistsThunk = (title: string) => {
//     return (dispatch: Dispatch<ActionsType>) => {
//         todoApi.createTodolist(title)
//             .then((res: any) => {
//                 dispatch(addTodolistAC(title))
//             })
//     }
// }


// put
export const updateTodolistsThunk = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todoApi.updateTodolist(todolistId, title)
            .then((res: any) => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
    }
}
// delete
export const deleteTodolistsThunk = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todoApi.deleteTodolist(todolistId)
            .then((res: any) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

