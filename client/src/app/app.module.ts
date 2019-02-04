import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MaterialComponentModule} from "./material.component";
import {UserListComponent} from "./components/user.list/user-list.component";
import {UserComponent} from "./components/user.list/user.component";
import {MessageComponent} from "./components/message/message.component";
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from "./store/services/UserEffects";

@NgModule({
  declarations: [
    AppComponent, MaterialComponentModule, UserListComponent, UserComponent, MessageComponent
  ],
  imports: [
    BrowserModule, EffectsModule.forRoot([UserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
