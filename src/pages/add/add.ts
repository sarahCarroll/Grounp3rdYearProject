import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { AlertController } from 'ionic-angular';


import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {
  add = {}
  logForm() {
    this.farmNo = this.navParams.data.sid;
    console.log(this.navParams.data);
  }
  farmNo: string;


  number: string;
  gender: string;
  breed: string;
  dob: Date;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private alertCtrl: AlertController) {
  }

  insertData() {
    let alert = this.alertCtrl.create({
      title: 'Added',
      subTitle: 'Your animal ' + this.number + ' has been added!',
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

    let postParams = '&herdNo=' + this.number + '&gender=' + this.gender + '&breed=' + this.breed + '&dob=' + this.dob;

    console.log(postParams);

    var add = {
      _fn: 'addAnimal',
      herdNo: this.number,
      gender: this.gender,
      dob: this.dob,
      breed: this.breed
    }

    console.log(JSON.stringify(postParams));

    this.http.post('http://104.199.57.94/api/', add).subscribe((data) => {
      console.log(data['_body'])
    }, error => {
      console.log(error);// Error 
    });

  }
}