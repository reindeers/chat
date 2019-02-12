import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() recover = new EventEmitter();

  credentials = {};
  editMode: boolean = false;

  constructor(){
    this.credentials = {
      "edit_my_msg": ["ADMIN", "USER"],
      "edit_others_msg": ["ADMIN"],
      "delete_my_msg": ["ADMIN", "USER"],
      "delete_others_msg": ["ADMIN"]
    }
  }

  isEditableMsg(){
    if (this.user.id != this.msg.authorId)
      return this.credentials["edit_others_msg"].indexOf(this.user.group) != -1;
    else
      return this.credentials["edit_my_msg"].indexOf(this.user.group) != -1;
  }

  isDeleteMsg(){
    if (this.user.id != this.msg.authorId)
      return this.credentials["delete_others_msg"].indexOf(this.user.group) != -1;
    else
      return this.credentials["delete_my_msg"].indexOf(this.user.group) != -1;
  }

  toggleMode(isEdit: boolean){
    this.editMode = isEdit;
    if (!isEdit) this.edit.emit(this.msg)
  }

}
