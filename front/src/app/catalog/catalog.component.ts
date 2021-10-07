import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { RequestService } from '../request.service';
import { AppComponent } from '../app.component';

export interface PeriodicElement {
  id: number;
  userEmail: string;
  productCode: string;
  name: string;
  unit: string;
  price: string;
  availability: string;
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, AfterViewInit {
  public ELEMENT_DATA: PeriodicElement[] = [];

  public displayedColumns: string[] = ['productCode', 'name', 'unit', 'price', 'availability', 'actions'];
  public dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  constructor(
    private requestService: RequestService,
    private appComponent: AppComponent
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.findCatalog()
  }

  private findCatalog() {
    this.requestService.findCatalog()
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

  public searchCatalog(event: any) {
    if (event.target.value.length === 0) {
      this.findCatalog()
    } else {
      this.requestService.searchCatalog(event.target.value)
        .subscribe(
          (res: any) => {
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<PeriodicElement>(res);
          },
          err => console.log(err)
        )
    }
  }

  public addProduct() {
    this.appComponent.createProduct(true)
  }
}
