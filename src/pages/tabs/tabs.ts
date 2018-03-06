import { Component } from '@angular/core';

import { AddPage } from '../add/add';
import { DeletePage } from '../delete/delete';
import { HomePage } from '../home/home';
import { UpdatePage } from '../update/update';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AddPage;
  tab3Root = DeletePage;
  tab4Root = UpdatePage;


  constructor() {

  }
}
