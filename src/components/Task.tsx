import React, { ChangeEvent, useCallback } from 'react'
import { Checkbox, IconButton } from '@material-ui/core'
import { EditableSpan } from './EditableSpan'
import { Delete } from '@material-ui/icons'
import { TaskType } from './Todolist'

type TaskPropsType = {
    task: TaskType
    taskId: string
    todolistId: string
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (todolistId: string, taskId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = useCallback(() =>
        props.removeTask(props.task.todolistId, props.taskId),
        [props.task.todolistId, props.taskId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.todolistId, newIsDoneValue, props.taskId)
    }, [props.task.todolistId, props.taskId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.todolistId, newValue, props.taskId)
    }, [props.task.todolistId, props.taskId]);

    return <div key={props.task.todolistId} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})
