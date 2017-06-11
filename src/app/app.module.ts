import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, NavController, IonicErrorHandler, IonicModule, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage'
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { LearnPage } from '../pages/learn/learn';
import { CoursePage } from '../pages/course/course';
import { NotificationPage } from '../pages/notification/notification';


import { AngularFireModule } from 'angularfire2';
import { AuthProvider } from '../providers/auth/auth';
import {ResetPasswordPage} from '../pages/reset-password/reset-password';
import {SignupPage} from '../pages/signup/signup';
import {ReqPage} from '../pages/req/req';
import { Facebook } from '@ionic-native/facebook'
import { IonicImageViewerModule } from 'ionic-img-viewer';
import {Push, PushObject, PushOptions} from "@ionic-native/push";

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: ""
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    LearnPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ReqPage,
    CoursePage,
    NotificationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    LearnPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ReqPage,
    CoursePage,
    NotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Facebook,
    Push,
  ]
})
export class AppModule {}
