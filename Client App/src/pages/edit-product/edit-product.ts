import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Product } from '../../app/models/products/product';
import { ProductListService } from '../../app/services/product-list/product-list';
import { ToastService } from '../../app/services/toast/toast';
import { HomePage } from '../home/home';
import { Location } from '@angular/common';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';


import * as firebase   from 'firebase';
import { AddProductPage } from '../add-product/add-product';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  selectedPhoto;
  loading;
  currentImage;
  product: Product;
  ProductLocation: Location;
  constructor(public navCtrl: NavController, public navParams: NavParams,public productservice: ProductListService,
    public toast: ToastService,public mdlCtrl: ModalController) {
   
      
  }

  ionViewWillLoad() {
    
    this.product = this.navParams.get('product');
  }
  
  saveProduct(product: Product)
  {
    
    this.productservice.editProduct(product).then(()=>{
      this.toast.show(`${product.Title} Has Been Updated!`);
      console.log(product.key)
      this.navCtrl.pop();
    });
  }
  
  LocationMap(){
    const modal = this.mdlCtrl.create('MapPage');
    modal.present();
    modal.onDidDismiss((data)=>{
      if(data){
        this.ProductLocation = data;
        this.product.location = this.ProductLocation;
      }
    });
  }

  onError = (error) => {
    console.log(error);
    this.loading.dismiss();
  }



  
    
}
