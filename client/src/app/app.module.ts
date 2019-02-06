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
import {MessageListComponent} from "./components/message/message-list.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FeedEffects} from "./store/services/feed.effects";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent, UserListComponent, UserComponent, MessageComponent, MessageListComponent
  ],
  imports: [
    BrowserModule, StoreModule.forRoot(reducers), EffectsModule.forRoot([UserEffects,  FeedEffects]), MaterialComponentModule, HttpClientModule, BrowserAnimationsModule, FormsModule
  ],
  providers: [PusherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
