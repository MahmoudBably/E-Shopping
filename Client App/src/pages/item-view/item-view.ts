import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../app/models/products/product';
import { ProductListService } from '../../app/services/product-list/product-list';
import { ToastService } from '../../app/services/toast/toast';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

declare var FCMPlugin;

@IonicPage()
@Component({
  selector: 'page-item-view',
  templateUrl: 'item-view.html',
})

export class ItemViewPage {
  firestore = firebase.database().ref('/pushtokens') 
  firemsg = firebase.database().ref('/messages')
  product: Product;
  tempproduct: Product
  QuantityUser= "";
  temp: number;
  VID = "";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productservice: ProductListService,
    public toast: ToastService,
    public fire: AngularFireAuth,
    public db: AngularFireDatabase
  ) {
    
  }

  ionViewWillLoad() {
    this.product = this.navParams.get('product');
    this.VID = this.product.VendorID;
  }

  
 

  tokensetup(){
    var promise = new Promise((resolve, reject) => {
      FCMPlugin.getToken(function(token){
    resolve(token);
      }, (err) => {
        reject(err);
    });
    })
    return promise;
  }

  storetoken(t) {
    this.db.list(this.firestore).push({
      uid: firebase.auth().currentUser.uid,
      devtoken: t
        
    }).then(() => {
      alert('Token stored');
      })
 
    this.db.list(this.firemsg).push({
      sendername: this.fire.auth.currentUser.uid,
      message: "("+this.fire.auth.currentUser.email + ")" + " Bought (" + this.product.Title+")"
    }).then(() => {
      alert('Item Sold');
      })
  }


  cancel(){
    this.navCtrl.pop()

  }

  buy(){
   var product: Product
    this.product.Quantity -= parseInt(this.QuantityUser)
    this.productservice.editProduct(this.product);
    this.tempproduct= this.product
    this.tempproduct.VendorID =this.fire.auth.currentUser.uid
    this.tempproduct.Quantity = parseInt(this.QuantityUser);
    this.productservice.addProduct(this.tempproduct).then(ref => {
      this.toast.show(`${this.product.Title} Has Been Added!`);
      this.tokensetup().then((token)=>{
        this.storetoken(token);
      });
      this.navCtrl.popToRoot()
    });
    
  }

}
