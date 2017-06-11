import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  hasMedalForSolarSystem: boolean;
  hasMedalForSurvival: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    storage.set("solarSystem", "myVal");

    storage.get("solarSystem").then((result) => {
      this.hasMedalForSolarSystem = (result !== null);
    });

    storage.get("survival").then((result) => {
      this.hasMedalForSurvival = (result !== null);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
}
