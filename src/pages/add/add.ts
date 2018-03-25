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


  number: string;
  gender: string;
  breed: string;
  dob: Date;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  insertData() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    let postParams = '&herdNo=' + this.number + '&gender=' + this.gender + '&breed=' + this.breed + '&dob=' + this.dob;

    console.log(postParams);

    var add = {
      _fn: 'addAnimal'
    }

    console.log(JSON.stringify(postParams));

    this.http.post('http://35.205.81.28/api/', add, JSON.stringify(postParams)).subscribe((data) => {
      console.log(data['_body']);
    }, error => {
      console.log(error);// Error 
    });
  }
}