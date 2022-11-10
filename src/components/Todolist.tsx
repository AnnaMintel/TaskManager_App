import React, { useCallback, useState } from 'react'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { Task } from './Task'
import { FilterValuesType } from '../App';
import { getTodolistsThunk } from '../bll/todolists-reducer'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../bll/store'

export type TaskType = {
    todolistId: string
    _id: string
    title: string
    isDone: boolean
}

type PropsType = {
    _id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    updateTask: (todolistId: string, _id: string, newTitle: string, isDone: boolean) => void
    removeTask: (todolistId: string, _id: string) => void
    removeTodolist: (_id: string) => void
    changeTodolistTitle: (_id: string, newTitle: string) => void
    filter: FilterValuesType

}

export const Todolist = React.memo(function (props: PropsType) {

    const tasks = useSelector<AppRootStateType, any>(state => state.tasks);

    const filteredTasks = props.filter === "active" ? tasks[props._id].filter((t: any) => t.isDone === false) : props.filter === "completed" ? tasks[props._id].filter((t: any) => t.isDone === true) : tasks[props._id];

    const addTask = useCallback((title: string) => {
        props.addTask(props._id, title)
    }, [props.addTask, props._id])

    const removeTodolist = () => {
        props.removeTodolist(props._id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props._id, title)
    }, [props._id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() =>
        props.changeFilter('all', props._id), [props._id, props.changeFilter])
    const onActiveClickHandler = useCallback(() =>
        props.changeFilter('active', props._id), [props._id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() =>
        props.changeFilter('completed', props._id), [props._id, props.changeFilter])

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <div>
            {
                filteredTasks?.map((t: any) => <Task key={t._id} task={t} todolistId={props._id}
                    _id={t._id} title={t.title} isDone={t.isDone}
                    updateTask={props.updateTask}
                    removeTask={props.removeTask}
                />)
            }
        </div>
        <div style={{ paddingTop: '10px' }}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'default'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})

