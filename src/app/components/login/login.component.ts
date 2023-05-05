import { Component } from '@angular/core';
import { UserForm } from 'src/app/models/user-form.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginTitle: string = 'Login';
  secondaryButtonTitle: string = 'Register';
  registerUrl: string = '/register';
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) { }

  login(): void {
    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  onSubmitForm(formValues: UserForm): void {
    this.email = formValues.email;
    this.password = formValues.password;
    this.login();
  }
}
