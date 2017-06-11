import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators  } from '@angular/forms';
import { AuthProvider } from '../providers/auth/auth';
import { HomePage } from '../pages/home/home';
import {ResetPasswordPage} from '../pages/reset-password/reset-password';
import {
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
  AlertController } from 'ionic-angular';

/*
  Generated class for the EmailValidator provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EmailValidator {

  static isValid(control: FormControl){
    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(control.value);

    return null;
  }

  public loginForm:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public authProvider: AuthProvider, public formBuilder: FormBuilder, public http: Http) {

    this.http = http;
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required,
        EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6),
        Validators.required])]
    });
  }

  loginUser(): void {
  console.log('nayan');
  if (!this.loginForm.valid){
    console.log(this.loginForm.value);
  }
  else {
    this.http.get("https://vroom-83bc4.firebaseio.com/users/student/emma.json")
    .subscribe(data => {
        console.log(data.json().birthday);
    }, error => {
        console.log(JSON.stringify(error.json()));
    });
    authData => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot(HomePage);
      });
    };
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}

//goToSignup(): void { this.navCtrl.push('signup'); }

goToResetPassword(): void { this.navCtrl.push('reset-password'); }

}
