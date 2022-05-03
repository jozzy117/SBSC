import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible: boolean = false;
  chkPasswordVisible: boolean = false;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  validPattern = "^[a-zA-Z0-9]{10}$"; 
  // validPattern = "^[ A-Za-z0-9_@./#&+-]*$"; 

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      delete this.validateForm.value.checkPassword;
      this.authService.register(this.validateForm.value).subscribe(
        (data: any) => {
        },
        err => {
        }
      )
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  toggleVisibility(el: HTMLElement) {
    var x = document.getElementById(el.id) as HTMLInputElement;
    if (x.type === "password") {
      x.type = "text";
      if(el.id == 'password') {
        this.passwordVisible = true;
      }else {
        this.chkPasswordVisible = true;
      }
    } else {
      x.type = "password";
      if(el.id == 'password') {
        this.passwordVisible = false;
      }else {
        this.chkPasswordVisible = false;
      }
    }
  }

}
