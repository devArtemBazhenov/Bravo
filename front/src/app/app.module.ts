import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { AuthorizationComponent } from './authorization/authorization.component';

import { TokenIterceptionService } from './token-iterception.service';
import { SendConfirmComponent } from './send-confirm/send-confirm.component';
import { GetConfirmComponent } from './get-confirm/get-confirm.component';
import { CustomersComponent } from './customers/customers.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreatCustomComponent } from './creat-custom/creat-custom.component';
import { CreateProductComponent } from './create-product/create-product.component';


@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    AuthorizationComponent,
    SendConfirmComponent,
    GetConfirmComponent,
    CustomersComponent,
    CatalogComponent,
    CreatCustomComponent,
    CreateProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIterceptionService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
