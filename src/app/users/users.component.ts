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

  private infos: UserList[] = [];
  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => this.loadUserList(), 1000);
  }

  public loadUserList() {
    this.authServ.getAllUsers().subscribe(
    response =>this.infos = response.infos,)
  }

  public loginAs(user){
    console.log(user.username)
    let userInfo: UserInfo={username: user.username,password: user.password}
    this.authServ.login(userInfo).subscribe(
      response=> this.authServ.saveToken(response.token),);
    this.router.navigate(["view"])
  }
}
