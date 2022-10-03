import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { EditableSpan } from './EditableSpan';
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reduser';

export type TaskType = {}

export const Task = React.memo(({ task, id }: any) => {

    const dispatch = useDispatch();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, id))

    const changeTaskTitle = (newTitle: string) => dispatch(changeTaskTitleAC(task.id, newTitle, id));

    const removeTask = () => dispatch(removeTaskAC(task.id, id));

    return (
        <li key={task.id} >
            <Checkbox
                color={"secondary"}
                checked={task.isDone}
                onChange={onChangeHandler}
            />
            <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
            <IconButton onClick={removeTask}>
                <Delete />
            </IconButton>
        </li>
    )
})





