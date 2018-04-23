import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AlertController } from 'ionic-angular';


import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the UpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {

  add = {}
  logForm() {
<<<<<<< HEAD
=======

  }

  public myDataArray: any[];

  number: string;
  gender: string;
  breed: string;
  dob: Date;

  public herdNo: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {


    var parameters = {
      _fn: 'getHerdNumbers'
    }



    this.http.post('http://104.199.57.94/api/', parameters).subscribe((data) => {

      console.log(JSON.parse(data['_body']));
      this.myDataArray = (JSON.parse(data['_body']));

    },
      err => { console.log(err) });
>>>>>>> sarahs

  }
  /*herdNoSelected(herdNo:string) {
    this.herdNo=herdNo;
  }*/

  updateData() {

    let alert = this.alertCtrl.create({
      title: 'Update',
      subTitle: 'Your animal ' + this.herdNo + ' has been updated',
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

    let postParams = '&herdNo=' + this.herdNo + '&gender=' + this.gender + '&breed=' + this.breed + '&dob=' + this.dob;

<<<<<<< HEAD
  public myDataArray: any[];

  gender: string;
  breed: string;
  dob: Date;

  public herdNo: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {


    var parameters = {
      _fn: 'getHerdNumbers'
    }



    this.http.post('http://104.199.57.94/api/', parameters).subscribe((data) => {

      console.log(JSON.parse(data['_body']));
      this.myDataArray = (JSON.parse(data['_body']));

    },
      err => { console.log(err) });

  }
  /*herdNoSelected(herdNo:string) {
    this.herdNo=herdNo;
  }*/

  updateData() {

    let alert = this.alertCtrl.create({
      title: 'Update',
      subTitle: 'Your animal ' + this.herdNo + ' has been updated',
      buttons: [
        {
          text: 'OK',
          handler: () => { this.navCtrl.setRoot(this.navCtrl.getActive().component) }
        }]
    });
    alert.present();

    //Debug
    let postParams = '&herdNo=' + this.herdNo + '&gender=' + this.gender + '&breed=' + this.breed + '&dob=' + this.dob;

    console.log(postParams);

    //herdNo, gender. dob, breed declared to be sent through to PHP
    var update = {
=======
    console.log(postParams);

    var add = {
>>>>>>> sarahs
      _fn: 'updateAnimal',
      herdNo: this.herdNo,
      gender: this.gender,
      dob: this.dob,
      breed: this.breed

    }


    console.log(JSON.stringify(postParams));

<<<<<<< HEAD
    this.http.post('http://104.199.57.94/api/', update).subscribe((data) => {
=======
    this.http.post('http://104.199.57.94/api/', add).subscribe((data) => {
>>>>>>> sarahs
      console.log(data['_body'])
    }, error => {
      console.log(error);// Error 
    });
  }
}