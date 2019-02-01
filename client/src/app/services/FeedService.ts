import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import Pusher from 'pusher-js';
import {Feed} from "../../schema/Feed";

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private subject: Subject<Feed> = new Subject<Feed>();

  constructor() {
    Pusher.logToConsole = true;

    let pusher = new Pusher('ab3a30b5502aad545aeb', {
      cluster: 'eu',
      forceTLS: true
    });

    let channel = pusher.subscribe('realtime-feeds');
    channel.bind(
      'posts',
      (data: { title: string; body: string; time: string }) => {
        this.subject.next(
          new Feed(data.title, data.body, new Date(data.time))
        );
      }
    );


  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }
}
