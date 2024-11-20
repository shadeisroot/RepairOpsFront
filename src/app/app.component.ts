import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {CaseMakerComponent} from '../case-maker/case-maker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CaseMakerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RepairOpsFront';
}
