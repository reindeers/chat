import { Component } from '@angular/core';

import * as fromRoot from './store/reducers';
import * as userAction from './store/actions/users';
import {Observable} from "rxjs/index";
import {User} from "./model/User";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users$: Observable<User[]>;
  selected$: Observable<any>;

  constructor(private store: Store<fromRoot.State>){
    this.users$ = store.select(fromRoot.getAllUsers);
    this.selected$ = store.select(fromRoot.getSelectUser);
  }

  onSelect(id: number){
    this.store.dispatch(new userAction.Select(id));
  }
}
