import {Injectable, Inject}                                  from '@angular/core';
import {Http}                                        from '@angular/http';
import {Observable}                                  from 'rxjs/Observable';
import {URLS}                                        from "../../common/server.url";
@Injectable()
export class DashboardService {

  constructor(private http: Http) {
  }

  initConnection(ipAddress: string,port: number): Observable<any> {
    let url = URLS.redDll.init + ipAddress +"/"+port;
    return this.http.post(url, '');
  }
  refreshPoint(): Observable<any> {
    let url = URLS.redDll.refreshPoint ;
    return this.http.post(url, '');
  }

  refreshAngle(): Observable<any> {
    let url = URLS.redDll.refreshAngle ;
    return this.http.post(url, '');
  }
  clearWarn(): Observable<any> {
    let url = URLS.redDll.clearWarn ;
    return this.http.post(url, '');
  }

  changeMotor(val: number): Observable<any> {
    let url = URLS.redDll.changeMotor + val ;
    return this.http.post(url, '');
  }
  runToZero(): Observable<any> {
    let url = URLS.redDll.runToZero + "10/8" ;
    return this.http.post(url, '');
  }

  changeWorkMode(val: number): Observable<any> {
    let url = URLS.redDll.changeWorkMode + val ;
    return this.http.post(url, '');
  }


  moveObject(data :any) :Observable<any>{
    let url = URLS.redDll.moveObject  ;
    return this.http.post(url, data);

  }



}
