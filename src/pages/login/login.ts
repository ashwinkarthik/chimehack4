import { Component } from '@angular/core';
import {
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
  AlertController } from 'ionic-angular';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { LearnPage } from '../learn/learn';
import {ResetPasswordPage} from '../reset-password/reset-password';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm:FormGroup;
  public loading:Loading;
  userProfile: any = null;

  constructor(public navCtrl: NavController,
  public loadingCtrl: LoadingController,
  public navParams: NavParams, public formBuilder: FormBuilder, private storage: Storage, public http: Http, private facebook: Facebook) {

  this.http = http;
  this.loginForm = formBuilder.group({
    email: ['', Validators.compose([Validators.required,
      EmailValidator.isValid])],
    password: ['', Validators.compose([Validators.minLength(6),
      Validators.required])]
  });

  storage.ready().then(() => {
      storage.set("nayan@gmail.com", "singhal");

      storage.get("nayan@gmail.com").then( (val: any) => {
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
          this.navCtrl.setRoot(LearnPage);
        })
        .catch((error) => {
          console.log("Firebase failure: " + JSON.stringify(error));
      });

    }).catch((error) => { console.log(error) });
  }

  loginUser(): void {
  if (!this.loginForm.valid){
    console.log(this.loginForm.value);
  }
  else {
    //this.loading = this.loadingCtrl.create();
    //this.loading.present();
    this.http.get("https://vroom-83bc4.firebaseio.com/users/student/" + this.loginForm.value.email + ".json")
    .subscribe(data => {
        console.log(data.json().name);
        console.log(data.json().pwd);
        console.log(this.loginForm.value.email);
    }, error => {
        console.log(JSON.stringify(error.json()));
    });
    this.navCtrl.setRoot(LearnPage);

  //this.loading.present();
  }
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
