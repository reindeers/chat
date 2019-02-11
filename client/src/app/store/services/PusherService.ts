import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import Pusher from 'pusher-js';
import {Feed, FeedStatus} from "../../model/Feed";
import {User, UserGroup} from "../../model/User";
import {HttpClient} from "@angular/common/http";
import * as fromRoot from "../reducers";
import {Store} from "@ngrx/store";

@Injectable()
export class PusherService {
  private subject: Subject<Feed> = new Subject<Feed>();
  private subjectUser: Subject<User> = new Subject<User>();
  users$: Observable<User[]>;
  users: User[];

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {
    this.users$ = store.select(fromRoot.getAllUsers);
    this.users$.subscribe(x => this.users = x);
    Pusher.logToConsole = true;

    let pusher = new Pusher('ab3a30b5502aad545aeb', {
      cluster: 'eu',
      forceTLS: true
    });

    let channel = pusher.subscribe('feeds');
    let channelUser = pusher.subscribe('counter');



    channel.bind(
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

    channelUser.bind(
      'dec',
      (data: { id: number, name: string, group: UserGroup, counter: number, lastLogin: Date }) => {
        this.subjectUser.next(
          {id: data.id, name: data.name, group: data.group, counter: data.counter == 0 ? 0 : data.counter - 1, lastLogin: data.lastLogin}
        )
      }
    );
    channelUser.bind(
      'inc',
      (data: { id: number, name: string, group: UserGroup, counter: number, lastLogin: Date }) => {
        this.subjectUser.next(
          {id: data.id, name: data.name, group: data.group, counter: data.counter + 1, lastLogin: data.lastLogin}
        )
      }
    );

    channelUser.bind(
      'user',
      (data: { id: number, name: string, group: UserGroup, counter: number, lastLogin: Date }) => {
        this.subjectUser.next(
          {id: data.id, name: data.name, group: data.group, counter: data.counter, lastLogin: data.lastLogin}
        )
      }
    );
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
    let u = this.users.filter(xx => xx.id != msg.authorId);
    this.http.post('http://localhost:3000/submit', {msg: msg, usr: u}).subscribe();
    return of(msg)
  }

  deletePost(msg: Feed): Observable<Feed> {
    msg.status = FeedStatus.DELETED;
    let u = this.users.filter(xx => xx.id != msg.authorId);
    this.http.post('http://localhost:3000/delete', {msg: msg, usr: u}).subscribe();
    return of(msg)
  }

  recoverPost(msg: Feed): Observable<Feed> {
    msg.status = FeedStatus.ACTIVE;
    this.http.post('http://localhost:3000/recover', {msg: msg}).subscribe();
    return of(msg)
  }

  editPost(msg: Feed): Observable<Feed> {
    this.http.post('http://localhost:3000/edit', {msg: msg}).subscribe();
    return of(msg)
  }
}
