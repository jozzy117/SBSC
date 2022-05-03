import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isCollapsed = false;
  pageTitle = 'User Details';
  passwordVisible: boolean = false;
  isEditing: boolean = false;
  user: any;
  fullName = '';
  tokenExpiration = '';

  constructor(private route: ActivatedRoute, private userService: UserService, private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'].data;
    this.fullName = this.user.first_name + ' ' + this.user.last_name;
    this.tokenExpiration = window.localStorage.getItem('tokenExpiration') || '';
  }

  updateUser() {
    if (!this.isEditing) {
      this.isEditing = true;
    } else {
      const objData = {
        name: this.fullName,
        job: this.user.email
      }
      this.spinner.show();
      this.userService.updateUser(this.user.id, objData).subscribe(
        data => {
          this.spinner.hide();
          this.isEditing = false;
          this.toastr.success('User updated successfully!');
        }
      )
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
