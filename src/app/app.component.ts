import { Component } from '@angular/core';

import { Platform,Events,AlertController,LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router,ActivatedRoute, } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  confirmExitAppStatus = false;
  confirmExitApp      : any;
  loading             : any;
  loadingTimeout      : any;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public loadingCtrl  : LoadingController,
    public alertCtrl    : AlertController,
    public events    : Events,
    public router:Router
  ) {
    this.initializeApp();
    this.events.subscribe('showLoading', (content = '', timeout = 20000) => {
      this.showLoading(content, timeout);
    });
  
    this.events.subscribe('hideLoading', () => {
        this.hideLoading();
    });
  
    this.events.subscribe('openAlert', (title, msg) => {
        this.openAlert(title, msg);
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      setTimeout(() => {
        this.splashScreen.hide();        
      }, 300);
      this.router.navigateByUrl('/');
    });
  }

  async openAlert(title, msg)
  {
      let inTitle = {
        header     : title,
        message  : msg,
        buttons   : ['OK']
      };
      let alert:any = await this.alertCtrl.create(inTitle);
      await alert.present();
  }

  async showLoading(content = '', timeout = 20000)
  {
      let param = {showBackdrop : true, content : '' };
      if(content != ''){
          param.content = content;
      } else{
          param.content = "Please wait...";
      }

      this.loading = await this.loadingCtrl.create(param);
      await this.loading.present();
      // this.loadingTimeout = setTimeout(() => {
      //     this.hideLoading();
      // }, timeout);
  }

  async hideLoading()
  {
      if(this.loadingTimeout != '' && this.loadingTimeout != undefined)
      {
          clearTimeout(this.loadingTimeout);
          this.loadingTimeout = '';
      }
      if(this.loading != undefined && this.loading != '')
      {
          await this.loading.dismiss();
          this.loading = '';
      }
  }
}
