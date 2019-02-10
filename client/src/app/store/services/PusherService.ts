import { Injectable } from '@angular/core';
import {Subject, Observable, of} from 'rxjs';
import Pusher from 'pusher-js';
import {Feed, FeedStatus} from "../../model/Feed";
import {User, UserGroup} from "../../model/User";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PusherService {
  private subject: Subject<Feed> = new Subject<Feed>();
  private subjectUser: Subject<User> = new Subject<User>()

  constructor(private http: HttpClient) {
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
          {id: data.id, author: data.author, authorId: data.authorId, content: data.content, createdAt: data.createdAt, status: data.status}
        );
      }
    );

    channelUser.bind(
      'user',
      (data: {id: number, name: string, group: UserGroup, counter: number, lastLogin: Date}) => {
        this.subjectUser.next(
          {id: data.id, name: data.name, group: data.group, counter: data.counter, lastLogin: data.lastLogin}
        )
      }
    );
    channelUser.bind(
      'posts',
      (data: {id: number, name: string, group: UserGroup, counter: number, lastLogin: Date}) => {
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

  changeUser(id){
    this.http.post('http://localhost:3000/change', {'id': id}); //todo Обработка ошибок
    return of(id)
  }

  addPost(msg: Feed) : Observable<Feed> {
    this.http.post('http://localhost:3000/submit', msg);
    return of(msg)
  }

  deletePost(msg: Feed) : Observable<Feed> {
    this.http.post('http://localhost:3000/delete', msg.id);
    return of(msg)
  }
  recoverPost(msg: Feed) : Observable<Feed>{
    this.http.post('http://localhost:3000/recover', msg.id);
    return of(msg)
  }

  editPost(msg: Feed): Observable<Feed>{
    this.http.post('http://localhost:3000/edit', msg)
    return of(msg)
  }
}
