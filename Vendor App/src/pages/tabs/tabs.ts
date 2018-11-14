import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EditProductPage } from '../edit-product/edit-product';
import { AddProductPage } from '../add-product/add-product';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { LoginPage } from '../login/login';
import { FCM } from '@ionic-native/fcm';

// declare var FCMPlugin;

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fire: AngularFireAuth) {
  }


  Logout(){
    firebase.database().ref("pushtokens").orderByChild('uid').equalTo(this.fire.auth.currentUser.uid).on("child_added",function(snapshot){
      snapshot.ref.remove();
    })
    this.fire.auth.signOut();
    this.navCtrl.pop();
  }

  tab1Root = HomePage;
  tab2Root = AddProductPage;
  // tab3Root = EditProductPage;
z
}
