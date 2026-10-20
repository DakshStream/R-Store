import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { TaskService } from "src/app/task-list/task.service";
import { addTask, loadTaskFailure, loadTasks, loadTaskSuccess, removeTask } from "./task.actions";
import { catchError, from, map, of, switchMap, withLatestFrom } from "rxjs";
import { selectAllTasks } from "./task.selector";

@Injectable()
export class TaskEffects {
    constructor(private actions$: Actions, private store: Store<AppState>, private taskService: TaskService) { }

    loadTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTasks),
            switchMap(() =>
                from(this.taskService.getTasks()).pipe(
                    map((tasks) => loadTaskSuccess({ tasks })),
                    catchError((error) => of(loadTaskFailure({ error: error.message ?? 'Failed to load tasks' })))
                )
            )
        )
    );

    saveTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addTask, removeTask),
            withLatestFrom(this.store.select(selectAllTasks)),
            switchMap(([, tasks]) => from(this.taskService.saveTasks(tasks)))
        ),
        { dispatch: false }
    );
}