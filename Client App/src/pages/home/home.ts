import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { ProductListService } from '../../app/services/product-list/product-list';
import { Product } from '../../app/models/products/product';
import { ToastService } from '../../app/services/toast/toast';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

declare var FCMPlugin;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  productlist$: Product[]=[]
  ProductPhoto;
  Image;
  recentPostsRef;
  UserID: any;
  constructor(public navCtrl: NavController,
    private productservice: ProductListService,
    private toast: ToastService,
    public db: AngularFireDatabase,
    public fire: AngularFireAuth) {
    
    firebase.database().ref("client-product-list").orderByChild('VendorID').equalTo(this.fire.auth.currentUser.uid).on("child_added",(child)=>{
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
  });
  }


  ionViewDidLoad(){
    FCMPlugin.onNotification(function(data){
      if(data.wasTapped){
        //Notification was received on device tray and tapped by the user.
        alert( JSON.stringify(data) );
      }else{
        //Notification was received in foreground. Maybe the user needs to be notified.
        alert( JSON.stringify(data) );
      }
      });
    
    FCMPlugin.onTokenRefresh(function(token){
        alert( token );
    }); 
  }

  deleteProduct(product: Product)
  {
    this.productservice.deleteProduct(product)
    .then(() => {
      this.toast.show(`${product.Title} Has Been Deleted!`);
      this.navCtrl.push(TabsPage);
    })
  }

  EditProductPage(product: Product){
    this.navCtrl.push("EditProductPage",{
      product
    });
  }


}


