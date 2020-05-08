import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../api/global.service';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Config } from '../config';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

    formData = {
      // signature   : Config.signature,
      email       : '',
      username       : '',
      password    : '',
  }
  constructor(
    public glbSvc   : GlobalService,
    private router: Router,
    public events    : Events) { 
    glbSvc.getDataUser().then(res=>{
      setTimeout(() => {
        if(res != null){
                // this.navCtrl.push(MenuPage);
              this.router.navigateByUrl('/');
            }
      }, 500);
    });
  }

  ngOnInit() {
  }

  goSignup(){
    this.router.navigateByUrl('/register');
  }

  postLogin()
  {
      if(this.formData.username == ''){
          this.events.publish("openAlert","Error","Username Kosong");
          return false;
      }
      
      if(this.formData.password == ''){
          this.events.publish("openAlert","Error","Password Kosong");
          return false;
      }
      // this.events.publish('showLoading');
      this.glbSvc.doLogin(this.formData).subscribe(res=>{
          // this.events.publish('hideLoading');
          res = res.results;
          Config.loginStatus  = true;
          if(res.status_request == 'OK'){
              this.glbSvc.login(res.profile);
              this.events.publish('openAlert', 'Berhasil login', res.msg);
              Config.loginStatus  = true;
              this.router.navigateByUrl('/');
              setTimeout(() => {
                this.events.publish('user:update', []);
              }, 100);
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
