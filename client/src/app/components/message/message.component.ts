import {Component, Input} from '@angular/core';
import {Feed} from "../../model/Feed";
import {User} from "../../model/User";

@Component({
  selector: 'message-item',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() msg: Feed;
  @Input() user: User;
  credentials = {};

  constructor(){
    this.credentials = {
      "edit_my_msg": ["ADMIN", "USER"],
      "edit_others_msg": ["ADMIN"],
      "delete_msg": ["ADMIN"]
    }
  }

  isEditableMsg(){
    if (this.user.id != this.msg.authorId)
      return this.credentials["edit_others_msg"].indexOf(this.user.group) != -1;
    else
      return this.credentials["edit_my_msg"].indexOf(this.user.group) != -1;
  }

  isDeleteMsg(){
    return this.credentials["delete_msg"].indexOf(this.user.group) != -1;
  }

}
