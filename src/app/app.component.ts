import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthModule, MessagesModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chat-app';
}
