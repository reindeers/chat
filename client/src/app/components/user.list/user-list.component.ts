import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../model/User";

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styles: [`
    .list {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class UserListComponent implements OnInit{
  @Input() users: User[];
  @Input() slctUsr: User;
  @Output() select = new EventEmitter();

  constructor() {}

  ngOnInit(){
    this.select.emit(this.slctUsr);
  }

}
