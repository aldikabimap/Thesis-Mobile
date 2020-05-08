import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Config } from '../config';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formData = {
      // signature   : Config.signature,
      name       : '',
      height       : '',
      weight       : '',
      alergies    : '',
      username    : '',
      password    : '',
  }

  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public events    : Events) { }

  ngOnInit() {
  }

  goSignup()
  {
      if(this.formData.username == ''){
          this.events.publish("openAlert","Error","Username Kosong");
          return false;
      }
      
      if(this.formData.password == ''){
          this.events.publish("openAlert","Error","Password Kosong");
          return false;
      }
      
      if(this.formData.alergies == ''){
        this.events.publish("openAlert","Error","Alergies Kosong");
        return false;
      }

      if(this.formData.height == ''){
        this.events.publish("openAlert","Error","Height Kosong");
        return false;
      }

      if(this.formData.weight == ''){
        this.events.publish("openAlert","Error","Weight Kosong");
        return false;
      }
    
      if(this.formData.name == ''){
        this.events.publish("openAlert","Error","Name Kosong");
        return false;
      }
      // this.events.publish('showLoading');
      this.glbSvc.doSignup(this.formData).subscribe(res=>{
          // this.events.publish('hideLoading');
          res = res.results;
          if(res.status_request == 'OK'){
              this.events.publish('openAlert', 'Berhasil', res.msg);
              this.router.navigateByUrl('/signin');
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
