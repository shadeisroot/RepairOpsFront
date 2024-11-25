import { Routes } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {FrontpageComponent} from '../frontpage/frontpage.component';
import {CaseMakerComponent} from '../case-maker/case-maker.component';
import {AuthGuard} from '../auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'frontpage', pathMatch: 'full' },
  {path : 'login', component: LoginComponent},
  {path : 'frontpage', component: FrontpageComponent},
  {path : 'case', component: CaseMakerComponent, canActivate: [AuthGuard]}
];
