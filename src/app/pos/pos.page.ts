import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Config } from '../config';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.page.html',
  styleUrls: ['./pos.page.scss'],
})
export class PosPage implements OnInit {

  formData:any = {have_plan:1};
  listPlan:any = [];
  data:any = {};
  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public events    : Events) {
      this.formData = Config.dataDesc;
      this.listPlan = Config.dataPlan;
      console.log(Config);
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

  setDiet(){
    let formNya = {result_id:this.formData.result_id,user_id:this.data.user_id};
    this.glbSvc.setDiet(formNya).subscribe(res=>{
        // this.events.publish('hideLoading');
        res = res.results;
        if(res.status_request == 'OK'){
            this.events.publish('openAlert', 'Berhasil', res.msg);
            this.router.navigateByUrl('/');
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
