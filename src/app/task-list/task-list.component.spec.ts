import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from '../store/task/task.reducer';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [StoreModule.forRoot({ tasks: taskReducer })]
    });

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a new task into store state', () => {
    let tasks: { taskName: string }[] = [];

    component.allTasks$.subscribe((value) => {
      tasks = value;
    });

    component.addTasks('Read a book');

    expect(tasks.some((task) => task.taskName === 'Read a book')).toBeTrue();
  });
});
