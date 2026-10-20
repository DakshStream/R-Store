import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }

  async getTasks(): Promise<Task[]> {
    const storedData = await localStorage.getItem('task-list-data');

    if (storedData) {
      return this.normalizeTasks(JSON.parse(storedData));
    }

    const fileTasks = await firstValueFrom(this.http.get<string[]>('assets/tasks.json'));
    const normalizedTasks = this.normalizeTasks(fileTasks || []);

    localStorage.setItem('task-list-data', JSON.stringify(normalizedTasks));
    return normalizedTasks;
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    const normalizedTasks = this.normalizeTasks(tasks as any);
    localStorage.setItem('task-list-data', JSON.stringify(normalizedTasks));
  }

  private normalizeTasks(tasks: Array<string | Task>): Task[] {
    return tasks
      .map((task) => typeof task === 'string' ? { taskName: task } : { taskName: task.taskName })
      .filter((task) => !!task.taskName);
  }
}

// Deprecated code kept for reference only:
// async getTasks(): Promise<any> {
//   const data = await localStorage.getItem('task-list-data');
//   return data ? JSON.parse(data) : null;
// }
//
// async saveTasks(tasks: Task[]) {
//   const data = await localStorage.getItem('task-list-data');
//   if (data) {
//     return localStorage.setItem('task-list-data', JSON.stringify(tasks));
//   }
// }
