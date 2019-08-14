import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { List } from '../models/List';
import { ListService } from '../services/list.service';
import { AuthenticationService } from '../services/authentication.service';




@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {

  @Output() addList: EventEmitter<List> = new EventEmitter<List>();

  private newList :List;

  constructor(private listServ: ListService, private authServ: AuthenticationService) { }

  ngOnInit() {
    this.newList = {
        title: '',
        username: '',
        category:'',
        description:'',
        _id:''

    }
  }

public onSubmit() {
  this.newList.username= this.authServ.getUserDetails().username
  console.log(this.newList);
    this.listServ.addList(this.newList).subscribe(
        response=> {
            if(response.success== true)
                this.addList.emit(this.newList);
        },
    );
  }
}
