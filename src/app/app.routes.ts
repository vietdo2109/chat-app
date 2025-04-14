import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'messages',
    loadChildren: () =>
      import('./messages/messages.module').then((m) => m.MessagesModule),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  // {
  //   path: 'messages',
  //   loadChildren: () => import
  // },
];
