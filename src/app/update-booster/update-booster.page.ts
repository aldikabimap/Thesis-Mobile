import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { ActionSheetController,Events,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Config } from '../config';

@Component({
  selector: 'app-update-booster',
  templateUrl: './update-booster.page.html',
  styleUrls: ['./update-booster.page.scss'],
})
export class UpdateBoosterPage implements OnInit {

  dataUser:any = {
    booster_name:'',
    booster_phone:''};
  imgphoto="assets/imgs/noimage.png";
  constructor(
    public glbSvc   : GlobalService,
    public events    : Events,
    public alertCtrl    : AlertController,
    private router: Router,
    public actionSheetCtrl:ActionSheetController) { }

  ngOnInit() {
    this.dataUser = Config.dataBooster;
    console.log(this.dataUser);
    this.dataUser.password = '';
  }
  
  updateBooster(){
    
    if(this.dataUser.booster_name == ''){
      this.events.publish("openAlert","Gagal","Fill Nama");
      return false;
    }
    if(this.dataUser.booster_phone == ''){
      this.events.publish("openAlert","Gagal","Fill No Phone");
      return false;
    }
    this.glbSvc.updateBooster(this.dataUser).subscribe(res=>{
      res = res.results;
      if(res.status_request == 'OK'){
        this.events.publish("openAlert","Berhasil","Data berhasil di update");
        this.router.navigateByUrl('list-booster');
        this.events.publish('booster:update', '');
      }else{
        this.events.publish("openAlert","Gagal",res.msg);
      }
    },err => {
      this.events.publish("openAlert","Gagal","koneksi Error");
    })
  }
}
