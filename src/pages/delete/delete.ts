import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';

import { HomePage } from "../home/home";

@Component({
  selector: 'page-delete',
  templateUrl: 'delete.html'
})
export class DeletePage {
  add = {}
  logForm() {

  }

  public myDataArray: any[];

  number: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private alertCtrl: AlertController) {

  }

  ionViewWillEnter() {


    var parameters = {
      _fn: 'getHerdNumbers'
    }


    this.http.post('http://104.199.57.94/api/', parameters).subscribe((data) => {

      console.log(JSON.parse(data['_body']));
      this.myDataArray = (JSON.parse(data['_body']));
      this.myDataArray.forEach(data => {
        data.checked = false;
      });
    },
      err => { console.log(err) });

  }

  /*
  Function for deleting animal from our database. 
  */
  deleteData(herdNo: string) {

    let alert = this.alertCtrl.create({
      title: 'View animal details',
      subTitle: 'Your animal has been deleted!',
      buttons: [
        {
          text: 'OK',
          handler: () => { this.navCtrl.setRoot(this.navCtrl.getActive().component) }
        }]
    });
    alert.present();

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    var add = {
      _fn: 'deleteAnimal',
      herdNo: herdNo
    }

    this.http.post('http://104.199.57.94/api/', add).subscribe((data) => {
      console.log(data['_body'])
    }, error => {
      console.log(error);// Error 
    });
  }

}