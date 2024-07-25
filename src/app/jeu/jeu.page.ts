import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAlert, IonButton, IonCol,  IonGrid, IonHeader, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonRow, IonText, IonTitle, IonToast, IonToggle, IonToolbar, IonContent, NavController } from '@ionic/angular/standalone';
import { OpenTriviaService } from '../services/open-trivia.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { IonCard, IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-jeu',
  templateUrl: 'jeu.page.html',
  styleUrls: ['jeu.page.scss'],
  standalone: true,
 // imports: [CommonModule, FormsModule, IonicModule, IonAlert, IonButton, IonCard, IonCol, IonGrid, IonHeader, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonRow, IonText, IonTitle, IonToast, IonToggle, IonToolbar, IonContent],
   imports: [CommonModule, FormsModule, IonicModule],
})
export class JeuPage  implements OnInit{
  pseudo: string = '';
  listDifficulties: string[] = ['easy', 'medium', 'hard'];
  difficulty: string = this.listDifficulties[0];
  saveInfos: boolean = false;
  nextQuestion: boolean = false;
  beginGame: boolean = false;
  isAlertOpen = false;
  alertButtons = ['OK'];
  isToastOpen = false;
  messageToast: string = '';
  listQuestions: Question[] = [];
  index: number = 0;
  currentQuestion: Question | undefined;
  score: number = 0;

  constructor(private openTriviaSrv: OpenTriviaService, private activatedRoute: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    this.difficulty = this.activatedRoute.snapshot.params['difficulty'];
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }
  

  begin() {
    if (this.pseudo.length < 3) {
      this.isAlertOpen = true;
    } else {
      this.isAlertOpen = false;
      this.beginGame = true;
     // this.generateListQuestions();
     //this.generateQuestionsOpenTDB(this.difficulty);
     this.generateListQuestions();
    }
  }

  

  generateListQuestions() {
    // On récupère les questions de l'API
    this.openTriviaSrv.getQuestions(this.difficulty).subscribe({
      next: (response: any) => {

        if (response.results) {
          // On parcourt ces questions pour créer la liste de questions du jeu
          response.results.forEach((question: any) => {

          // On crée un tableau de réponses vide
          let answers: Answer[] = [];

          // On parcourt la liste de mauvaises réponses retournée par l'API pour ajouter au tableau des objets "Answer"
          question.incorrect_answers.forEach((element: any) => {
            answers.push({ label: element, isCorrect: false });
          });
          // On ajoute la bonne réponse
          answers.push({ label: question.correct_answer, isCorrect: true });
          
          // Ici on fait un mélange simple du tableau, dans l'absolu on aurait pu aussi utiliser l'algorithme de Fisher-Yates
          answers.sort((a, b) => 0.5 - Math.random());

          // On crée un objet "Question"
          this.listQuestions.push({
            question: question.question,
            listAnswers: answers,
            category: question.category
          });
        });
        this.getCurrentQuestion();
        } else {
          this.messageToast = 'Erreur : impossible de contacter l\'API. Veuillez vérifier votre connexion internet !';
          this.isToastOpen = true;
        }
      }, error: (err) => {
        this.messageToast = err;
        this.isToastOpen = true;
      },
      complete: () => {}
    });
  }

  async generateListQuestionsOpenTDB() {
    const data = this.generateQuestionsOpenTDB;
    console.log(data);
    this.getCurrentQuestion();
  }

  getCurrentQuestion() {
    this.currentQuestion = this.listQuestions[this.index];
  }

  loadNextQuestion() {
    this.nextQuestion = false;
    if (this.index < this.listQuestions.length - 1)
      this.index++;
    this.getCurrentQuestion();
  }

  playAgain() {
    this.nextQuestion = false;
    this.score = 0;
    this.listQuestions = [];
    this.beginGame = false;
    this.index = 0;
  }

  answer(response: Answer) {
    if (response.isCorrect && !this.nextQuestion) {
      this.score++;
    }
    this.nextQuestion = true;
    this.isToastOpen = true;
  }

  setOpen(value: boolean) {
    this.isToastOpen = value;
  }
generateQuestionsOpenTDB(difficulty:string) {
  this.openTriviaSrv.getOpenTDB().subscribe({
    next: (response: any) => {
      console.log(this.currentQuestion);
      response.results.forEach((question: any) => {
        let answers: Answer[] = [];
        question.incorrect_answers.forEach((element: any) => {
          answers.push({ label: element, isCorrect: false });
        });
        answers.push({ label: question.correct_answer, isCorrect: true });
        answers.sort((a, b) => 0.5 - Math.random());
        this.listQuestions.push({
          question: question.question,
          listAnswers: answers,
          category: question.category
        });
      });
      
      console.log(response.results);
      console.log(this.listQuestions);
      
    },
    error: (err) => {
      console.log(err);
    },
    complete: () => {
      console.log('Observable terminé !');
    }
  });
}

}