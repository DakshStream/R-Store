import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { TaskState } from "./task.reducer";

export const selectTasks = (state: AppState) => state.tasks; //select particular from the universal state

export const selectAllTasks = createSelector(
    selectTasks, //always point to the current, inout selector -> takes the slice from universal set
    (state: TaskState) => state.tasks //point to the exact property we require from the slice
);