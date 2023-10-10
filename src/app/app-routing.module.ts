import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { IndexComponent } from './components/index/index.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CustomerIndexComponent } from './components/customer-index/customer-index.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: 'customer', component: CustomerIndexComponent, children: [
      { path: 'productDetail/:financialProductId', component: ProductDetailComponent }
    ]
  },
  {
    path: 'admin', component: SidebarComponent, children: [
      { path: 'customers', component: CustomersComponent },
      { path: 'customerDetail/:customerid', component: CustomerDetailComponent },
      { path: 'customer', component: CustomerFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
