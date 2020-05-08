import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Config } from '../config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  data:any = {
      username  : "",
  }
  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public events    : Events) {
    events.subscribe('user:update', (data) => {
      this.getData();
    });
  }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.getData();
  }
  getData()
  {
      this.glbSvc.getDataUser().then((rest)=>{
          this.data = rest;
          console.log(rest);
      });
  }
  goBooster(){
    this.router.navigateByUrl('/list-booster');
  }
  goUpdate(){
    this.router.navigateByUrl('/update-profile');
  }
  goLogout()
    {
        // let confirm = this.alertCtrl.create({
        //     title   : 'Keluar',
        //     message : 'Apakah kamu yakin ?',
        //     buttons : [
        //         {
        //             text    : 'Batal',
        //             role    : 'cancel'
        //         },
        //         {
        //             text    : 'Ya, Lanjutkan',
        //             handler : () => {
        //                 this.signinSvc.logout();
        //                 this.events.publish('openLogout');
        //             }
        //         }
        //     ]
        // });
        // confirm.present();
        // this.app.getRootNav().push(SigninPage);
      this.glbSvc.logout();
      this.router.navigateByUrl('/signin');
  }
  goBMI(){
    this.router.navigateByUrl('/bmi');
  }
  goBMR(){
    this.router.navigateByUrl('/bmr');
  }
}
