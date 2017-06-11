import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { LearnPage } from '../pages/learn/learn';
import { NgZone } from '@angular/core';
import firebase from 'firebase';
import {ResetPasswordPage} from '../pages/reset-password/reset-password';
import {SignupPage} from '../pages/signup/signup';
import { CoursePage } from '../pages/course/course';
import {ReqPage} from '../pages/req/req';
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {DetailsPage} from "../pages/details/details";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  zone:NgZone;
  @ViewChild(Nav) nav: Nav;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public push: Push, public alertCtrl: AlertController) {
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
      this.rootPage = LoginPage;
      unsubscribe();
    }
  });
});
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initPushNotification();
    });

  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: "1092410636914"
      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log("device token ->", data.registrationId);
      //TODO - send device token to server
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message', data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              this.nav.push(DetailsPage, {message: data.message});
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        this.nav.push(DetailsPage, {message: data.message});
        console.log("Push notification clicked");
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  go_to_login(){
    this.nav.setRoot(LoginPage);
  }

  go_to_learn(){
    this.nav.setRoot(LearnPage);
  }

  go_to_course(){
    this.nav.setRoot(CoursePage);
  }
}
