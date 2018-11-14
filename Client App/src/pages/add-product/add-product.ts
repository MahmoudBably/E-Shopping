import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { Product } from '../../app/models/products/product';
import { ProductListService } from '../../app/services/product-list/product-list';
import { ToastService } from '../../app/services/toast/toast';
import * as firebase   from 'firebase';
import { environment } from '../../environments/environment'

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Location } from '@angular/common';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

    
    ProductLocation: Location;
    imagePath = " ";
    selectedPhoto;
    loading;
    currentImage;
    ProductPhoto;
    userID: any;
    category;
    product:Product = {
    } as Product;
    constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public productservice: ProductListService,
      public toast: ToastService,
      public loadingCtrl: LoadingController,
      public camera: Camera,
      public mdlCtrl:ModalController,
      public fire: AngularFireAuth) {
      
     
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad AddProductPage');
      this.fire.authState.subscribe(user  =>{
        if (user) {
          this.userID = user.uid
          console.log(this.userID)
        }
      })
    }

    upLoad(product: Product){
      const uploadTask = firebase.storage().ref("Images/image-"+new Date().getMilliseconds()+".jpg");
      uploadTask.putString(this.imagePath,firebase.storage.StringFormat.DATA_URL).then((snapshot)=>{
        this.product.Image  = snapshot.downloadURL;
        this.product.location = this.ProductLocation;
        this.product.VendorID = this.userID
        const FacultyListRef=firebase.database().ref('product-list');
        FacultyListRef.push(this.product).then(ref => {
              this.toast.show(`${product.Title} Has Been Added!`);
              this.navCtrl.push(HomePage);
            });;
      })
}
  
    LocationMap(){
      const modal = this.mdlCtrl.create('MapPage');
      modal.present();
      modal.onDidDismiss((data)=>{
        if(data){
          this.ProductLocation = data;
        }
      });
    }
    ChooseLocation(){
      const modal = this.mdlCtrl.create('SetLocationModalPage');
      modal.present();
    }
  
    takePhoto(){    
      this.camera.getPicture({
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.CAMERA,
      encodingType:this.camera.EncodingType.JPEG,
      correctOrientation:true,
      targetHeight:300,
      targetWidth:300,
      cameraDirection:this.camera.Direction.FRONT,
      quality:50,
      mediaType:this.camera.MediaType.PICTURE,
      })
      .then(imagedata=>{
        this.imagePath = "data:image/jpeg;base64,"+imagedata;
        this.currentImage = 'data:image/jpeg;base64,'+imagedata;
      })
      .catch((error)=>{
        this.toast.show('Error in Capturing Image : '+'{{error}}')
      })
    }
    openGallery(){
      this.camera.getPicture({
        destinationType:this.camera.DestinationType.DATA_URL,
        sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType:this.camera.EncodingType.JPEG,
        correctOrientation:true,
        targetHeight:300,
        targetWidth:300,
        cameraDirection:this.camera.Direction.FRONT,
        quality:50,
        mediaType:this.camera.MediaType.PICTURE,
        })
        .then((imagedata:string)=>{
         
          this.imagePath = 'data:image/jpeg;base64,'+imagedata;
          this.currentImage = 'data:image/jpeg;base64,'+imagedata;
         })
        .catch((error)=>{ 
            this.toast.show(' Error in getting Image : '+'{{error}}')
          })                                          
    }
   
}
