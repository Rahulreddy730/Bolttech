import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { TODO, Project } from '../projectslist/project'
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  @Input() toDo: TODO;
  loading = false;

  todos: TODO = new TODO();

  displayedColumns: string[] = ['edit', 'delete'];

  constructor(private todoService: TodoService) { }
  @Output() completeChange = new EventEmitter<MatCheckboxChange>();


  editTodo(todo: TODO) {
    this.todos = todo;
  }

  deleteTodo(todo: TODO) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the product ${todo.task}. This cannot be undone.`)) {
      this.todoService.deleteTodo(todo).subscribe(()=>{
        console.log("deleted");
      })
    }
  }

}