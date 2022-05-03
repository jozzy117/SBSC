import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isCollapsed = false;
  pageTitle = 'Home';
  users: any = [];
  tokenExpiration = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private route: ActivatedRoute, private userService: UserService, private spinner: NgxSpinnerService) {
    this.route.queryParams.subscribe(params => {
      this.pageTitle = params['pageTitle'];
    });
  }
  ngOnInit(): void {
    this.tokenExpiration = window.localStorage.getItem('tokenExpiration') || '';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      processing: true
    }
    this.spinner.show();
    this.userService.getUsers().subscribe((data: any) => {
      this.spinner.hide();
      this.users = data.data;
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
