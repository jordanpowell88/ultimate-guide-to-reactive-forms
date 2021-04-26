import { Component, Input, OnInit } from "@angular/core";
import { take } from "rxjs/operators";
import { CustomerForm } from "./customer-form";
import { CustomerService } from "./customer.service";

@Component({
  selector: "customer",
  templateUrl: "./customer.component.html",
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
  }
}
