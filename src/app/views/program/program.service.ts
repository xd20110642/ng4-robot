import {Injectable}                                  from '@angular/core';
import {Http}                                        from '@angular/http';
import {Observable}                                  from 'rxjs/Observable';
import {URLS}                                        from "../../common/server.url";
@Injectable()
export class ProgramService {

  constructor(private http: Http) {
  }

  create(pointName: string): Observable<any> {
    let url = URLS.program.create + pointName;
    return this.http.post(url, '');
  }
  //添加的搜索方法  第一个搜索
  search(searchStr:string,max:number,offset:number): Observable<any> {
    let url = URLS.program.list  +max+"/"+offset  ;
    if(searchStr!=''){
      url=url+'?keyword='+searchStr
    }
    console.log("search url:"+url);
    return this.http.post(url, '');
  }


  list(max:number,offset:number): Observable<any> {
    let url = URLS.program.list +max +"/" + offset;
    return this.http.post(url, '');
  }

  listProgramItem(programId:number):Observable<any>{
    let url = URLS.program.listProgramItem +programId;
    return this.http.get(url, '');
  }

  load(programId:number):Observable<any>{
    let url = URLS.program.load +programId;
    return this.http.get(url, '');
  }

  download(programId:number){
    let url = URLS.program.download +programId;
    window.open(url);
  }

  start(data:any):Observable<any>{
    let url = URLS.program.start ;
    return this.http.post(url, data);
  }

  pause():Observable<any>{
    let url = URLS.program.pause ;
    return this.http.get(url, '');
  }
  stop():Observable<any>{
    let url = URLS.program.stop ;
    return this.http.get(url, '');
  }
  goon(speed:number):Observable<any>{
    let url = URLS.program.goon +speed;
    return this.http.get(url, '');
  }

  /**
   * private String name;
   private Long pointStart;
   private Long pointMiddle;
   private Long pointEnd;
   private CurveType curveType;//曲线类型 0-关节，1-直线，2-圆弧，3-圆
   private float velocity;	//曲线运动速度
   private float flatness;	//曲线的平滑百分比
   * @param programId
   * @param data
   * @returns {Observable<Response>}
   */
  addPoint(programId:number,data:any):Observable<any>{
    let url = URLS.program.addPoint + programId ;
    return this.http.post(url, data);
  }

  delPoint(programId:number):Observable<any>{
    let url = URLS.program.delPoint + programId ;
    return this.http.post(url, '');
  }

  createOfflinePro(name:string,content:string):Observable<any>{
    let url = URLS.offlineProgram.create + name ;
    return this.http.post(url, content);
  }

  loadOfflinePro(id:number):Observable<any>{
    let url = URLS.offlineProgram.load + id ;
    return this.http.post(url, '');
  }

  listOfflinePro(keyword:string,max:number,offset:number): Observable<any> {
    let url = URLS.offlineProgram.list +max +"/" + offset;
    if(keyword!=''){
      url = url + "?keyword=" + keyword;
    }
    return this.http.post(url, '');
  }

  delOfflinePro(id:number):Observable<any>{
    let url = URLS.offlineProgram.del + id ;
    return this.http.post(url, '');
  }

  addNoCurve(programId:number,data:any):Observable<any>{
    let url = URLS.program.addNoCurve + programId ;
    return this.http.post(url, data);
  }

}
