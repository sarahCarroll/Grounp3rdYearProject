import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the PeopleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeopleServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PeopleServiceProvider Provider');
  }

/*
  InsertMember(animalNo,gender,breed,dob)
  {
      var url = 'http://35.205.81.28/api/insert&animalNo'+animalNo+'&gender='+gender+'&breed='+breed+'&dob='+dob;
    var response = this.http.get(url).map(res => res.json());
    return response;
}*/
}
