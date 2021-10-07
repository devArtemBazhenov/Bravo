import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RequestService } from '../request.service';
import { AppComponent } from '../app.component';

export interface PeriodicElement {
  id: number;
  userEmail: string;
  orderNumer: string;
  customerName: string;
  customerNumer: string;
  catalogNum: string;
  orderNotes: string;
  orderCreated: string;
  orderDay: string;
  orderStatus: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewInit {
  public ELEMENT_DATA: PeriodicElement[] = [];

  public displayedColumns: string[] = ['orderNo', 'customerName', 'customerNo', 'items', 'notes', 'ordered', 'delivery', 'status'];
  public dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  constructor(private requestService: RequestService,
    private appComponent: AppComponent) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.findOrder()
  }

  private findOrder() {
    this.requestService.findOrder()
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

  public searchOrder(event: any) {
    if (event.target.value.length === 0) {
      this.findOrder()
    } else {
      this.requestService.searchOrder(event.target.value)
        .subscribe(
          (res: any) => {
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<PeriodicElement>(res);
          },
          err => console.log(err)
        )
    }
  }

  public addOrder() {
    this.requestService.checkCustomer()
      .subscribe(
        res => {
          if (!res) {
            this.appComponent.createCustomer(true)
          } else {
            console.log('link to catalog and add item to order')
          }
        },
        err => console.log(err)
      )
  }
}
