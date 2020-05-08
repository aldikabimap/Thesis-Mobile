import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Config } from '../config';

@Component({
  selector: 'app-bmr',
  templateUrl: './bmr.page.html',
  styleUrls: ['./bmr.page.scss'],
})
export class BmrPage implements OnInit {
  formData:any = {
    weight:'',
    height:'',
    gender:'',
    usia:''
  };
  dataBMR:any = {};
  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public events    : Events) { }

  ngOnInit(){
    
  }
  ionViewWillEnter() {
    this.glbSvc.getDataUser().then((rest)=>{
        this.formData.weight = rest.weight;
        this.formData.height = rest.height;
        console.log(rest);
    });
  }

  doCalculate(){
    
    if(this.formData.weight == ''){
        this.events.publish("openAlert","Error","Weight Kosong");
        return false;
    }
    
    if(this.formData.height == ''){
        this.events.publish("openAlert","Error","Height Kosong");
        return false;
    }
    // this.events.publish('showLoading');
    this.glbSvc.doBMR(this.formData).subscribe(res=>{
        // this.events.publish('hideLoading');
        res = res.results;
        if(res.status_request == 'OK'){
            this.events.publish('openAlert', 'Berhasil login', res.msg);
            console.log(res.data);
            this.dataBMR = res.data;
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
