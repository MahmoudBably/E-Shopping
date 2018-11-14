import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPageModule } from '../tabs/tabs.module';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email : string = '';
  password : string = '';

  constructor(public fire : AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  myLogin(){

    this.fire.auth.signInWithEmailAndPassword(this.email, this.password).then(user=>{
      this.navCtrl.setRoot(TabsPage)
    }).catch(function(error) {
      alert(error);
    });
  }

  SignUp(){
    this.navCtrl.push("SignupPage");
  }

}
