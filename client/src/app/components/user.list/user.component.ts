import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {User} from "../../model/User";

@Component({
  selector: 'user-item',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnChanges{
  @Input() user: User;
  @Input() slctUsr: User;
  @Output() select = new EventEmitter();
  isSelect: boolean = false;

  constructor(){}

  ngOnChanges(){
    if (this.slctUsr)
      this.isSelect = this.slctUsr.id == this.user.id;
  }

}
