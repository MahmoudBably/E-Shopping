import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import { Product } from '../../app/models/products/product';
import { Geolocation } from '@ionic-native/geolocation';
import { ProductLocation } from '../../app/models/location/location';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-product-map',
  templateUrl: 'product-map.html',
  providers: [
  ]
})
export class ProductMapPage {

  
  @ViewChild('map') mapRef: ElementRef; 
  mapElement: HTMLElement;
  product: Product;
  ProductLocation: ProductLocation ={} as ProductLocation;
  constructor(public fire : AngularFireAuth, public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    private viewCtrl: ViewController
  )
  {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.product= this.navParams.get('product');
    this.ProductLocation = this.product.location
    this.ProductMap();
   
  }

  ProductMap(){
      const loc = new google.maps.LatLng(this.ProductLocation.Latitude,this.ProductLocation.Longitude);
  
      const options = {
        center: loc,
        zoom: 18
      }
      const map = new google.maps.Map(this.mapRef.nativeElement,options);
      
     this.addMarker(loc,map)
  }

  addMarker(position,map){
    var marker = new google.maps.Marker({
      position,
      map,
      title:'Vendor',
      animation: google.maps.Animation.DROP
    });
  }
  
  Close(){
    this.viewCtrl.dismiss();
  }



}