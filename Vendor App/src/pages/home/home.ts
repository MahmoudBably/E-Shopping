import { Component, EventEmitter } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { ProductListService } from '../../app/services/product-list/product-list';
import { Product } from '../../app/models/products/product';
import { ToastService } from '../../app/services/toast/toast';
import { EditProductPage } from '../edit-product/edit-product';
import firebase   from 'firebase';
import { TabsPage } from '../tabs/tabs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireAuth } from 'angularfire2/auth';
// import { LocalNotifications } from '@ionic-native/local-notifications';

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
  ref = firebase.database().ref("product-list");
  
  
  constructor(public navCtrl: NavController,private productservice: ProductListService,private toast: ToastService,public db: AngularFireDatabase,
  public fire: AngularFireAuth) {
    firebase.database().ref("product-list").orderByChild('VendorID').equalTo(this.fire.auth.currentUser.uid).on("child_added",(child)=>{
      var product:Product = {
      } as Product;
      product.key=child.key;
      product.Image=child.val().Image;
      product.Title=child.val().Title;
      product.Description=child.val().Description;
      product.Price=child.val().Price;
      product.Quantity=child.val().Quantity;
      product.location=child.val().location;
      this.productlist$.push(product);
  });

  // firebase.database().ref().on('value', function(snapshot) {
  //   (snapshot)=>{
  //     this.notify()
  //   }
  // });
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

  // notify(){
  //   this.localNotifications.schedule({
  //     id: 1,
  //     text: 'Single ILocalNotification',
  //     sound: 'default',
  //   });
  // }


}


