import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { HttpClientModule } from '@angular/common/http';
import { ProfileModule } from './profile/profile.module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AuthModule,
    MessagesModule,
    HttpClientModule,
    ProfileModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chat-app';
}
