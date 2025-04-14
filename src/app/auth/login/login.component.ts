import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from '../login-form/login-form.component';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  textInput: string = '';
  handleClick(username: string) {
    if (username) console.log(username);
  }
  constructor() {}
}
