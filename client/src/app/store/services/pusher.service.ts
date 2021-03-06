import {Injectable, OnDestroy} from '@angular/core';
import {Observable, of, Subject, Subscription} from 'rxjs';
import Pusher from 'pusher-js';
import {Feed, FeedStatus} from "../../model/Feed";
import {User, UserGroup} from "../../model/User";
import {HttpClient} from "@angular/common/http";
import * as fromRoot from "../reducers";
import {Store} from "@ngrx/store";

@Injectable()
export class PusherService implements OnDestroy {
  private subject: Subject<Feed> = new Subject<Feed>();
  private subjectUser: Subject<User> = new Subject<User>();
  users$: Observable<User[]>;
  users: User[];
  channel: Pusher;
  channelUser: Pusher;

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {
    this.users$ = store.select(fromRoot.getAllUsers);
    this.users$.subscribe(x => this.users = x);
    Pusher.logToConsole = true;

    let pusher = new Pusher('ab3a30b5502aad545aeb', {
      cluster: 'eu',
      forceTLS: true
    });

    this.channel = pusher.subscribe('feeds');
    this.channelUser = pusher.subscribe('counter');

    this.channel.bind(
      'posts',
      (data: { id: number, author: string; authorId: number; content: string; createdAt: Date, status: FeedStatus }) => {
        this.subject.next(
          {
            id: data.id,
            author: data.author,
            authorId: data.authorId,
            content: data.content,
            createdAt: data.createdAt,
            status: data.status
          }
        );
      }
    );

    this.channelUser.bind(
      'count',
      (data: User[]) => {
        for (let us of data)
          this.subjectUser.next(
            {id: us.id, name: us.name, group: us.group, counter: us.counter, lastLogin: us.lastLogin}
          )
      }
    );
  }

  ngOnDestroy() {
    this.channel.unsubscribe();
    this.channelUser.unsubscribe();
    this.subject.unsubscribe();
    this.subjectUser.unsubscribe();
  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }

  getUserItems(): Observable<User> {
    return this.subjectUser.asObservable();
  }

  changeUser(user) {
    user.lastLogin = new Date();
    user.counter = 0;
    this.http.post('http://localhost:3000/change', user).subscribe();
    return of(user)
  }

  addPost(msg: Feed): Observable<Feed> {
    this.http.post('http://localhost:3000/submit', {msg: msg}).subscribe();
    return of(msg)
  }

  deletePost(msg: Feed): Observable<Feed> {
    msg.status = FeedStatus.DELETED;
    this.http.post('http://localhost:3000/submit', {msg: msg}).subscribe();
    return of(msg)
  }

  recoverPost(msg: Feed): Observable<Feed> {
    msg.status = FeedStatus.ACTIVE;
    this.http.post('http://localhost:3000/submit', {msg: msg}).subscribe();
    return of(msg)
  }

  editPost(msg: Feed): Observable<Feed> {
    this.http.post('http://localhost:3000/submit', {msg: msg}).subscribe();
    return of(msg)
  }

  decCounter(id: number): Observable<User> {
    let usrs = this.users.map(u => {
      if (u.id != id) {
        let us = u;
        us.counter = us.counter == 0 ? 0 : us.counter - 1;
        return us;
      }
      else return u
    });
    this.http.post('http://localhost:3000/counter', {usr: usrs}).subscribe();
    return of(usrs[id])
  }

  incCounter(id: number): Observable<User> {
    let usrs = this.users.map(u => {
      if (u.id != id) {
        let us = u;
        us.counter++;
        return us;
      }
      else return u
    });
    this.http.post('http://localhost:3000/counter', {usr: usrs}).subscribe();
    return of(usrs[id])
  }
}
