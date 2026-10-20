import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { addTask, loadTasks, removeTask } from '../store/task/task.actions';
import { selectAllTasks } from '../store/task/task.selector';
import { Task } from './task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {
  taskInput = '';

  // Store-driven state only
  public allTasks$!: Observable<Task[]>;

  // Deprecated direct localStorage logic intentionally kept for reference only.
  // private readonly storageKey = 'task-list-data';
  // private readonly tasksFilePath = 'assets/tasks.json';

  constructor(private store: Store<AppState>) {
    this.allTasks$ = this.store.select(selectAllTasks);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }

  addTasks(taskText: string): void {
    const value = taskText.trim();

    if (!value) {
      return;
    }

    this.taskInput = '';
    this.store.dispatch(addTask({ content: value }));
  }

  removeTask(index: number): void {
    this.store.dispatch(removeTask({ index }));
  }

  // Deprecated direct localStorage logic intentionally kept for reference only.
  // private loadTasksFromFile(): void {
  //   this.http.get<string[]>(this.tasksFilePath).subscribe({
  //     next: (tasks) => {
  //       this.tasksList = tasks || [];
  //       this.saveTasks();
  //     },
  //     error: () => {
  //       this.tasksList = [];
  //     }
  //   });
  // }
  //
  // private saveTasks(): void {
  //   localStorage.setItem(this.storageKey, JSON.stringify(this.tasksList));
  // }
}
