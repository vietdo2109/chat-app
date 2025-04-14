import { CUSTOM_ELEMENTS_SCHEMA, Input, NgModule } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MyServiceService } from '../services/my-service.service';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    RouterLink,
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatBadgeModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent, // a regular component declared in this module
      },
    ]),
  ],
  declarations: [
    HomeComponent,
    SidebarComponent,
    SidebarButtonComponent,
    DetailComponent,
  ],

  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    HomeComponent,
    SidebarComponent,
    SidebarButtonComponent,
    DetailComponent,
  ],
  providers: [MyServiceService],
})
export class MessagesModule {}
