import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userProfile: any = null;
  constructor(public navCtrl: NavController, private http: Http, private platform: Platform, private storage: Storage, private facebook: Facebook) {
      this.getItems();

      storage.ready().then(() => {
          storage.set("myKey", "myVal");

          storage.get("myKey").then( (val: any) => {
              console.log("Value is "+ val);
          });
      });

  }

  facebookLogin(): void {
    this.facebook.login(['email']).then( (response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          console.log("Firebase success: " + JSON.stringify(success));
          this.userProfile = success;
        })
        .catch((error) => {
          console.log("Firebase failure: " + JSON.stringify(error));
      });

    }).catch((error) => { console.log(error) });
  }

  public getItems() {
      var url = 'assets/data/sample.json';

    if (this.platform.is('cordova') && this.platform.is('android')) {
        url = "/android_asset/www/" + url;
    }

    console.info("Here....");
    return this.http.get(url)
        .map((res) => {
            console.info("There....");
            console.log(JSON.stringify(res.json()));
            return res.json();
        });
  }

  public getValue() {
    return "Value";
    // return this.storage.get("myKey").then( (val: any) => {
    //          return val;
    // });
  }

  public setValue(value: any) {
    this.storage.set("key", value);
  }

}
