import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from 'underscore';
import { CoursePage } from '../course/course';
import { VideosPage } from '../videos/videos';
import { RecommendationsPage } from '../recommendations/recommendations';
import { Storage } from '@ionic/storage';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.materialsInfo = this.getMaterialsInfo();
    this.categoriesList = this.getCategoryList(this.materialsInfo);
    storage.set("survival", null);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LearnPage');
  }

  categorieDetail(text: any) {

  }

  getMaterialsInfo() {
    let perCategoryList: any = {
                                "Survival":{
                                            "key1":{
                                                        "display_image_link":"assets/img/survival.png",
                                                        "materials_link": {
                                                          "type": "lesson",
                                                          "category": "survival"
                                                        },
                                                        "name":"Survival Lessons"
                                                    },
                                            "key2":{
                                                        "display_image_link":"assets/img/recommend.png",
                                                        "materials_link": {
                                                          "type": "recommendations",
                                                          "category": "survival"
                                                        },
                                                        "name":"Recommendations"
                                                    }
                                         },
                                "Science":{
                                            "key1":{
                                                        "display_image_link":"assets/img/solar_system.jpg",
                                                        "materials_link": {
                                                          "type": "lesson",
                                                          "category": "science"
                                                        },
                                                        "name":"Solar System"
                                                    },
                                            "key2":{
                                                        "display_image_link":"assets/img/recommend.png",
                                                        "materials_link" : {
                                                          "type": "recommendations",
                                                          "category": "science"
                                                        },
                                                        "name":"Recommendations"
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

  takeCourse(materialsLink) {

    if(materialsLink.type == "recommendations") {
       this.navCtrl.push(RecommendationsPage, {
         category: materialsLink.category
       });
    } else {
      let data: any = {
        materialsLink: materialsLink
      };
      if(materialsLink.category === "survival") {
        this.navCtrl.push(CoursePage, data);
      } else {
        this.navCtrl.push(VideosPage, data);
      }
    }
  }
}
