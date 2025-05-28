import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfilePageComponent, // import it temporarily
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./messages/messages.module').then((m) => m.MessagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () => NotFoundComponent,
  },
];
