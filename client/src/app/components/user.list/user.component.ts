import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
export class UserComponent implements OnInit{
  @Input() user: User;
  @Output() select = new EventEmitter();
  selected$: Observable<any>;
  isSelect: boolean = false;

  constructor(private store: Store<fromRoot.State>){

  }
  ngOnInit(){
    this.selected$ = this.store.select(fromRoot.getSelectUser);
    this.selected$.subscribe(s => {
      this.isSelect = s == this.user.id;
      this.store.dispatch(new userAction.Select(this.user.id));
    })
  }

}
