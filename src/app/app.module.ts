import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ListExpenseComponent } from './components/list-expense/list-expense.component';
import { AddExpanseComponent } from './components/add-expanse/add-expanse.component';

const routs: Routes = [
  {path: 'expenses', component: ListExpenseComponent},
  {path: 'addexpense', component: AddExpanseComponent},
  {path: 'editexpense/:id', component: AddExpanseComponent},
  {path: '', redirectTo: '/expenses', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ListExpenseComponent,
    AddExpanseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routs)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
