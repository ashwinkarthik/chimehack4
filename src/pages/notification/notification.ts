import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from 'underscore';
import { Http } from '@angular/http';
import values from 'object.values';

/**
 * Generated class for the notificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  materialsInfo: any;
  categoriesList: Array<any>;
  userList: any;
  users: any;
  keys1: any;
  messageList: any;
  pushMessage: string = "push message will be displayed here";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.materialsInfo = this.getMaterialsInfo();
    this.categoriesList = this.getCategoryList(this.materialsInfo);
    this.users = {};
    //this.userList = []
    //this.notificationList = this.navParams.get("notificationLists");
    if (navParams.data.message) {
      this.pushMessage = navParams.data.message;
    }
    this.http.get("https://vroom-83bc4.firebaseio.com/messages/emma/" + "received.json")
    .subscribe(data => {
        console.log('original object',data.json());
        var obj = data.json();

        console.log(JSON.stringify(obj));
        var keys1 = _.keys(obj);
        this.keys1 = keys1;
        console.log(JSON.stringify(keys1));

        for (var ind = 0; ind < keys1.length; ind++) {
          var otherUser = keys1[ind];
          this.users[otherUser] =[];
          console.log('otherUser: ' + otherUser);
          var messages = obj[otherUser];
          console.log(JSON.stringify(messages));

          for (var messageKey in messages) {
            console.log("message: " + messages[messageKey]);
            this.users[otherUser].push(messages[messageKey]);
          }
        }

        console.log('this.users: ' + this.users);
        this.userList = _.keys(data.json());
        console.log('keys of original object',_.keys(data.json()));
        console.log('Values of original object',_.values(data.json()));
        console.log('Values of original object within object',_.keys(_.values(data.json())));
        console.log('Values of original object within object',_.values(_.keys(_.values(data.json()))));
        var values = _.values(_.values(data.json()));
        var keys = _.values(values);
        console.log(this.userList);
        console.log(keys);
    }, error => {
        console.log(JSON.stringify(error.json()));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  categorieDetail(text: any) {

  }

  getMaterialsInfo() {
    let perCategoryList: any = {
                                "Solar System 1":{
                                            "key1":{
                                                        "display_image_link":"assets/img/solar_system.jpg",
                                                        "materials_link":"a",
                                                        "name":"Solar System"
                                                    },
                                            "key2":{
                                                        "display_image_link":"assets/img/solar_system.jpg",
                                                        "materials_link":"a",
                                                        "name":"Solar System"
                                                    }
                                         },
                                 "Solar System 2":{
                                            "key1":{
                                                        "display_image_link":"assets/img/solar_system.jpg",
                                                        "materials_link":"a",
                                                        "name":"Solar System"
                                                    },
                                            "key2":{
                                                        "display_image_link":"assets/img/solar_system.jpg",
                                                        "materials_link":"a",
                                                        "name":"Solar System"
                                                    }
                                         }

                                };
    return perCategoryList;
  }

  getCategoryList(materialsInfo: any) {
    return _.keys(materialsInfo);
  }

  getMaterialsListForCategory(category) {
      return _.values(this.materialsInfo[category]);
  }
}
