import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrls: ['./list-expense.component.css']
})
export class ListExpenseComponent implements OnInit {

  expenses: Expense[] = [];

  filters = {
    keyword: '',
    sortBy: `5`
  };
  // tslint:disable-next-line:variable-name
  constructor(private _expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.listExpenses();
  }

  // tslint:disable-next-line:typedef
  listExpenses() {
    this._expenseService.getExpenses().subscribe(
      data => this.expenses = this.filterExpenses(data)
    );
  }

  // tslint:disable-next-line:typedef
  filterExpenses(expenses: Expense[]) {
    return expenses.filter((e) => {
      return e.name.toLowerCase().includes(this.filters.keyword.toLowerCase());
    }).sort((a, b) => {
      if (this.filters.sortBy === `1`) {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
      }else if (this.filters.sortBy === `2`) {
        return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
      }else if (this.filters.sortBy === `3`) {
        return a.amount <= b.amount ? -1 : 1;
      }else if (this.filters.sortBy === `4`) {
        return a.amount > b.amount ? -1 : 1;
      }else if (this.filters.sortBy === `5`) {
        return a.localDate > b.localDate ? -1 : 1;
      }else if (this.filters.sortBy === `6`) {
        return a.localDate > b.localDate ? 1 : -1;
      }
    });
  }

  deleteExpanse(id: number): void {
    this._expenseService.deleteExpanse(id).subscribe(
      data => {
        console.log('deleted response', data);
        this.listExpenses();
      });
  }
}
