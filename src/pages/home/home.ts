import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //empty member variable called posts - to pull in remote server
  posts: any;

  constructor(public navCtrl: NavController, public http: Http) {

  this.posts=this.http.get('http://35.205.81.28/data.php');

  console.log(this.posts);

  console.log("hello just called get");

  }

}
