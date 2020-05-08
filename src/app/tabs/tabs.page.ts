import { Component } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Config } from '../config';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public events    : Events) {
    glbSvc.getDataUser().then(res=>{
      setTimeout(() => {
        if(res == null){
            // this.navCtrl.push(MenuPage);
          this.router.navigateByUrl('/signin');
        }
      },500);
    });
  }

}
