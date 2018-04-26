import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //public array to store the information from database
  public myDataArray: any[];
  public myCountArray: any[];
  public myInfoArray: any[];

  farmNo: string;

  home = {}


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private alertCtrl: AlertController) {


  }


  ionViewWillEnter() {

    this.farmNo = this.navParams.data.sid;
    console.log(this.navParams.data);

    // Parameters call getHerdNumbers from the PHP
    var parameters = {
      _fn: 'getHerdNumbers'
    }

    // noAnimals call getHerdNumbers from the PHP
    var noAnimals = {
      _fn: 'getNumberOfAnimals'
    }

    /*
      post method connecting with php on server using the IP address 
      Looking for functions getHerdNumbers and getNumberOfAnimals in php
      .subscribe is the function that actually executes the observable. It takes the callback parameters as follow
       observables provide support for passing messages between publishers and subscribers in your application.
    */
    this.http.post('http://104.199.57.94/api/', parameters).subscribe((data) => {

      console.log(data['_body']);
      this.myDataArray = (JSON.parse(data['_body']));
      this.myDataArray.forEach(data => {
        data.checked = false;
      });
    },
      err => { console.log(err) });

    //.subscribe is the function that actually executes the observable. It takes the callback noAnimals as follow
    this.http.post('http://104.199.57.94/api/', noAnimals).subscribe((data) => {

      console.log(JSON.parse(data['_body']));
      this.myCountArray = Array.of(JSON.parse(data['_body']));
    },

      err => { console.log(err) });
    console.log("hello just called get");
  }

  showData(herdNo: string) {

    // getHerdInfo function in PHP to get the herd information
    var home = {
      _fn: 'getHerdInfo',
      herdNo: herdNo
    }


    this.http.post('http://104.199.57.94/api/', home).subscribe((data) => {

      let animal: any = JSON.parse(data['_body'])[0];

      //Create alert which prints out the body of the getHerdInfo function
      let alert = this.alertCtrl.create({
        title: 'View animal',
        message: "Animal Number" + animal.herdNo + "<br/>Gender:" + animal.gender + "<br/>dob:" + animal.dob + "<br/>breed:" + animal.breed,
        buttons: [
          {
            text: 'OK',
            //Used to refresh page 
            handler: () => { this.navCtrl.setRoot(this.navCtrl.getActive().component) }
          }]
      });
      alert.present();


    }, error => {
      console.log(error);// Error 
    });




  }
}