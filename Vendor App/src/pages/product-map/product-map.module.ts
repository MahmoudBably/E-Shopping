import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductMapPage } from './product-map';

@NgModule({
  declarations: [
    ProductMapPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductMapPage),
  ],
})
export class ProductMapPageModule {}
