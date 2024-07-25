import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAlert, IonButton, IonCol,  IonGrid, IonHeader, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonRow, IonText, IonTitle, IonToast, IonToggle, IonToolbar, IonContent } from '@ionic/angular/standalone';
import { OpenTriviaService } from '../services/open-trivia.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { IonCard, IonicModule } from '@ionic/angular';
// import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../services/storage.service';

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
export class HomePage implements OnInit{
  pseudo: string = '';
  listDifficulties: string[] = ['easy', 'medium', 'hard'];
  difficulty: string = this.listDifficulties[0];
  saveInfos: boolean = false;
  isAlertOpen = false;
  alertButtons = ['OK'];

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    const data: any = this.storageService.getData();
    if(data) {
      this.pseudo = data.pseudo;
      this.difficulty = data.difficulty;
      this.saveInfos = true;
      
    }
   
    
  }

  begin() {
    if (this.pseudo.length < 3) {
      this.isAlertOpen = true;
    } else {
      this.isAlertOpen = false;
      if (this.saveInfos === true) {
        this.storageService.setData({pseudo: this.pseudo, difficulty: this.difficulty});
      } else {
        this.storageService.cleanData();
      }
      this.router.navigate(['/game', this.pseudo, this.difficulty, this.saveInfos]);
    }
  }
}