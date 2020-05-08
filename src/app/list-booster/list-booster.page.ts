import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { Events,AlertController } from '@ionic/angular';
import { Config } from '../config';

@Component({
  selector: 'app-list-booster',
  templateUrl: './list-booster.page.html',
  styleUrls: ['./list-booster.page.scss'],
})
export class ListBoosterPage implements OnInit {

  dataBooster:any = [];
  data:any = {};
  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public alertCtrl:AlertController,
    public events    : Events) {
      this.glbSvc.getDataUser().then((rest)=>{
          this.data = rest;
          this.getBooster();
          console.log(rest);
      });
      events.subscribe('booster:update', (data) => {
        setTimeout( () => {
          this.getBooster();
        }, 300);   
      });
    }

  ngOnInit() {
  }
  
  getBooster(){
    this.glbSvc.listBooster(this.data.user_id).subscribe(res=>{
      console.log(res);
      res = res.results;
      if(res.status_request == 'OK'){
        this.dataBooster = res.data;
        this.events.publish("openAlert","Berhasil","berhasil mengambil Booster");
      }else{
        this.events.publish("openAlert","Gagal","gagal mengambil Booster");
      }
    },
    err => {
      this.events.publish("openAlert","Error","Gagal");
    })
  }

  addBooster(){
    this.router.navigateByUrl('/add-booster');
  }
  
  edit(booster){
      Config.dataBooster = booster;
      this.router.navigateByUrl('/update-booster');
  }

  async hapus(id){
    let confirm = await this.alertCtrl.create({
        header   : 'Keluar',
        message : 'Apakah kamu yakin ?',
        buttons : [
            {
                text    : 'Batal',
                role    : 'cancel'
            },
            {
                text    : 'Ya, Lanjutkan',
                handler : () => {
                  console.log(id);
                  this.glbSvc.hapusBooster(id).subscribe(res=>{
                    res = res.results;
                    if(res.status_request == 'OK'){
                      this.getBooster();
                      this.events.publish("openAlert","Berhasil","berhasil hapus Booster");
                    }else{
                      this.events.publish("openAlert","Gagal","gagal hapus Booster");
                    }
                  },
                  err => {
                    this.events.publish("openAlert","Error","Gagal Menyimpan Rating");
                  })
                }
            }
        ]
    });
    await confirm.present();
  }

}
