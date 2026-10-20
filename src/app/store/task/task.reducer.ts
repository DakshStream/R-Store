import { createReducer, on } from "@ngrx/store";
import { Task } from "src/app/task-list/task.model";
import { addTask, loadTaskFailure, loadTasks, loadTaskSuccess, removeTask } from "./task.actions";

export interface TaskState {
    tasks: Task[];
    error: any;
    status: 'pending' | 'loading' | 'error' | 'success';
}

export const intialState: TaskState = {
    tasks: [],
    error: null,
    status: 'pending'
};

export const taskReducer = createReducer(
    intialState,
    on(addTask, (state, { content }) => ({
        ...state,
        tasks: [...state.tasks, { taskName: content }],
        status: 'success' as const
    })),
    on(removeTask, (state, { index }) => ({
        ...state,
        tasks: state.tasks.filter((_, taskIndex) => taskIndex !== index),
        status: 'success' as const
    })),
    on(loadTasks, (state) => ({ ...state, status: 'loading' as const })),
    on(loadTaskSuccess, (state, { tasks }) => ({
        ...state,
        tasks,
        error: null,
        status: 'success' as const
    })),
    on(loadTaskFailure, (state, { error }) => ({
        ...state,
        error,
        status: 'error' as const
    }))
);