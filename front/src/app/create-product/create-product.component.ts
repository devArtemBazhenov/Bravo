import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppComponent } from '../app.component';
import { RequestService } from '../request.service';

import { ProductCreate } from './create-product.interfaces';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  private product: ProductCreate = {
    productCode: '',
    name: '',
    unit: '',
    price: '',
    availability: 'In stock',
  };

  public form: FormGroup = new FormGroup({
    productCode: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    unit1: new FormControl('', [Validators.required]),
    price1: new FormControl('', [Validators.required]),
    unit2: new FormControl(''),
    price2: new FormControl(''),
    unit3: new FormControl(''),
    price3: new FormControl(''),
  });

  public unitArray: Array<number> = [1];
  private unitDeleteArray: Array<number> = [];

  public codeCreated: boolean = false;
  public addUnitButton: boolean = true;

  constructor(
    private requestService: RequestService,
    private appComponent: AppComponent,
  ) {}

  ngOnInit(): void {}

  public creatProduct(value: boolean) {
    this.appComponent.createProduct(value);
  }

  public addUnit() {
    if (this.unitDeleteArray.length === 0) {
      this.unitArray.push(this.unitArray.length + 1);
    } else {
      this.unitDeleteArray.sort();

      this.unitArray.push(this.unitDeleteArray[0]);
      this.unitDeleteArray.splice(0, 1);
    }

    if (this.unitArray.length === 3) {
      this.addUnitButton = false;
    }
  }

  public deleteUnit(number: number) {
    const index = this.unitArray.indexOf(number);

    this.unitDeleteArray.push(number);
    this.unitArray.splice(index, 1);

    this.form.get('unit' + number)?.patchValue('');
    this.form.get('price' + number)?.patchValue('');
    this.addUnitButton = true;
  }

  public selectAvailab(availab: any) {
    this.product.availability = availab.target.value;
  }

  private optionProduct() {
    this.product.productCode = this.form.get('productCode')?.value;
    this.product.name = this.form.get('name')?.value;
    this.product.unit =
      this.form.get('unit1')?.value.trim() +
      ' ' +
      this.form.get('unit2')?.value.trim() +
      ' ' +
      this.form.get('unit3')?.value.trim();

    this.product.price =
      this.form.get('price1')?.value.trim() +
      ' ' +
      this.form.get('price2')?.value.trim() +
      ' ' +
      this.form.get('price3')?.value.trim();
  }

  public addProduct() {
    this.optionProduct()

    this.requestService.addProduct(this.product)
      .subscribe(
        (res: any) => {
          this.creatProduct(false)
        },
        (err: any) => {
          if (err.error === 'find code') {
            this.codeCreated = true
          }
        }
      )
  }
}
