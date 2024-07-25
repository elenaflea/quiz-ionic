import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonButton, IonCol, IonGrid, IonHeader, IonRow, IonText, IonTitle, IonToast, IonToolbar, IonContent } from '@ionic/angular/standalone';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { OpenTriviaService } from '../services/open-trivia.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonButton, IonCol, IonGrid, IonHeader, IonRow, IonText, IonTitle, IonToast, IonToolbar, IonContent, RouterLink],
})
export class GamePage implements OnInit {
  pseudo: string = '';
  difficulty: string = 'easy';
  nextQuestion: boolean = false;
  isToastOpen = false;
  messageToast: string = '';
  listQuestions: Question[] = [];
  index: number = 0;
  currentQuestion: Question | undefined;
  score: number = 0;

  constructor(private openTriviaSrv: OpenTriviaService,
              private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.pseudo = this.activatedRoute.snapshot.params['pseudo'];
    this.difficulty = this.activatedRoute.snapshot.params['difficulty'];
    this.generateListQuestions();

    const languages = await TextToSpeech.getSupportedLanguages();
    console.log(languages);
    const voices = await TextToSpeech.getSupportedVoices();
    console.log(voices);
  }

  // Utilisation du plugin :
  // https://github.com/capacitor-community/text-to-speech
  async readText(textToRead: string | undefined) {
    if (textToRead) {
      await TextToSpeech.speak({
        text: textToRead,
        lang: 'fr-FR',
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient',
      });
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

  getCurrentQuestion() {
    this.currentQuestion = this.listQuestions[this.index];
  }

  loadNextQuestion() {
    this.nextQuestion = false;
    if (this.index < this.listQuestions.length - 1)
      this.index++;
    this.getCurrentQuestion();
  }

  answer(response: Answer) {
    this.readText(response.label);
    if (response.isCorrect && !this.nextQuestion) {
      this.score++;
      this.messageToast = 'Votre score est de ' + this.score;
    }
    this.nextQuestion = true;
    this.isToastOpen = true;
  }

  setOpen(value: boolean) {
    this.isToastOpen = value;
  }
}
