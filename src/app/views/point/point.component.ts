import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import {CommonModule} from "@angular/common";
import {PointService} from "./point.service";
import {URLS} from "../../common/server.url";
import {ToastsManager} from "ng2-toastr";
@Component({
  templateUrl: 'point.component.html',
  providers:[PointService]
})
export class PointComponent implements OnInit {

  public listData:any;
  public listDataLoaded:boolean;
  public max:number;
  public offset:number;
  //引入模板定义属性
  public maxSize:number = 5;
  public bigTotalItems:number = 50;
  public bigCurrentPage:number = 1;
  public keyword:string = "";

  constructor( public pointService : PointService,public toastr: ToastsManager, vcr: ViewContainerRef ) {
    //定义每页最大的数据个数
    this.max = 10;
    this.offset = 0;
    this.listDataLoaded = false;
    this.list();
    this.toastr.setRootViewContainerRef(vcr);
  }


  public pageChanged(event:any):void {
    console.log('Page changed to: ' + event.page);
    //判断数据是否超过数据
    this.offset=this.max*(event.page-1);
    //调用方法
    this.list();
    console.log('Number items per page: ' + event.itemsPerPage);
  }




  list(){
    this.pointService.search(this.keyword,this.max,this.offset).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.listData = jsonRes.data;
          console.log(this.listData)
          this.bigTotalItems = this.listData.sumItem;
          this.listDataLoaded = true;
          console.log(this.keyword+'1')
        } else {
          this.toastr.error("服务器执行出错！！ ！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  moveToPoint(id:number){
    this.pointService.moveToPoint(id).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {

        } else {
          this.toastr.error("服务器执行出错！！ ！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  del(id:number,name:string){
    this.pointService.del(id).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.list();
        } else {
          this.toastr.error("服务器执行出错！！ ！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  ngOnInit(): void {

  }
}
