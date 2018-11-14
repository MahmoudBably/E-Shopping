import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PhonesPage } from '../phones/phones';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  firestore = firebase.database().ref('/pushtokens') 
  firemsg = firebase.database().ref('/messages')
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase,
  public fire: AngularFireAuth) {
    
  }

  Logout(){
    firebase.database().ref("pushtokens").orderByChild('uid').equalTo(this.fire.auth.currentUser.uid).on("child_added",function(snapshot){
      snapshot.ref.remove();
    })
    this.fire.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }
  
  tab1Root = HomePage;
  tab3Root = PhonesPage;


}
