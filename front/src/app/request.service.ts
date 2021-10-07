import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private role!: boolean

  private findOrderUrl = "http://localhost:3000/request/findorder";
  private findCustomerUrl = "http://localhost:3000/request/findcustomer";
  private findCatalogUrl = "http://localhost:3000/request/findcatalog";

  private searchOrderUrl = "http://localhost:3000/request/searchorder";
  private searchCustomerUrl = "http://localhost:3000/request/searchcustomer";
  private searchCatalogUrl = "http://localhost:3000/request/searchcatalog";

  private checkCustomerUrl = "http://localhost:3000/request/checkcustomer";
  private addCustomerUrl = "http://localhost:3000/request/addcustomer";
  private addProductUrl = "http://localhost:3000/request/addproduct";

  constructor(private http: HttpClient) { }

  //find
  public findOrder() {
    return this.http.get(this.findOrderUrl)
  }

  public findCustomer() {
    return this.http.get(this.findCustomerUrl)
  }

  public findCatalog() {
    return this.http.get(this.findCatalogUrl)
  }

  //search
  public searchOrder(string: string) {
    const obj = {text: string}
    return this.http.post(this.searchOrderUrl, obj)
  }

  public searchCustomer(string: string) {
    const obj = {text: string}
    return this.http.post(this.searchCustomerUrl, obj)
  }

  public searchCatalog(string: string) {
    const obj = {text: string}
    return this.http.post(this.searchCatalogUrl, obj)
  }

  //check
  public checkCustomer() {
    return this.http.get(this.checkCustomerUrl)
  }

  //add
  public addCustomer(customer: object) {
    return this.http.post(this.addCustomerUrl, customer)
  }

  public addProduct(product: object) {
    return this.http.post(this.addProductUrl, product)
  }

}
