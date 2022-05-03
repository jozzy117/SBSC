import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account/my-account.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserResolver } from '../shared/shared.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'my-account', component: MyAccountComponent },
  { path: 'users', component: UsersComponent },
  { 
    path: 'user/:id', 
    component: UserComponent,
    resolve: {
      user: UserResolver
    } 
  },
  { path: 'new-user', component: NewUserComponent },
]

@NgModule({
  declarations: [
    MyAccountComponent,
    UsersComponent,
    HomeComponent,
    UserComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserResolver
  ]
})
export class PagesModule { }
