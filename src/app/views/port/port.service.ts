import {Injectable, Inject}                                  from '@angular/core';
import {Http}                                        from '@angular/http';
import {Observable}                                  from 'rxjs/Observable';
import {URLS}                                        from "../../common/server.url";
@Injectable()
export class PortService {

  constructor(private http: Http) {
  }


  create(name:string,angle:any,posCoord:any): Observable<any> {
    let url = URLS.point.create ;

    let data  ={
      name:name,
      angle:angle,
      posCoord:posCoord
    }
    return this.http.post(url, data);
  }

  changeTrans(val:number){
    let url = URLS.port.changeTran +val ;
    return this.http.post(url, '');
  }
  setOutput(portNo:number,val:number){
    let url = URLS.port.setOutput + portNo + "/" +val ;
    return this.http.post(url, '');
  }

  setAnalog(portNo:number,val:number){
    let url = URLS.port.setAnalog + portNo + "/" +val ;
    return this.http.post(url, '');
  }

  getAnalog(){
    let url = URLS.port.getAnalog ;
    return this.http.post(url, '');
  }

  getOutput(){
    let url = URLS.port.getOutput ;
    return this.http.post(url, '');
  }

}
