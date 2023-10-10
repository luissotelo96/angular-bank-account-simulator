import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { MaterialImportsModule } from './material-imports.module';
import { CustomersComponent } from './components/customers/customers.component';

import { HttpClientModule } from '@angular/common/http';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { NewProductDialogComponent } from './components/new-product-dialog/new-product-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { IndexComponent } from './components/index/index.component';
import { CustomerIndexComponent } from './components/customer-index/customer-index.component';
import { ProductsCardsComponent } from './components/products-cards/products-cards.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CustomersComponent,
    CustomerDetailComponent,
    NewProductDialogComponent,
    DialogComponent,
    CustomerFormComponent,
    IndexComponent,
    CustomerIndexComponent,
    ProductsCardsComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
