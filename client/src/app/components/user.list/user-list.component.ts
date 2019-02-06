import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../model/User";
import {OnChanges} from "@angular/core";

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
export class UserListComponent implements OnInit, OnChanges {
  @Input() users: User[];
  @Input() slctUsr: User;
  @Output() select = new EventEmitter();

  constructor() {}

  ngOnInit() {
  //  this.store.dispatch(new userAction.LoadUsers()); //todo unsubscribe
  }

  ngOnChanges(){
    console.log(this.slctUsr)
  }

}
