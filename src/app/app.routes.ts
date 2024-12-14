import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {FrontpageComponent} from '../frontpage/frontpage.component';
import {CaseMakerComponent} from '../case-maker/case-maker.component';
import {AuthGuard} from '../auth.guard';
import {CasesListComponent} from '../cases-list/cases-list.component';
import {NgModule} from '@angular/core';
import {CaseSingelComponent} from '../case-singel/case-singel.component';
import {NotesComponent} from '../cases-list/notes/notes.component';

export const routes: Routes = [
  {path: '', redirectTo: 'frontpage', pathMatch: 'full' },
  {path : 'login', component: LoginComponent},
  {path : 'frontpage', component: FrontpageComponent},
  {path : 'case', component: CaseMakerComponent, canActivate: [AuthGuard]},
  {path : 'caseslist', component: CasesListComponent},
  {path : 'casesingle/:id', component: CaseSingelComponent},
  {path : 'notes/:id', component: NotesComponent}
];
