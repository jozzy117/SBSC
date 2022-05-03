import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isCollapsed = false;
  pageTitle = 'Home';
  tokenExpiration = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.pageTitle = (params['pageTitle']) ? params['pageTitle'] : 'Home';
    });
  }
  
  ngOnInit(): void {
    this.tokenExpiration = window.localStorage.getItem('tokenExpiration') || '';
  }

}
