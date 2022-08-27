import { taskListReducer } from './todolist-reduces';
import {v1} from 'uuid';
import {TaskListType } from '../App';

test('correct tasklist should be removed', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   const startState: Array<TaskListType > = [
       {id: todolistId1, title: "What to learn", filter: "all"},
       {id: todolistId2, title: "What to buy", filter: "all"}
   ]

   const endState = taskListReducer(startState, { type: "REMOVE-TASKLIST", id: todolistId1})

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todolistId2);
});
