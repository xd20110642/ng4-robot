import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import {DashboardService} from '../../views/dashboard/dashboard.service';
import {JointVo} from "../../model/joint";
import {PosCoordVo} from "../../model/posCoord";
import {CommonModule} from "@angular/common";
import {PointService} from "../point/point.service";
import {URLS} from "../../common/server.url";
import {ToastsManager} from "ng2-toastr";

@Component({
  templateUrl: 'dashboard.component.html',
  providers:[URLS,DashboardService,PointService]
})
export class DashboardComponent implements OnInit {
  public ipAddress:string;
  public port:number;
  public joint : number[];
  public posCoord : number[];
  public motor : boolean;
  public workMode :boolean;
  public speed : number;
  public moveStep : number;
  public coordLabel:number;
  public xyzLabel : string[];
  public pointName : string;
  public serverAddress:string;

  constructor( public dashboardService : DashboardService,public pointService :PointService ,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.ipAddress = "192.168.1.64";
    this.serverAddress = URLS.baseUrl;
    this.port = 8100;
    this.joint = [1,2,3,4,5,6];
    this.posCoord = [1,2,3,4,5,6];
    this.moveStep = 50;
    this.speed = 50;
    // 初始的值为假 也就是说flase是为手动为假
    this.workMode = false;
    // 这个是初始值为假 也就是flase是是否关闭为假
    this.motor = false;
    this.coordLabel = -1;
    this.xyzLabel = ["X轴","Y轴","Z轴","alfa","beta","gama"];
    this.toastr.setRootViewContainerRef(vcr);
  }
  initConnection(){
    this.dashboardService.initConnection(this.ipAddress,this.port).subscribe(
      res =>{
          this.toastr.success('机器人连接成功!',"连接成功");
          let jsonRes =  res.json();
          if (jsonRes.success) {
            this.joint = jsonRes.data.angle;
            this.posCoord = jsonRes.data.posCoord;
            this.formatJoint();
            this.formatPosCoord();
          } else {
            this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
          }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  refreshPoint(){
    this.dashboardService.refreshPoint().subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.joint = jsonRes.data.angle;
          this.posCoord = jsonRes.data.posCoord;
          this.formatJoint();
          this.formatPosCoord();
        } else {
          this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }
  formatJoint(){
    for(let i=0;i<this.joint.length;i++){
      this.joint[i] = parseFloat(this.joint[i].toFixed(2));
    }
  }
  formatPosCoord(){
    for(let i=0;i<this.posCoord.length;i++){
      this.posCoord[i] = parseFloat(this.posCoord[i].toFixed(2));
    }
  }


  refreshAngle(){
    this.dashboardService.refreshAngle().subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.joint = jsonRes.data;
          this.formatJoint();
        } else {
          this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }


  clearWarn(){
    this.dashboardService.clearWarn().subscribe(
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
  //pc端
  changeMotor($event){
    let val = 1;
    if(this.motor) {
      val = 0;
    }
    this.dashboardService.changeMotor(val).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
         // alert("服务器执行成功！");
        } else {
          this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }
  runToZero(){
    this.dashboardService.runToZero().subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.refreshPoint();
        } else {
          this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " + jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  // 判断是否为移动和pc端
  isPadOrMobile():boolean{
    if ( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    }
    else {
      return false;
    }
  }

  //---------------
  changeWorkMode($event){
    // alert("pc端执行完成")
    let val = 1;
    if(this.workMode){
      val = 0;
    }
    this.dashboardService.changeWorkMode(val).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          //alert("服务器执行成功！");
        } else {
          this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  moveObject($event){
    let  dataPost = {
      angle: this.joint,
      posCoord: this.posCoord,
      speed : this.speed,
      coordLabel : this.coordLabel
    }
    this.dashboardService.moveObject(dataPost).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          //alert("服务器执行成功！");
          this.refreshPoint();
        } else {
          this.refreshPoint();
          this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
        $event.target.disabled = false;
      },
      error=>{
        this.toastr.error("服务器内部错误");
        $event.target.disabled = false;
      }
    );
  }
  diffJointValue(isAdd: boolean,index:number,$event){
    console.log(this.joint[index]);
    console.log(this.moveStep);
    if(isAdd){
      this.joint[index] =  this.joint[index] + this.moveStep;
    }else{
      this.joint[index] =  this.joint[index] - this.moveStep;
    }
    console.log(this.joint);
   // this.moveObject();
  }

  diffPosCoordValue(isAdd: boolean,index:number,$event:MouseEvent){
    if(isAdd){
      this.posCoord[index] =  this.posCoord[index] + this.moveStep;
    }else{
      this.posCoord[index] =  this.posCoord[index] - this.moveStep;
    }
    console.log($event)
    // $event.target.disabled = true;
   // $event.toElement.
    this.moveObject($event);
  }

  createPoint(){
    this.pointService.create(this.pointName,this.joint,this.posCoord).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.toastr.success("服务器执行成功！");
        } else {
          this.toastr.error("服务器执行出错！！！" + jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  changeServerAddress(){
    URLS.updateBaseUrl(this.serverAddress);
    this.toastr.success("更改成功！");
  }

  ngOnInit(): void {

  }
}
