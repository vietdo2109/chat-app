import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

type LoginData = {
  email: string;
  password: string;
  isRemember: boolean;
  radio?: string;
  colors?: string[];
};

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  standalone: false,
})
export class LoginFormComponent {
  data: LoginData = {
    email: '',
    password: '',
    isRemember: false,
  };

  handleSubmit(object: NgForm) {
    console.log(object.form.value);
  }
}
