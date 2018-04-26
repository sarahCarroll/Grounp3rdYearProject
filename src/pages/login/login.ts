import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  tabsPage = TabsPage;

  name: string;
  password: string;
  farmNo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  login() {

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    var add = {
      _fn: 'login',
      name: this.name,
      password: this.password,
      farmNo: this.farmNo
    }

    console.log(add);

    this.http.post('http://104.199.57.94/api/', add).subscribe((data) => {
      console.log(data['_body'])
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.push(TabsPage, {
        sid: this.farmNo
      });
      console.log(this.farmNo)
    }, error => {
      console.log(error);// Error 
    });
  }
}