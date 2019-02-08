import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {User} from "../../model/User";
import * as fromRoot from "../../store/reducers";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as userAction from "../../store/actions/users";

@Component({
  selector: 'user-item',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges{
  @Input() user: User;
  @Input() slctUsr: User;
  @Output() select = new EventEmitter();
  isSelect: boolean = false;

  constructor(private store: Store<fromRoot.State>){

  }
  ngOnInit(){
    console.log(this.slctUsr +'  ' + this.isSelect)
  }

  ngOnChanges(){
    if (this.slctUsr)
      this.isSelect = this.slctUsr.id == this.user.id;

    console.log(this.slctUsr +'  ' + this.isSelect)

  }

}
