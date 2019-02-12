import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
export class MessageListComponent {
  @Input() feed: Feed[];
  @Input() user: User;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() recover = new EventEmitter();

  constructor() {}

}
