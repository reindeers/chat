import {Component, OnDestroy, OnInit} from '@angular/core';

import * as fromRoot from './store/reducers';
import * as userAction from './store/actions/users';
import * as feedAction from './store/actions/feed';
import {Observable, Subscription} from "rxjs/index";
import {User} from "./model/User";
import {Store} from "@ngrx/store";
import {Feed, FeedStatus} from "./model/Feed";
import {PusherService} from "./store/services/PusherService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PusherService]
})
export class AppComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  feed$: Observable<Feed[]>;
  selectUser$: Observable<User>;
  user: User;
  msgCounter: number = 0;
  currentText: string = '';

  constructor(private store: Store<fromRoot.State>, private pusherService: PusherService) {
    this.users$ = store.select(fromRoot.getAllUsers);
    this.feed$ = store.select(fromRoot.getAllFeed);
    this.selectUser$ = store.select(fromRoot.getSelectUser);

    this.store.dispatch(new feedAction.LoadFeed(null));
    this.store.dispatch(new userAction.LoadUsers(null));
  }

  ngOnInit(){
    this.selectUser$.subscribe(s => { //todo unsubscribe
      this.user = s; //todo ?
    });

    this.feed$.subscribe(s => { //todo ?
      this.msgCounter = s.length;
    });

  }

  ngOnDestroy(){

  }

  select(user: User){
    this.store.dispatch(new userAction.Select(user));
  }

  edit(msg: Feed) {
    this.store.dispatch(new feedAction.EditOne(msg))
  }

  delete(msg: Feed) {
    this.store.dispatch(new feedAction.DeleteOne(msg));
    this.store.dispatch(new userAction.DecCounter(msg.authorId))
  }

  recover(msg: Feed) {
    this.store.dispatch(new feedAction.RecoverOne(msg));
    this.store.dispatch(new userAction.IncCounter(msg.authorId))
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
