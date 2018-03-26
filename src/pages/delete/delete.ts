import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-delete',
  templateUrl: 'delete.html'
})
export class DeletePage {

  constructor(public navCtrl: NavController, public http: Http) {
    var add = {
      _fn: 'deleteAnimal',
      herdNo: 1223

    }

    this.http.post('http://35.205.81.28/api/', add).subscribe((data) => {
      console.log(data['_body'])
    }, error => {
      console.log(error);// Error 
    });
  }

}
