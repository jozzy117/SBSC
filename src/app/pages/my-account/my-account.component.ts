import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  isCollapsed = false;
  pageTitle = 'Home';
  accountDetails = {
    accountEmail: 'Jonathan',
    accountPassword: 'password'
  }
  accountEmail = 'Jonathan';
  accountPassword = 'password';
  passwordVisible: boolean = false;
  isEditing: boolean = false;
  tokenExpiration = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.pageTitle = params['pageTitle'];
    });
  }

  ngOnInit(): void {
    this.tokenExpiration = window.localStorage.getItem('tokenExpiration') || '';
  }

  updateAccount() {
    if (!this.isEditing) {
      this.isEditing = true;
    } else {
      this.isEditing = false;
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
