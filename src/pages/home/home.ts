import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
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


  constructor(public navCtrl: NavController, public http: Http) {
  }

  ionViewWillEnter() {


    var parameters = {
      _fn: 'getHerdNumbers'
    }

    var changes = {
      _fn: 'getNumberOfAnimals'
    }


    this.http.post('http://35.205.81.28/api/', parameters).subscribe((data) => {

      console.log(JSON.parse(data['_body']));
      this.myDataArray = (JSON.parse(data['_body']));
    },
      err => { console.log(err) });

     

    this.http.post('http://35.205.81.28/api/', changes).subscribe((data) => {

      console.log(JSON.parse(data['_body']));
      this.myCountArray = Array.of(JSON.parse(data['_body']));
    },


      err => { console.log(err) });
    console.log("hello just called get");
  }




  // Allow navigation to the AddTechnology page for amending an existing entry
  // (We supply the actual record to be amended, as this method's parameter,
  // to the AddTechnology page
 /* viewEntry(param)
  {
     this.navCtrl.push('AddPage', param);
}*/
}
