import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'jeu',
    loadComponent: () => import('./jeu/jeu.page').then( m => m.JeuPage)
  },
  {
    path: 'jeu/:difficulty',
    loadComponent: () => import('./jeu/jeu.page').then( m => m.JeuPage)
  },
  {
    path: 'game/:pseudo/:difficulty/:saveInfos',
    loadComponent: () => import('./game/game.page').then( m => m.GamePage)
  },
  {
    path: 'score/:score',
    loadComponent: () => import('./score/score.page').then( m => m.ScorePage)
  },
];
