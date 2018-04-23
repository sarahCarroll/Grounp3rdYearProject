import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { TabsPage } from '../tabs/tabs';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  tabsPage = TabsPage;

  Name: string;
  password: string;
  herdNo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private alertCtrl: AlertController) {
  }

  async login() {

    //this.ref.orderByChild("email").equalTo
    var i = 0;

    var add = {
      _fn: 'login',
      name: this.Name,
      password: this.password,
      farmNo: this.herdNo,
    }

    /* try {
       this.http.post('http://104.199.57.94/api/', add).subscribe((data) => {
         console.log(data['_body'])
         this.navCtrl.setRoot(TabsPage, { sid: this.herdNo, name: this.Name, password: this.password })
         console.log(data.toString)
       }, error => {
         console.log(error);// Error 
       });
     }
   */

    this.http.post('http://104.199.57.94/api/', add).subscribe((data) => {
      console.log(data['_body'])
      //this.navCtrl.setRoot(TabsPage, { sid: this.herdNo, name: this.Name, password: this.password })
      console.log(data.toString)
    }, error => {
      console.log("Cannot login");// Error 
    });

  }
}
