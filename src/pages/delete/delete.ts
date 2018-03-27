import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

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

  myData: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

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

  deleteData(){
  
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

          let postParams = '&herdNo=' + this.myData;

    console.log(postParams);

    var add = {
      _fn: 'deleteAnimal',
      herdNo: this.myData,
    }

    this.http.post('http://104.199.57.94/api/', add).subscribe((data) => {
      console.log(data['_body'])
    }, error => {
      console.log(error);// Error 
    });
  }

}

/*

 
      this.http.post(url, body, options)
      .subscribe(data =>
      {
         // If the request was successful notify the user
         if(data.status === 200)
         {
            this.hideForm     = true;
            this.sendNotification(`Congratulations the technology: ${name} was successfully deleted`);
         }
         // Otherwise let 'em know anyway
         else
         {
            this.sendNotification('Something went wrong!');
         }
      });
}

deleteAnimal(){
    let index = this.data.deleteAnimal(herdNo);

    if(index > -1){
      this.posts.splice(index, 1);
    }
}

 Delete(id:any)
  {
      this.presentLoading();
      this.data.DeleteMember(id).subscribe(
          data => {
              this.members = data;
              console.log(data);
              this.loader.dismiss();
          },
          err => {
              console.log(err);
          },
          () => console.log('Movie Search Complete')
      );
}
*/ 