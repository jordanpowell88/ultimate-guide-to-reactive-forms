import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, filter, take } from 'rxjs/operators';
import { Customer } from './customer';
import { CustomerForm } from './customer-form';
import { CustomerService } from './customer.service';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styles: []
})
export class CustomerComponent implements OnInit {
  form: CustomerForm;

  constructor(private readonly customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService
      .getCustomer()
      .pipe(take(1))
      .subscribe(customer => (this.form = new CustomerForm(customer)));

    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        debounceTime(2000)
      )
      .subscribe(values => this.handleForm(values));
  }

  submit(): void {
    if (this.form.valid) {
      this.handleForm(this.form.value);
    }
  }

  handleForm(customer: Customer): void {
    this.customerService.saveCustomer(customer);
  }
}
