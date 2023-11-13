import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  baseUrl: string = 'http://localhost:3000/posts';
  constructor(private _http: HttpClient) {}
  getFormData(): Observable<any> {
    return this._http.get(this.baseUrl);
  }
  saveToDoList(obj: string): Observable<any> {
    console.log(obj);
    return this._http.post(`${this.baseUrl}`, obj);
  }
  deleleToDo(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
  updateToDo(id: number, obj: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, obj);
  }
}
