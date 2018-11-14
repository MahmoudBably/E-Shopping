import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Product } from '../../app/models/products/product';
import { ProductListService } from '../../app/services/product-list/product-list';
import { ToastService } from '../../app/services/toast/toast';
import { HomePage } from '../home/home';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase   from 'firebase';
import { AddProductPage } from '../add-product/add-product';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProductLocation } from '../../app/models/location/location';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage extends AddProductPage {
  selectedPhoto;
  loading;
  imagePath="";
  currentImage;
  product: Product;
  ProductLocation: ProductLocation;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productservice: ProductListService,
    public toast: ToastService,
    public loadingCtrl: LoadingController,
    public camera: Camera,
    public mdlCtrl:ModalController,
    public fire: AngularFireAuth,
    public geolocation: Geolocation) {
   
      super(navCtrl,navParams,productservice,toast,loadingCtrl,camera,mdlCtrl,fire,geolocation);
  }

  ionViewWillLoad() {
    
    this.product = this.navParams.get('product');
  }
  
  
  saveProduct(product: Product){
      const uploadTask = firebase.storage().ref("Images/image-"+new Date().getMilliseconds()+".jpg");
      uploadTask.putString(this.imagePath,firebase.storage.StringFormat.DATA_URL).then((snapshot)=>{
        this.product.Image  = snapshot.downloadURL;
        this.productservice.editProduct(product).then(ref => {
              this.toast.show(`${product.Title} Has Been Added!`);
              this.navCtrl.push(HomePage);
            });
      })
     
  }
  
  editTakePhoto(){
    this.product.Image = '';
    super.takePhoto();
  }
  
  editOpenGallery(){
    this.product.Image = '';
    super.openGallery();
  }


  cancel(){
    this.navCtrl.pop()
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
