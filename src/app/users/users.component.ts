import { Component, OnInit } from '@angular/core';
import { UserList } from '../models/UserList'
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

export interface UserInfo{
  username: string;
  password: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  counter=1;

  private infos: UserList[] = [];
  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit() {
    //setTimeout(() => this.loadUserList(), 1000);
    setTimeout(() => this.loadPaginatedUserList(this.counter), 1000);
  }

  public loadUserList() {
    this.authServ.getAllUsers().subscribe(
    response =>this.infos = response.infos,)
  }

  public loadPaginatedUserList(page) {
    this.authServ.getPaginatedUsers(page).subscribe(
    response =>this.infos = response.infos,)
  }

  public increment(){
    if(this.counter<10) {
      this.counter=this.counter+1
      this.loadPaginatedUserList(this.counter)
    }
  }

  public decrement(){
    if(this.counter>1) {
      this.counter=this.counter-1
      this.loadPaginatedUserList(this.counter)
    }
  }

  public loginAs(user){
    let userInfo: UserInfo={username: user.username,password: user.password}
    this.authServ.login(userInfo).subscribe(
      response=> this.authServ.saveToken(response.token),);
    this.router.navigate(["view"])
  }
}
