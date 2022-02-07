import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TODO } from '../projectslist/project';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  saveTodo(todo: TODO): Observable<TODO>{
      return this.http.put<TODO>('http://localhost:4201/app/todo/'+todo.id, todo, {});
  }

  createTodo(todo: TODO) : Observable<TODO>{
    return this.http.post<TODO>('http://localhost:4201/app/todo', todo, {});
  }
  
  deleteTodo(todo: TODO) : Observable<boolean>{
    return this.http.delete<boolean>('http://localhost:4201/app/todo/'+todo.id,{});
    console.log('completed delete ');
  }
}
