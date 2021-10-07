import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { RequestService } from '../request.service';

export interface PeriodicElement {
  id: number;
  userEmail: string;
  name: string;
  numer: string;
  adress: string;
  days: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, AfterViewInit {
  public ELEMENT_DATA: PeriodicElement[] = [];

  public displayedColumns: string[] = ['numer', 'name', 'adress', 'days'];
  public dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  constructor(private requestService: RequestService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.findCustomer()
  }

  private findCustomer() {
    this.requestService.findCustomer()
      .subscribe(
        (res: any) => {
          this.ELEMENT_DATA = res;
          this.dataSource = new MatTableDataSource<PeriodicElement>(res);
          this.dataSource.paginator = this.paginator;
        },
        err => console.log(err)
      )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchCustom(event: any) {
    if (event.target.value.length === 0) {
      this.findCustomer()
    } else {
      this.requestService.searchCustomer(event.target.value)
        .subscribe(
          (res: any) => {
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<PeriodicElement>(res);
          },
          err => console.log(err)
        )
    }
  }
}
