import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { AddPage } from '../add/add';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //public array to store the information from database
  public myDataArray: any[];
  public myCountArray: any[];
  public myInfoArray: any[];

  add = {}
  logForm() {

  }


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {


    var parameters = {
      _fn: 'getHerdNumbers'
    }

    var changes = {
      _fn: 'getNumberOfAnimals'
    }


    this.http.post('http://104.199.57.94/api/', parameters).subscribe((data) => {

      console.log(data['_body']);
      this.myDataArray = (JSON.parse(data['_body']));
      this.myDataArray.forEach(data => {
        data.checked = false;
      });
    },
      err => { console.log(err) });

    this.http.post('http://104.199.57.94/api/', changes).subscribe((data) => {

      console.log(JSON.parse(data['_body']));
      this.myCountArray = Array.of(JSON.parse(data['_body']));
    },

      err => { console.log(err) });
    console.log("hello just called get");
  }

  showData(herdNo: string) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    console.log(herdNo);

    var add = {
      _fn: 'getHerdInfo',
      herdNo: herdNo
    }

    this.http.post('http://104.199.57.94/api/', add).subscribe((data) => {
      console.log(data['_body'].breed);
      console.log(data['_body']);
      this.myInfoArray = Array.of(JSON.parse(data['_body']));

      let alert = this.alertCtrl.create({
        title: 'View animal',
        subTitle: (JSON.parse(data['_body'])),
        buttons: [
          {
            text: 'OK',
            handler: () => { this.navCtrl.setRoot(this.navCtrl.getActive().component) }
          }]
      });
      alert.present();


    }, error => {
      console.log(error);// Error 
    });




  }
}