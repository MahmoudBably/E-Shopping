import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowProductPage } from './show-product';

@NgModule({
  declarations: [
    ShowProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowProductPage),
  ],
})
export class ShowProductPageModule {}
