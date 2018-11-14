import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../app/models/products/product';


@IonicPage()
@Component({
  selector: 'page-show-product',
  templateUrl: 'show-product.html',
})
export class ShowProductPage {
  product: Product;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.product = this.navParams.get('product');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowProductPage');
  }
  cancel(){
    this.navCtrl.pop();
  }
}
