import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAlert, IonButton, IonCol,  IonGrid, IonHeader, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonRow, IonText, IonTitle, IonToast, IonToggle, IonToolbar, IonContent } from '@ionic/angular/standalone';
import { OpenTriviaService } from '../services/open-trivia.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { IonCard, IonicModule } from '@ionic/angular';
// import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
 // imports: [CommonModule, FormsModule, IonicModule, IonAlert, IonButton, IonCard, IonCol, IonGrid, IonHeader, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonRow, IonText, IonTitle, IonToast, IonToggle, IonToolbar, IonContent],
   imports: [CommonModule, FormsModule, IonicModule],
   
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class HomePage {
  pseudo: string = '';
  listDifficulties: string[] = ['easy', 'medium', 'hard'];
  difficulty: string = this.listDifficulties[0];
  saveInfos: boolean = false;
  isAlertOpen = false;
  alertButtons = ['OK'];

  constructor(private router: Router) { }

  begin() {
    if (this.pseudo.length < 3) {
      this.isAlertOpen = true;
    } else {
      this.isAlertOpen = false;
      this.router.navigate(['/game', this.pseudo, this.difficulty]);
    }
  }
}