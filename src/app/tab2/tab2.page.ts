import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Config } from '../config';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  data:any = {};
  datePlan:any = {have_plan:'0',date:[]};
  checkBox:any = [];
  is_today:any = 0;
  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public events    : Events) {}

  ionViewWillEnter(){
    this.getData();
  }
  getData()
  {
    this.glbSvc.getDataUser().then((rest)=>{
        this.data = rest;
        console.log(rest);
        this.checkBox = [];
        this.glbSvc.checkPlan(this.data).subscribe(res=>{
            // this.events.publish('hideLoading');
            res = res.results;
            if(res.status_request == 'OK'){
              this.datePlan = res.data;
              this.events.publish('openAlert', 'Berhasil', res.msg);
            }else{
              this.events.publish('openAlert', 'Kesalahan', res.msg);
            }
        },
        err => {
            // this.events.publish('hideLoading');
            this.events.publish("openAlert","Error","Koneksi anda tidak stabil");
        })
    });
  }
  getDetailDate(data,idx){
    if(this.datePlan.day == idx){
      this.is_today = 1;
    }else{
      this.is_today = 0;
    }
    this.datePlan.date.forEach((v,k) => {
      v.selected = 0;
    });
    data.selected = 1;
    this.checkBox = [];
    let formNya = {date:data.date,id_user:this.data.user_id};
    this.glbSvc.getDetailDate(formNya).subscribe(res=>{
          // this.events.publish('hideLoading');
          res = res.results;
          if(res.status_request == 'OK'){
            this.checkBox = res.data;
            this.events.publish('openAlert', 'Berhasil', res.msg);
          }else{
            this.events.publish('openAlert', 'Kesalahan', res.msg);
          }
      },
      err => {
          // this.events.publish('hideLoading');
          this.events.publish("openAlert","Error","Koneksi anda tidak stabil");
      });
  }
  updateTarget(){
    let idx = undefined;
    this.datePlan.date.forEach((v,k) => {
      if(v.selected == 1){
        idx = k;
      }
    });
    let jumlahDone = 0;
    this.checkBox.forEach((v,k) => {
      if(v.checked){
        jumlahDone++;
      }
    });
    this.datePlan.date[idx].done = jumlahDone;
    this.glbSvc.updateTarget(this.checkBox,this.datePlan).subscribe(res=>{
        // this.events.publish('hideLoading');
        res = res.results;
        if(res.status_request == 'OK'){
          this.events.publish('openAlert', 'Berhasil', res.msg);
        }else{
          this.events.publish('openAlert', 'Kesalahan', res.msg);
        }
    },
    err => {
        // this.events.publish('hideLoading');
        this.events.publish("openAlert","Error","Koneksi anda tidak stabil");
    });
  }
}
