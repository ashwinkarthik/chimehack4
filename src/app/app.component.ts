import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { LearnPage } from '../pages/learn/learn';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LearnPage;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
 
  go_to_login(){
    this.nav.setRoot(LoginPage);  
  }

  go_to_learn(){
    this.nav.setRoot(LearnPage);  
  }
}

