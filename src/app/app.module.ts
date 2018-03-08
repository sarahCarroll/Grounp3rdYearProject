
//https://www.joshmorony.com/using-http-to-fetch-remote-data-from-a-server-in-ionic-2/
//http module needs to be asses in the app.module.ts 

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AddPage } from '../pages/add/add';
import { DeletePage } from '../pages/delete/delete';
import { HomePage } from '../pages/home/home';
import { UpdatePage } from '../pages/update/update';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PeopleServiceProvider } from '../providers/people-service/people-service';

@NgModule({
  declarations: [
    MyApp,
    AddPage,
    DeletePage,
    HomePage,
    UpdatePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    //add httpmodule to the imports 
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPage,
    DeletePage,
    HomePage,
    UpdatePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PeopleServiceProvider
  ]
})
export class AppModule { }
    
