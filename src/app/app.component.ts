import {Component, NgModule} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {CaseMakerComponent} from '../case-maker/case-maker.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from '../jwt.interceptor';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CaseMakerComponent, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}]
})

export class AppComponent {
  title = 'RepairOpsFront';
}
