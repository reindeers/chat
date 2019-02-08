import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OnChanges} from "@angular/core";
import {Feed} from "../../model/Feed";
import {User} from "../../model/User";

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styles: [`
    .list {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class MessageListComponent implements OnInit, OnChanges {
  @Input() feed: Feed[];
  @Input() user: User;

  constructor() {}

  ngOnInit() {
    console.log('init')
    //  this.store.dispatch(new userAction.LoadUsers()); //todo unsubscribe
  }

  ngOnChanges(){
    console.log('changes')
  }

}
