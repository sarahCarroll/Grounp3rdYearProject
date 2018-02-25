import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //empty member variable called posts - to pull in remote server
  posts: any;

  constructor(public navCtrl: NavController, public http: Http) {

  this.http.get('35.205.81.28/data.php');

  }

}
