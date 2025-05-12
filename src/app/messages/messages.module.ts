import { CUSTOM_ELEMENTS_SCHEMA, Input, NgModule } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MyServiceService } from '../services/my-service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';
import { RouterLink } from '@angular/router';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { MessageButtonComponent } from './message-button/message-button.component';
import { MessageTextareaComponent } from './message-textarea/message-textarea.component';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { ChatslotComponent } from './chatslot/chatslot.component';
import { MessageComponent } from './message/message.component';
import { ChatService } from '../services/chat.service';
import { ConversationComponent } from './conversation/conversation.component';
import { GroupComponent } from './group/group.component';

@NgModule({
  imports: [
    FormsModule,
    RouterLink,
    CommonModule,
    TimeAgoPipe,
    HttpClientModule,
    MatIconModule,
    MatBadgeModule,
    RouterModule.forChild([
      {
        path: 'groups/:groupId',
        component: GroupComponent, // a regular component declared in this module
      },
      {
        path: 'groups',
        component: HomeComponent, // a regular component declared in this module
      },
      {
        path: ':conversationId',
        component: ConversationComponent, // a regular component declared in this module
      },
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        component: NotFoundComponent,
      },
    ]),
  ],
  declarations: [
    HomeComponent,
    SidebarComponent,
    SidebarButtonComponent,
    MessageButtonComponent,
    MessageTextareaComponent,
    ChatslotComponent,
    MessageComponent,
    ConversationComponent,
    GroupComponent,
  ],

  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    HomeComponent,
    SidebarComponent,
    SidebarButtonComponent,
    MessageButtonComponent,
    MessageTextareaComponent,
    ChatslotComponent,
    MessageComponent,
    ConversationComponent,
    GroupComponent,
  ],
  providers: [MessageService, ChatService],
})
export class MessagesModule {}
