import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';

import { Product } from '../../app/models/products/product';
import { Geolocation } from '@ionic-native/geolocation';
import { ProductLocation } from '../../app/models/location/location';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [
  ]
})
export class MapPage {

  
  @ViewChild('map') mapRef: ElementRef;
  mapElement: HTMLElement;
  product: Product;
  ProductLocation: ProductLocation ={
    Latitude: 0,
    Longitude: 0
  }
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    private viewCtrl: ViewController
  )
  {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.product = this.navParams.get('product');
    this.AddMap();
   
  }

  AddMap(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.ProductLocation.Latitude = resp.coords.latitude
      this.ProductLocation.Longitude= resp.coords.longitude
      const location = new google.maps.LatLng(this.ProductLocation.Latitude,this.ProductLocation.Longitude);
  
      const options = {
        center: location,
        zoom: 18
      }
      const map = new google.maps.Map(this.mapRef.nativeElement,options);
      
      var marker = new google.maps.Marker({
        position: {
          lat:this.ProductLocation.Latitude,
          lng:this.ProductLocation.Longitude,
        },
        map,
        draggable: true,
      });
      google.maps.event.addListener(marker,'dragend',()=>{
        this.ProductLocation.Latitude = marker.getPosition().lat()
        this.ProductLocation.Longitude= marker.getPosition().lng()
        console.log(this.ProductLocation)
      });
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  
  Close(){
    this.viewCtrl.dismiss(this.ProductLocation);
  }

 loadVendorMap(product: Product) {
  
   }



}