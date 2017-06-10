import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private http: Http, private platform: Platform, private storage: Storage) {
      this.getItems();
    
      storage.ready().then(() => {
          storage.set("myKey", "myVal");

          storage.get("myKey").then( (val: any) => {
              console.log("Value is "+ val);
          });
      });
      
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
