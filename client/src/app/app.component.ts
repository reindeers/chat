import {Component, OnInit} from '@angular/core';

import * as fromRoot from './store/reducers';
import * as userAction from './store/actions/users';
import * as feedAction from './store/actions/feed';
import {Observable} from "rxjs/index";
import {User} from "./model/User";
import {Store} from "@ngrx/store";
import {Feed, FeedStatus} from "./model/Feed";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users$: Observable<User[]>;
  feed$: Observable<Feed[]>;
  selectUser$: Observable<User>;
  user: User;
  msgCounter: number = 0;
  currentText: string = '';

  constructor(private store: Store<fromRoot.State>) {
    this.users$ = store.select(fromRoot.getAllUsers);
    this.feed$ = store.select(fromRoot.getAllFeed);
    this.selectUser$ = store.select(fromRoot.getSelectUser);
  }

  ngOnInit(){
    this.store.dispatch(new feedAction.LoadFeed(null));

    this.selectUser$.subscribe(s => { //todo unsubscribe
      this.user = s; //todo ?
    });

    this.feed$.subscribe(s => { //todo ?
      this.msgCounter = s.length;
    });

  }

  select(id: number){
    this.store.dispatch(new userAction.Select(id));
  }

  edit(msg: Feed) {
    this.store.dispatch(new feedAction.EditOne(msg))
  }

  delete(id: number) {
    this.store.dispatch(new feedAction.DeleteOne(id))
  }
  recover(id: number) {
    this.store.dispatch(new feedAction.RecoverOne(id))
  }

  add(){
    this.store.dispatch(new feedAction.AddOne({
      author: this.user.name,
      authorId: this.user.id,
      content: this.currentText,
      createdAt: new Date(),
      id: this.msgCounter + 1, //todo: need to get from the server not a client
      status: FeedStatus.ACTIVE
    }));
    this.currentText = '';
  }
}
