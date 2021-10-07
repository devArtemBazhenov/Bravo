import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { AuthorizationComponent } from './authorization/authorization.component';
import { SendConfirmComponent } from './send-confirm/send-confirm.component';
import { GetConfirmComponent } from './get-confirm/get-confirm.component';
import { OrderComponent } from './order/order.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CustomersComponent } from './customers/customers.component';


const routes: Routes = [
  {path: '', redirectTo: 'order', pathMatch: 'full'},
  {path: 'autorization', component: AuthorizationComponent},
  {path: 'confirmcode/:code', component: SendConfirmComponent},
  {path: 'confirming', component: GetConfirmComponent},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
  {path: 'catalog', component: CatalogComponent, canActivate: [AuthGuard]},
  {path: 'customers', component: CustomersComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
