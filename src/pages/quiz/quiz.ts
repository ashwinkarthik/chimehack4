import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the QuizPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

questions: Array<any>;
isAnswer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage) {
  	this.fetchQuiz("quiz1.json");
    this.questions = this.getQuestions();
    this.isAnswer = [];
    this.isAnswer[0] = [0, 0, 0];
    this.isAnswer[1] = [0, 0, 0];
    this.isAnswer[2] = [0, 0, 0];

    this.isAnswer[0][0] = 0;

    this.isAnswer[0][1] = 0;
    this.isAnswer[0][2] = 0;
    this.isAnswer[1][0] = 0;
    this.isAnswer[1][1] = 0;
    this.isAnswer[1][2] = 0;
    this.isAnswer[2][0] = 0;
    this.isAnswer[2][1] = 0;
    this.isAnswer[2][2] = 0;
  }

  getQuestions(){
      
      return this.questions;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
  }

  returnCss(){
    return this.isAnswer;
  }

  buttonClick(question,questionIndex, answerIndex, button){
    console.log("index12"+button);
    var correctAnswer;
    if(question.answer == "option1")
      correctAnswer=0;
    else if(question.answer == "option2")
      correctAnswer=1;
    else
      correctAnswer=2;
    
    if(answerIndex == correctAnswer){
        console.log("correct answer"+button);
        this.isAnswer[questionIndex][answerIndex]=1;
        
    }else{
        console.log("wrong answer"+button);
        this.isAnswer[questionIndex][answerIndex]=2;
    }

    this.storage.set("survival", true);
  }



  fetchQuiz(key){
  this.http.get("https://vroom-83bc4.firebaseio.com/"+key)
    .subscribe(data => {
        
        this.questions=data.json().questions;
        //console.log("questions-"+this.questions[0].answer);
      }, error => {
   	   // console.log(JSON.stringify(error.json()));
    });
  }
}
