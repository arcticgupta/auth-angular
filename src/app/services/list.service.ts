import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {Observable} from 'rxjs';
import { List } from '../models/List'
import { map } from "rxjs/operators";
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: Http, private authService: AuthenticationService) { }

  private serverApi= 'http://localhost:3000/bucketlist';

  public getAllLists() {
    let URI = `${this.serverApi}/allLists`;
    let headers = new Headers;
    let body = JSON.stringify({token:this.authService.getToken()});
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body ,{headers: headers})
    .pipe(map(res => res.json()))
  }

  public getUserList(username: string) {
    let URI = `${this.serverApi}/user/view/${username}`;
    let headers = new Headers;
    let body = JSON.stringify({token:this.authService.getToken()});
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body ,{headers: headers})
    .pipe(map(res => res.json()))
  }

  public addList(list: List) {
    let URI = `${this.serverApi}/user/add/${list.username}`;
    let headers = new Headers;
     let body = JSON.stringify({title: list.title, description: list.description, category: list.category, username: list.username, token:this.authService.getToken()});
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body ,{headers: headers})
    .pipe(map(res => res.json()))
  }

  public deleteList(listId : string) {
    let URI = `${this.serverApi}/user/delete/${listId}`;
      let headers = new Headers;
      let body = JSON.stringify({token:this.authService.getToken()});
      headers.append('Content-Type', 'application/json');
      return this.http.post(URI, body, {headers})
      .pipe(map(res => res.json()))
    }
}
