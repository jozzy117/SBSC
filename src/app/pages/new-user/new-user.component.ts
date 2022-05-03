import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  isCollapsed = false;
  pageTitle = 'Home';
  newUser = {
    name: '',
    job: ''
  }
  passwordVisible: boolean = false;
  tokenExpiration = '';
  // isEditing: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
    this.route.queryParams.subscribe(params => {
      this.pageTitle = params['pageTitle'];
    });
  }

  ngOnInit(): void {
    this.tokenExpiration = window.localStorage.getItem('tokenExpiration') || '';
  }

  createUser() {
    this.spinner.show();
    this.userService.createUser(this.newUser).subscribe(
      data => {
        this.spinner.hide();
        this.toastr.success('User created successfully!');
      }
    )
  }

}
