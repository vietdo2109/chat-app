import { CUSTOM_ELEMENTS_SCHEMA, Input, NgModule } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
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
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AiComponent } from './ai/ai.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MessagePendingComponent } from './message-pending/message-pending.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateAiModalComponent } from './create-ai-modal/create-ai-modal.component';
import { MatLabel } from '@angular/material/form-field';

@NgModule({
  imports: [
    FormsModule,
    RouterLink,
    CommonModule,
    TimeAgoPipe,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    SidebarComponent,
    MatBadgeModule,
    MatLabel,
    InfiniteScrollDirective,
    InfiniteScrollModule,
    RouterModule.forChild([
      {
        path: 'ais/:aiId',
        component: AiComponent, // a regular component declared in this module
      },
      {
        path: 'ais',
        component: HomeComponent, // a regular component declared in this module
      },
      {
        path: 'groups/:groupId',
        component: GroupComponent, // a regular component declared in this module
      },
      {
        path: 'groups',
        component: HomeComponent, // a regular component declared in this module
      },
      {
        path: 'conversations/:conversationId',
        component: ConversationComponent, // a regular component declared in this module
      },
      {
        path: 'conversations',
        component: HomeComponent,
      },
      { path: '', redirectTo: 'conversations', pathMatch: 'full' },

      {
        path: '**',
        pathMatch: 'full',
        component: NotFoundComponent,
      },
    ]),
  ],
  declarations: [
    HomeComponent,
    MessageButtonComponent,
    MessageTextareaComponent,
    ChatslotComponent,
    MessageComponent,
    ConversationComponent,
    GroupComponent,
    AiComponent,
    MessagePendingComponent,
    CreateAiModalComponent,
  ],

  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    HomeComponent,
    MessageButtonComponent,
    MessageTextareaComponent,
    ChatslotComponent,
    MessageComponent,
    ConversationComponent,
    GroupComponent,
    AiComponent,
    MessagePendingComponent,
    CreateAiModalComponent,
  ],
  providers: [
    MessageService,
    ChatService,
    InfiniteScrollDirective,
    AuthService,
  ],
})
export class MessagesModule {}
