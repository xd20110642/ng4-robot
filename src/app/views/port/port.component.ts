import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import {CommonModule} from "@angular/common";
import {PortService} from "./port.service";
import {URLS} from "../../common/server.url";
import {ToastsManager} from "ng2-toastr";
@Component({
  templateUrl: 'port.component.html',
  providers:[PortService]
})
export class PortComponent implements OnInit {
  public outputArray :  Array<boolean>;
  public analogArray : Array<number>;
  public selectValues : Array<number>;
  public protFunction : false;

  constructor( public portService : PortService ,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.outputArray = new Array<boolean>();
    this.analogArray = new Array<number>();
    this.selectValues = new Array<number>();
    for(var i=0;i<18;i++){
      this.outputArray[i] = false;
    }
    for(var i=0;i<4;i++){
      this.analogArray[i] = 0;
    }
    for(var i=0;i<13;i++){
      this.selectValues[i] = i;
    }
    this.toastr.setRootViewContainerRef(vcr);
  }

  changeTrans(){
    let val = 1;
    if(this.protFunction){
      val = 0;
    }
    this.portService.changeTrans(val).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.toastr.success("服务器执行成功！");
        } else {
          this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  setOutput(portNo:number){
    let val = 1;
    if(this.outputArray[portNo]){
      val = 0;
    }
    this.portService.setOutput(portNo,val).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.toastr.success("服务器执行成功！");
        } else {
          this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }


  setAnalog(portNo:number){
    let val = this.analogArray[portNo];
    this.portService.setAnalog(portNo,val).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.toastr.success("服务器执行成功！");
        } else {
          this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  getOutput(){
    this.portService.getOutput().subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.outputArray = jsonRes.data;
          this.toastr.success("服务器执行成功！");
        } else {
          this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  getAnalog(){
    this.portService.getAnalog().subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.analogArray = jsonRes.data;
          this.toastr.success("服务器执行成功！");
        } else {
          this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
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
