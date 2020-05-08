import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
import { Observable, of, Subject } from 'rxjs';

import { Config } from '../config';

import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public http: Http,
    private storage: Storage) { }
  doLogin(data): Observable<any>
  {
    let body = new FormData();
    body.append('username',data.username);
    body.append('password',data.password);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/login', body).pipe(
      	map(res=>res.json())
    );
  }

  doUpdate(data): Observable<any>
  {
    let body = new FormData();
    body.append('user_id',data.user_id);
    body.append('name',data.name);
    body.append('height',data.height);
    body.append('weight',data.weight);
    body.append('alergies',data.alergies);
    body.append('motivation',data.motivation);
    body.append('username',data.username);
    body.append('password',data.password);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/updateProfile', body).pipe(
      	map(res=>res.json())
    );
  }

  doSignup(data): Observable<any>
  {
    let body = new FormData();
    body.append('name',data.name);
    body.append('height',data.height);
    body.append('weight',data.weight);
    body.append('alergies',data.alergies);
    body.append('motivation',data.motivation);
    body.append('username',data.username);
    body.append('password',data.password);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/register', body).pipe(
      	map(res=>res.json())
    );
  }

  getWisata(): Observable<any>
  {
    let body = new FormData();
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/listWisata', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  getJenis(): Observable<any>
  {
    let body = new FormData();
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/listJenis', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  doSearch(data): Observable<any>
  {
    let body = new FormData();
    body.append('height',data.height);
    body.append('alergies',data.alergies);
    body.append('weight',data.weight);
    body.append('lose_goals',data.lose_goals);
    body.append('id_user',data.user_id);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/resultWeightGoals', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  getDetailDate(data): Observable<any>
  {
    let body = new FormData();
    body.append('id_user',data.id_user);
    body.append('date',data.date);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/getDetailDate', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  checkPlan(data): Observable<any>
  {
    let body = new FormData();
    body.append('id_user',data.user_id);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/checkPlan', body)
    .pipe(
      	map(res=>res.json())
    );
  }
  
  listBooster(user_id): Observable<any>
  {
    let body = new FormData();
    body.append('id_user',user_id);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/listBooster', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  tambahBooster(data): Observable<any>
  {
    let body = new FormData();
    body.append('id_user',data.id_user);
    body.append('booster_phone',data.booster_phone);
    body.append('booster_name',data.booster_name);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/tambahBooster', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  updateBooster(data): Observable<any>
  {
    let body = new FormData();
    body.append('booster_id',data.booster_id);
    body.append('booster_phone',data.booster_phone);
    body.append('booster_name',data.booster_name);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/updateBooster', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  hapusBooster(booster_id): Observable<any>
  {
    let body = new FormData();
    body.append('booster_id',booster_id);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/hapusBooster', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  updateTarget(checkBox,data): Observable<any>
  {
    let body = new FormData();
    body.append('id_reminder',data.id_reminder);
    checkBox.forEach((v,k) => {
      if(v.checked){
        body.append('target['+k+'][id_plan]',v.plan_id);
        body.append('target['+k+'][id_reminder]',data.id_reminder);
      }
    });
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/updateTarget', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  getDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  }

  getListTransaksi(data): Observable<any>
  {
    let body = new FormData();
    if(data.pilihan =='Hari ini'){
      body.append('transaksi_date',this.getDate(new Date()));
    }else if(data.pilihan =='Kemarin'){
      let tanggal = new Date();
      tanggal.setDate(tanggal.getDate() - 1);
      body.append('transaksi_date',this.getDate(tanggal));
    }else{
      body.append('transaksi_date',this.getDate(data.pilihanTanggal));
    }
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/getTransaksi', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  getListDetailTransaksi(data): Observable<any>
  {
    let body = new FormData();
    body.append('transaksi_id',data.transaksi_id);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/getDetailTransaksi', body)
    .pipe(
      	map(res=>res.json())
    );
  }

  
  saveData(user) {
    this.storage.set('dataUser', user).then(() => {
        Config.loginData = user;
    });
  }


  getDataUser():Promise<any> {
    return this.storage.get('dataUser').then((user) => {
      Config.loginData = user;
      return user;
    });
  }

  setDiet(data): Observable<any>
  {
    let body = new FormData();
    body.append('id_result',data.result_id);
    body.append('id_user',data.user_id);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/setDiet', body).pipe(
      	map(res=>res.json())
    );
  }
  
  doBMI(data): Observable<any>
  {
    let body = new FormData();
    body.append('weight',data.weight);
    body.append('height',data.height);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/bmi', body).pipe(
      	map(res=>res.json())
    );
  }

  doBMR(data): Observable<any>
  {
    let body = new FormData();
    body.append('weight',data.weight);
    body.append('height',data.height);
    body.append('usia',data.usia);
    body.append('gender',data.gender);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/bmr', body).pipe(
      	map(res=>res.json())
    );
  }

	logout() {
		this.storage.remove('dataUser').then(() => {
				Config.loginStatus = false;
				Config.storageData = null;
		});
		return true;
  }
  
  login(user) {
    Config.loginData = user;
    this.storage.set('dataUser', user).then(() => {
        Config.loginStatus = true;
    });
  }

	getUser() {
		this.storage.get('dataUser').then((user) => {
			Config.storageData = user;
			Config.loginStatus = true;
		});
  }
  
  hitungKmeans(data): Observable<any>{
    let body = new FormData();
    body.append('kategori[1]',data.pilihan1);
    body.append('kategori[2]',data.pilihan2);
    body.append('kategori[3]',data.pilihan3);
    body.append('kategori[4]',data.pilihan4);
    body.append('kategori[5]',data.pilihan5);
    body.append('signature','ae72e97648a54ad23675e7198bad05fa5da85780');
    return this.http.post(Config.URLServer + '/getKmeans', body)
    .pipe(
      	map(res=>res.json())
    );
  }
}
