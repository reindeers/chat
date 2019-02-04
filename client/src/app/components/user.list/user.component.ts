import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../model/User";

@Component({
  selector: 'user-item',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  @Input() user: User;
  @Output() select = new EventEmitter();

  constructor(){

  }
  ngOnInit(){}

}
