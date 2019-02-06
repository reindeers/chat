import {Component, Input} from '@angular/core';
import {Feed} from "../../model/Feed";

@Component({
  selector: 'message-item',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() msg: Feed;

  constructor(){

  }

}
