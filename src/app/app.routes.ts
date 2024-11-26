import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {FrontpageComponent} from '../frontpage/frontpage.component';
import {CaseMakerComponent} from '../case-maker/case-maker.component';
import {AuthGuard} from '../auth.guard';
import {CasesListComponent} from '../cases-list/cases-list.component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {path: '', redirectTo: 'caseslist', pathMatch: 'full' },
  {path : 'login', component: LoginComponent},
  {path : 'frontpage', component: FrontpageComponent},
  {path : 'case', component: CaseMakerComponent, canActivate: [AuthGuard]},
  {path : 'caseslist', component: CasesListComponent}
];
