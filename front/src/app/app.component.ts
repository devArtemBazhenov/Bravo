import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public verticalVisible: boolean = !!localStorage.getItem('token');

  public selectOrder: boolean = true;
  public selectCatalog: boolean = false;
  public selectCustom: boolean = false;

  public createdCustomer: boolean = false;
  public createdProduct: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.onSelect(window.location.pathname.split('/')[1]);
  }

  public onSelect(select: string) {
    if (select === 'catalog') {
      this.selectCatalog = true
      this.selectOrder = this.selectCustom = false
    } else if (select === 'customers') {
      this.selectCustom = true
      this.selectCatalog = this.selectOrder = false
    } else {
      this.selectOrder = true
      this.selectCustom = this.selectCatalog = false;
    }

    this.verticalVisible = !!localStorage.getItem('token');
  }

  public createCustomer(value: boolean) {
    this.createdCustomer = value;
  }

  public createProduct(value: boolean) {
    this.createdProduct = value
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/autorization']);
    this.onSelect('autorization');
  }
}
