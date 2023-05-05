import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserForm } from 'src/app/models/user-form.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @Input() secondaryButtonText: string;
  @Input() title: string;
  @Input() redirectLink: string;
  @Output() submitForm: EventEmitter<UserForm> = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: [''],
    });
  }

  ngOnInit(): void {
    if (this.title == 'Change Password') {
      this.form.controls['newPassword'].setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      this.form.controls['email'].setValidators([Validators.required, Validators.email]);
    }
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value as UserForm);
    }
  }
}
