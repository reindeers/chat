import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MaterialComponentModule} from "./material.component";
import {UserListComponent} from "./components/user.list/user-list.component";
import {UserComponent} from "./components/user.list/user.component";
import {MessageComponent} from "./components/message/message.component";
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from "./store/services/UserEffects";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {PusherService} from "./store/services/PusherService";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent, UserListComponent, UserComponent, MessageComponent
  ],
  imports: [
    BrowserModule, StoreModule.forRoot(reducers), EffectsModule.forRoot([UserEffects]), MaterialComponentModule, HttpClientModule
  ],
  providers: [PusherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
