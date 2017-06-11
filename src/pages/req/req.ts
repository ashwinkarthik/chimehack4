import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import {Http} from '@angular/http';

/**
 * Generated class for the ReqPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-req',
  templateUrl: 'req.html',
})
export class ReqPage {

  constructor(public nav: NavController, public navParams: NavParams, public http: Http) {
    this.http = http;
    this.nav = nav;
  }

  makeGetRequest() {
        this.http.get("https://vroom-83bc4.firebaseio.com/users/student/emma.json")
        .subscribe(data => {
            console.log(data.json().birthday);
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReqPage');
  }

}
