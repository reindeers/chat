import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import Pusher from 'pusher-js';
import {Feed, FeedStatus} from "../model/Feed";
import {User, UserGroup} from "../model/User";

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  private subject: Subject<Feed> = new Subject<Feed>();
  private subjectUser: Subject<User> = new Subject<User>()

  constructor() {
    Pusher.logToConsole = true;

    let pusher = new Pusher('ab3a30b5502aad545aeb', {
      cluster: 'eu',
      forceTLS: true
    });

    let channel = pusher.subscribe('realtime-feeds');
    channel.bind(
      'posts',
      (data: { author: string; content: string; createdAt: Date, status: FeedStatus }) => {
        this.subject.next(
          {author: data.author, content: data.content, createdAt: data.createdAt, status: data.status}
        );
      }
    );
    channel.bind(
      'users',
      (data: {id: number, name: string, group: UserGroup}) => {
        this.subjectUser.next(
          {id: data.id, name: data.name, group: data.group}
        )
      }
    )


  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }

  getUserItems(): Observable<User> {
    return this.subjectUser.asObservable();

  }
}
