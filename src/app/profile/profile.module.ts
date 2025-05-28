import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MessagesModule } from '../messages/messages.module';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    MessagesModule,
    FormsModule,
    RouterLink,
    SidebarComponent,
    RouterModule.forChild(routes),
  ],
  declarations: [ProfilePageComponent],
  exports: [ProfilePageComponent],
  providers: [],
})
export class ProfileModule {}
