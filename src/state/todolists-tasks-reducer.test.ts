import { AddTaskListAC, taskListReducer } from './todolist-reduces';
import { TaskListType, TasksStateType } from "../App";
import { tasksReducer } from './tasks-reduser';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TaskListType> = [];
 
    const action = AddTaskListAC("new todolist");
 
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = taskListReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
 
    expect(idFromTasks).toBe(action.todolistID);
    expect(idFromTodolists).toBe(action.todolistID);
 });
 