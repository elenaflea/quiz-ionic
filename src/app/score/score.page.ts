import { StorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ScorePage implements OnInit {
  score: number = 0;
  photo: string = '';
  saveInfos: string ='false';

  constructor(private activatedRoute: ActivatedRoute, private navCtrl: NavController, private storageService: StorageService) { }

  async ngOnInit() {
    this.score = parseInt(this.activatedRoute.snapshot.params['score']);
    this.saveInfos= this.activatedRoute.snapshot.params['saveInfos'];
    console.log(this.saveInfos);
    if(this.saveInfos === "true") {
      const oldScore: number =  await(this.storageService.getScore());
      console.log(oldScore);
      const totalScore : number = this.score + oldScore;
      this.storageService.setScore(totalScore);
    }
  }

  goHome() {
    this.navCtrl.navigateBack('/home');
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    if (image.webPath) {
      this.photo = image.webPath;
    }
  }
}
