import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { UserInfo } from '../models/UserInfo'
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() login: EventEmitter<UserInfo> = new EventEmitter<UserInfo>();

  private newUserInfo :UserInfo;
  private message :string;

  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.newUserInfo = {
        username: '',
        password:''
    }
  }

public onSubmit() {
    this.authServ.login(this.newUserInfo).subscribe(
        response=> {
          if (response.success===false){
            this.message="Incorrect Credentials"
          }
          else if (response.token) {
            this.message=""
            this.authServ.saveToken(response.token)
          }
          if(this.newUserInfo.username==="donald") this.router.navigate(['/users'])
          else if (this.message) {}
          else this.router.navigate(['/view']);
        },);
  }
}
