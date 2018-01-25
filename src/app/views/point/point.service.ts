import {Injectable, Inject}                                  from '@angular/core';
import {Http}                                        from '@angular/http';
import {Observable}                                  from 'rxjs/Observable';
import {URLS}                                        from "../../common/server.url";
@Injectable()
export class PointService {

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

  search(searchStr:string,max:number,offset:number): Observable<any> {
    let url = URLS.point.search  +max+"/"+offset  ;
    if(searchStr!=''){
      url=url+'?keyword='+searchStr
    }
    return this.http.post(url, '');
  }

  del(id:number): Observable<any> {
    let url = URLS.point.del  +id;
    return this.http.post(url, '');
  }

  moveToPoint(id:number): Observable<any> {
    let url = URLS.point.moveToPoint  +id  ;
    return this.http.post(url, '');
  }

}
