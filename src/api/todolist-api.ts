import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://annatodolist.herokuapp.com/',
    // withCredentials: true
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type TaskType = {
    todoListId: string
    id: string
    title: string   
}

export const todoApi = {
    // todolists
    getTodolists() {
        const promise = instance.get<TodolistType[]>('todo-lists');
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title: title });
        return promise;
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`);
        return promise;
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, { title: title });
        return promise;
    },

    // tasks
    getTasks(todolistId: string) {
        return instance.get<any>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title: title });
    },
    updateTask(todolistId: string, taskId: string, title: string, isDone: boolean) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, { title: title, isDone: isDone });
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    }
}
