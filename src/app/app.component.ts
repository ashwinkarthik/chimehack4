import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { LearnPage } from '../pages/learn/learn';
import { NgZone } from '@angular/core';
import firebase from 'firebase';
import {ResetPasswordPage} from '../pages/reset-password/reset-password';
import {SignupPage} from '../pages/signup/signup';
import { CoursePage } from '../pages/course/course';
import { ProfilePage } from '../pages/profile/profile';
import {ReqPage} from '../pages/req/req';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LearnPage;
  zone:NgZone;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
  firebase.initializeApp({
  apiKey: "AIzaSyDNdsiK6zkX62fDzoT1FuMNn93PmilauWw",
  authDomain: "chamhack4-3e876.firebaseapp.com",
  databaseURL: "https://chamhack4-3e876.firebaseio.com",
  projectId: "chamhack4-3e876",
  storageBucket: "chamhack4-3e876.appspot.com",
  messagingSenderId: "1092410636914"
  });
  this.zone = new NgZone({});
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  this.zone.run( () => {
    if (!user) {
      this.rootPage = LoginPage;
      unsubscribe();
    } else {
      this.rootPage = LearnPage;
      unsubscribe();
    }
  });
});
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
  
  go_to_learn(){
    this.nav.setRoot(LearnPage);  
  }

  go_to_profile(){
    this.nav.setRoot(ProfilePage);
  }
}
