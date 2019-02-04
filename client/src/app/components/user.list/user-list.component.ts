import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../model/User";
import {OnChanges} from "@angular/core";

@Component({
  selector: 'user-list',
  template: `
    <div class="list">
      <user-item *ngFor="let user of users"
                 [user]="user"
                 (select)="select.emit($event)">
      </user-item>
    </div>
  `,
  styles: [`
    .list {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class UserListComponent implements OnInit, OnChanges {
  @Input() users: User[];
  @Output() select = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
  }

  ngOnChanges(){}

}
