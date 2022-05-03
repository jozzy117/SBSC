import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
      // password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.spinner.show();
      this.authService.login(this.validateForm.value).subscribe(
        (data: any) => {
          localStorage.setItem('token', data.token);
          this.toastr.success('Login successfully!');
          setTimeout(function() {
            location.href = '/home';
          }, 2000);
          this.spinner.hide();
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

  toggleVisibility() {
    var x = document.getElementById("passwordInput") as HTMLInputElement;
    if (x.type === "password") {
      x.type = "text";
      this.passwordVisible = true;
    } else {
      x.type = "password";
      this.passwordVisible = false;
    }
  }

}
