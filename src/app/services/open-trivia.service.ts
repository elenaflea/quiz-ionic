import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  private opentdb: string = 'https://opentdb.com/api.php?amount=10';
  private baseURL: string = 'https://opentdb.com/api.php';


  constructor(private http: HttpClient) { }

  async getQuestions1(difficulty: string) {
    return [
      {
        category: "Entertainment: Japanese Anime & Manga",
        type: "multiple",
        difficulty: "easy",
        question: "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?",
        correct_answer: "The Salamander",
        incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"]
      },
      {
        category: "Entertainment: Video Games",
        type: "boolean",
        difficulty: "medium",
        question: "&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz",
        correct_answer: "False",
        incorrect_answers: ["True"]
      }
    ];
  }

  // Autre manière de retourner la liste de questions en asynchrone avec une promesse
  getQuestionsPromise(difficulty: string) {
    return new Promise((resolve, reject) => {
      resolve([
        {
          category: "Entertainment: Japanese Anime & Manga",
          type: "multiple",
          difficulty: "easy",
          question: "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?",
          correct_answer: "The Salamander",
          incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"]
        },
        {
          category: "Entertainment: Video Games",
          type: "boolean",
          difficulty: "medium",
          question: "&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz",
          correct_answer: "False",
          incorrect_answers: ["True"]
        }
      ]);
    });
  }

  getOpenTDB() {
    return this.http.get(this.opentdb);
  }

  getQuestions(difficulty: string, quantity: number = 10) {
    return this.http.get(this.baseURL + '?amount=' + quantity + '&difficulty=' + difficulty)
    .pipe(retry(1), catchError(error => of('Erreur : impossible de contacter l\'API. Veuillez vérifier votre connexion internet !')));
  }
}
