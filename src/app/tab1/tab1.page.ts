import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Config } from '../config';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  lose_goals :any = '1';
  description:any = '';
  dataUser:any = {};
  WeightLoss:any = [1,3,5];
  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public events    : Events) {
    this.glbSvc.getDataUser().then(res=>{
      this.dataUser = res;
    });
    events.subscribe('user:update', (data) => {
      this.glbSvc.getDataUser().then(res=>{
        this.dataUser = res;
        console.log(res);
      });
    });
  }

  searchData(){
    // if(this.description == ''){
    //   this.events.publish("openAlert","Error","Description Kosong");
    //   return false;
    // }
    
    this.dataUser.lose_goals = this.lose_goals;
    console.log(this.dataUser);
    this.glbSvc.doSearch(this.dataUser).subscribe(res=>{
        // this.events.publish('hideLoading');
        res = res.results;
        
        if(res.status_request == 'OK'){
          Config.dataDesc = res.data;
          Config.dataPlan = res.data_plan;
          this.events.publish('openAlert', 'Berhasil', res.msg);
          this.router.navigateByUrl('/pos');
        }else{
          this.events.publish('openAlert', 'Kesalahan', res.msg);
        }
    },
    err => {
        // this.events.publish('hideLoading');
        this.events.publish("openAlert","Error","Koneksi anda tidak stabil");
    })
  }
}
