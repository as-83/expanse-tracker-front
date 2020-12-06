import { Component, OnInit } from '@angular/core';
import {Expense} from '../../models/expense';
import {ExpenseService} from '../../services/expense.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-expanse',
  templateUrl: './add-expanse.component.html',
  styleUrls: ['./add-expanse.component.css']
})
export class AddExpanseComponent implements OnInit {
  expense: Expense = new Expense();

  // tslint:disable-next-line:variable-name
  constructor(private _expenseService: ExpenseService,
              // tslint:disable-next-line:variable-name
              private _router: Router,
              private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    const isIdPresent = this.activatedRout.snapshot.paramMap.has('id');
    if (isIdPresent){
      const id = +this.activatedRout.snapshot.paramMap.get('id');
      this._expenseService.getExpense(id).subscribe(
        data => this.expense = data
      );
    }else{
      this.expense.localDate = new Date().toISOString().split('T')[0];
    }
  }

  // tslint:disable-next-line:typedef
  saveExpense(){
  this._expenseService.saveExpense(this.expense).subscribe(
    data => {
      // console.log('response', data);
      this._router.navigateByUrl('/');
    }
  );
  }

  deleteExpanse(id: number): void {
    this._expenseService.deleteExpanse(id).subscribe(
      data => {
        // console.log('deleted response', data);
        this._router.navigateByUrl('/');
      });
  }
}
