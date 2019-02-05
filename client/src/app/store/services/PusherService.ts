import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
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
      (data: { id: number, author: string; content: string; createdAt: Date, status: FeedStatus }) => {
        this.subject.next(
          {id: data.id, author: data.author, content: data.content, createdAt: data.createdAt, status: data.status} //add msg
        );
      }
    );

    channelUser.bind(
      'user',
      (data: {id: number, name: string, group: UserGroup}) => {
        this.subjectUser.next(
          {id: data.id, name: data.name, group: data.group} //update count
        )
      }
    );
    channelUser.bind(
      'posts',
      (data: {id: number, name: string, group: UserGroup}) => {
        this.subjectUser.next(
          {id: data.id, name: data.name, group: data.group} //update counts
        )
      }
    );


  }

  getFeedItems(): Observable<Feed[]> {
    return new Observable()
   // return this.subject.asObservable();
  }

  getUserItems(): Observable<User[]> {
    return new Observable()
   // return this.subjectUser.asObservable();

  }

  changeUser(id) {
    this.http.post('http://localhost:3000/change', {'id': id})
      .subscribe(data => {});
    return new Observable() //todo
  }

  addPost(msg: Feed){
    this.http.post('http://localhost:3000/submit', msg)
      .subscribe(data => {});
    return new Observable()
  }
}
