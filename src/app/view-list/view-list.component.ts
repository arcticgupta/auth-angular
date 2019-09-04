import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { List } from '../models/List'
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {

  private lists: List[] = [];
  constructor(private listServ: ListService, private authServ: AuthenticationService) { }

  ngOnInit() {
    setTimeout(() => this.loadUserList(), 1000);
  }

  public loadLists() {
    this.listServ.getAllLists().subscribe(
      response => this.lists = response.list,)
  }

  public loadUserList() {
    let username= this.authServ.getUserDetails().username
    this.listServ.getUserList(username).subscribe(
    response => this.lists = response.info,)
  }

  public deleteList(list: List) {
    this.listServ.deleteList(list._id).subscribe(
    response =>    this.lists = this.lists.filter(lists => lists !== list),)
  }

  public onAddList(newList) {
    this.lists = this.lists.concat(newList);
  }  
}
