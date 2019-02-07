import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../model/User";
import {OnChanges} from "@angular/core";
import * as userAction from "../../store/actions/users";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers";

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

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {

  //  this.store.dispatch(new userAction.LoadUsers()); //todo unsubscribe
  }

  ngOnChanges(){

  }

}
