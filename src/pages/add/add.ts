import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from "../home/home";


import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {
  add = {}
  logForm() {

  }


  herdNo: string;
  gender: string;
  breed: string;
  dob: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  insertData() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    let postParams = 'herdNo=' + this.herdNo + '&gender=' + this.gender + '&breed=' + this.breed + '&dob=' + this.dob;

    var add = {
      _fn: 'addAnimal'
    }


    this.http.post('http://35.205.81.28/api/', add).subscribe((data) => {
      console.log(data['_body']);
    }, error => {
      console.log(error);// Error 
    });
  }



}