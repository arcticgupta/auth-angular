import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddListComponent } from './add-list/add-list.component';
import { ViewListComponent } from './view-list/view-list.component'
import { ListService } from './services/list.service';
import { AuthenticationService } from './services/authentication.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'view', component: ViewListComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AddListComponent,
    ViewListComponent,
    NavbarComponent,
    LoginComponent,
    UsersComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
  ],
  providers: [ListService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
