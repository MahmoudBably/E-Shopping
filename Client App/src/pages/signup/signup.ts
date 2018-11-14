import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email : string = '';
  password : string = '';
  constructor(public fire : AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,public  db: AngularFireDatabase) {
    
  }

  mySignUp(email: string, password: string){

    this.fire.auth.createUserWithEmailAndPassword(this.email, this.password).then(user=>{
      var Clients = this.db.database.ref("Clients")
      var UserID = this.fire.auth.currentUser.uid
      Clients.child(UserID).set({
        email : email,
      }).then(newPerson=>{
        this.navCtrl.setRoot(TabsPage);
      }, error=>{
        console.log(error);
      });
      
    }).catch(function(error) {
      alert("Couldn't add new user!");
    });
  }

}
