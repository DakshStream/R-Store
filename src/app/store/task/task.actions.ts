import { createAction, props } from "@ngrx/store";
import { Task } from "src/app/task-list/task.model";

export const addTask = createAction(
    '[Task] Add Task', //visible on Redux toolkit dev tool
    props<{ content: string }>()
);

export const removeTask = createAction(
    '[Task] Remove Task',
    props<{ index: number }>()
);

export const loadTasks = createAction('[Task] Load Tasks');

export const loadTaskSuccess = createAction(
    '[Task API] Task Load success',
    props<{ tasks: Task[] }>()
);

export const loadTaskFailure = createAction(
    '[Task] Taks Load failed',
    props<{ error: string }>()
);