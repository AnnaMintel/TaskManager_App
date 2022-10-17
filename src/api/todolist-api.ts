import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '2074b33b-62a2-4086-9090-07cd61aeb41f'
    }
})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CommonResponceType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

export const todoApi = {
    getToDoLists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createToDo(title: string) {
        return instance.post<Array<CommonResponceType<{item: TodolistType}>>>('todo-lists', { title })
    },
    deleteToDo(todolistId: string) {
        return instance.delete<Array<CommonResponceType<{}>>>(`todo-lists/${todolistId}`)
    },
    updateToDoTitle(todolistId: string, title: string) {
        return instance.put<Array<CommonResponceType<{}>>>(`todo-lists/${todolistId}`, { title })
    }
}