import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase   from 'firebase';
import { Product } from '../../app/models/products/product';

@IonicPage()
@Component({
  selector: 'page-phones',
  templateUrl: 'phones.html',
})
export class PhonesPage {
  productlist$: Product[]=[] 
  Category:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhonesPage');
  }

  choose()
  {

    firebase.database().ref("product-list").orderByChild('Category').equalTo(this.Category).on("child_added",(child)=>{
      if(child.val().Quantity != "0"){
        var product:Product = {
        } as Product;
        product.key=child.key;
        product.Image=child.val().Image;
        product.Title=child.val().Title;
        product.Description=child.val().Description;
        product.Price=child.val().Price;
        product.Quantity=child.val().Quantity;
        product.location=child.val().location;
        product.VendorID=child.val().VendorID;
        this.productlist$.push(product);
      }
      
  });
  this.productlist$.pop()
  }

}
