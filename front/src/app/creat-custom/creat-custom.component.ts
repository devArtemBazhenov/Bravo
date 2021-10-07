import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppComponent } from '../app.component';
import { RequestService } from '../request.service';
import { CreatCustom } from './creat-custom.interfaces';

@Component({
  selector: 'app-creat-custom',
  templateUrl: './creat-custom.component.html',
  styleUrls: ['./creat-custom.component.scss']
})
export class CreatCustomComponent implements OnInit {

  private creatCustom: CreatCustom = {
    name: '',
    adress: '',
    days: '',
    numer: '',
    userEmail: '',
  }

  private days: Array<string> = [];

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    adress: new FormControl('', [
      Validators.required
    ]),
    check: new FormControl(false, [
      Validators.requiredTrue
    ])
  })

  constructor(private requestService: RequestService,
    private appComponent: AppComponent) { }

  ngOnInit(): void {
  }

  public createCustomer(value: boolean) {
    this.appComponent.createCustomer(value)
  }

  public addDays(day: string) {
    if (this.days.includes(day)) {
      const index = this.days.indexOf(day)
      this.days.splice(index, 1)
    } else {
      this.days.push(day)
    }
  }

  private createCode() {
    if (this.creatCustom.name.split(' ').length < 2) {
      const words = this.creatCustom.name.slice(0, 2).toLocaleUpperCase();
      const numers = Math.floor(Math.random() * (100 - 10) + 10);
      this.creatCustom.numer = words + '-' + numers;
    } else {
      const words = (
        this.creatCustom.name.split(' ')[0].slice(0, 1).toLocaleUpperCase()
          + this.creatCustom.name.split(' ')[1].slice(0, 1).toLocaleUpperCase()
      )
      const numers = Math.floor(Math.random() * (100 - 10) + 10);
      this.creatCustom.numer = words + '-' + numers;
    }
  }

  public addCustomer() {
    this.creatCustom.name = this.form.get('name')?.value;
    this.creatCustom.adress = this.form.get('adress')?.value;
    this.creatCustom.days = this.days.join('/')

    this.createCode()

    this.requestService.addCustomer(this.creatCustom)
      .subscribe(
        res => console.log('link to catalog and add item to order'),
        err => console.log(err)
      )
  }

}
