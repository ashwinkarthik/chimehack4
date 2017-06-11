import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from 'underscore';

/**
 * Generated class for the LearnPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-learn',
  templateUrl: 'learn.html',
})
export class LearnPage {
  materialsInfo: any;
  categoriesList: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.materialsInfo = this.getMaterialsInfo();
    this.categoriesList = this.getCategoryList(this.materialsInfo);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LearnPage');
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
