import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ProgramService} from "./program.service";
import {ServerEnum ,PageInfo} from "./program.module";
import {PointService} from "../point/point.service";
import {URLS} from "../../common/server.url";
import {ToastsManager} from "ng2-toastr";
@Component({
  templateUrl: 'program.component.html',
  providers:[ProgramService,PointService]
})
export class ProgramComponent implements OnInit {
  public programName : string;
  public programListData : any;
  public max:number = 10;
  public offset :number;
  public programItemData :any;
  public editId :number;
  public editName :string;
  public programDataLoaded :boolean;
  public programItemDataLoaded :boolean;
  public pointDataLoaded : boolean;
  public pointData : any;
  public pointSearch :string;
  public serverEnum  = new ServerEnum();
  public taskTypeSubmit : string;
  public curveTypeSubmit :string;
  public velocity:number;
  public flatness:number;
  public lastPointInfo :any;
  public secondPointInfo:any;
  public threePointInfo:any;
  public sleepTime:number;
  public outputArray :  Array<boolean>;
  public outputAddValue :  Array<any>;
  public outputPortNo :number;
  public outputValue :number;
  public serialArray : Array<number>;
  public serialValue : number;
  public outputType:number;
  public serialType:number;
  public analogChanel:number;
  public analogType:number;
  public analogValue:number;
  //定义keyword
  public keyword:string;
  public programPageInfo:PageInfo;
  public programItemPageInfo:PageInfo;
  public pointPageInfo:PageInfo;

  constructor( public programService : ProgramService,public pointService:PointService ,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.outputArray = new Array<boolean>();
    this.serialArray = new Array<number>();
    this.programPageInfo = new PageInfo();
    this.programItemPageInfo = new PageInfo();
    this.pointPageInfo = new PageInfo();
    this.outputType = 0;
    this.serialType = 0;
    this.analogType = 0;
    this.analogValue = 0;
    this.analogChanel = 0;
    this.outputAddValue = [];
    this.outputPortNo = 0;
    this.outputValue = 1;
    for(var i=0;i<18;i++){
      this.outputArray[i] = false;
    }
    this.offset = 0;
    this.max = 10;
    this.editId=0;
    this.programDataLoaded = false;
    this.programItemDataLoaded = false;
    this.pointDataLoaded = false;
    this.pointSearch = "";
    this.sleepTime = 0;
    this.velocity = 50;
    this.flatness = 0;
    this.taskTypeSubmit = this.serverEnum.TaskType["CURVE"];
    this.curveTypeSubmit = this.serverEnum.CurveType["JOINT"];
    this.lastPointInfo = {name:""};
    this.secondPointInfo = {name:""};
    this.threePointInfo = {name:""};
    //定义keyworld初始值
    this.keyword=' '
    this.list();
    this.toastr.setRootViewContainerRef(vcr);
  }


  //第一个分页
  public programPageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    //计算超过一页后 自动添加下一页列表
    this.programPageInfo.offset = this.programPageInfo.max * (event.page-1);
    this.list();
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  //点列表分页
  public pointPageInfoChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    //计算超过一页后 自动添加下一页列表
    this.pointPageInfo.offset = this.pointPageInfo.max * (event.page-1);
    this.getPointData();
    console.log('Number items per page: ' + event.itemsPerPage);
  }
  create(){
    this.programService.create(this.programName).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.toastr.success("服务器执行成功！");
          this.list();
        } else {
          this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }
 // program list action
  list(){
    this.programService.search(this.keyword,this.programPageInfo.max,this.programPageInfo.offset).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.programListData = jsonRes.data;
          this.programPageInfo.bigTotalItems = this.programListData.sumItem;
          this.programDataLoaded = true;
          console.log(this.keyword)
        } else {
          this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  download(programId:number){
    this.programService.download(programId);
  }


  listProgramItem(id:number,name:string){
    this.editId = id;
    this.editName = name;
    if(this.editId>0){
      this.programItemDataLoaded = false;
      this.programService.listProgramItem(id).subscribe(
        res =>{
          let jsonRes =  res.json();
          if (jsonRes.success) {
            this.programItemData = jsonRes.data;
            if(this.programItemData.length >0){
              this.programItemDataLoaded = true;
              this.lastPointInfo = jsonRes.mapData.lastPoint;
            }
          } else {
            this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
          }
        },
        error=>{
          this.toastr.error("服务器内部错误");
        }
      );
    }
  }
  //点管理
  getPointData(){
    this.pointService.search(this.pointSearch,this.pointPageInfo.max,this.pointPageInfo.offset).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.pointData = jsonRes.data;
          this.pointPageInfo.bigTotalItems = this.pointData.sumItem;
          if(this.pointData.sumItem != undefined){
              for(var i = 0; i<this.pointData.pageItems.length ; i++){
                this.pointData.pageItems[i].angleJson = JSON.parse(this.pointData.pageItems[i].angleJson);
                this.pointData.pageItems[i].posCoordJson = JSON.parse(this.pointData.pageItems[i].posCoordJson);
              }
              console.log(this.pointData);
          }
          this.pointDataLoaded = true;
        } else {
          this.toastr.error("服务器执行出错！！ ！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  addStartPoint(){
    this.getPointData();
    //this.primaryModal.show();
  }

  addPointAction(data:any){
    this.programService.addPoint(this.editId,data).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.toastr.success("添加成功");
          this.listProgramItem(this.editId,this.editName);
        } else {
          this.toastr.error("服务器执行出错！！ ！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }


  addPoint(pointId:number,name:string,curveType:string){
    let data = {
      name:name,
      pointTarget : pointId,
      flatness :this.flatness,
      velocity:this.velocity,
      curveType:curveType
    }
    this.addPointAction(data);
  }

  delPoint(itemId:number){
    this.programService.delPoint(itemId).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.listProgramItem(this.editId,this.editName);
        } else {
          this.toastr.error("服务器执行出错！！ ！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  setSecondPoint(pointInfo:any){
    this.secondPointInfo = pointInfo;
  }

  setThreePoint(pointInfo:any){
    this.threePointInfo = pointInfo;
  }

  submitSleep(){
    let data={
      taskType:'SLEEP',
      sleep:this.sleepTime
    }
    this.submitNoCurve(data);
  }

  submitNoCurve(data:any){
    this.programService.addNoCurve(this.editId,data).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.toastr.success("添加成功");
          this.listProgramItem(this.editId,this.editName);
        } else {
          this.toastr.error("服务器执行出错！！ ！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  submitOutput(){
    let portArray = [];
    let levelArray = [];
    let num = this.outputAddValue.length;
    for(var i=0;i<num;i++){
      portArray.push(this.outputAddValue[i].portNo);
      levelArray.push(this.outputAddValue[i].value);
    }
    let data={
      taskType:'OUTPUT',
      port:portArray,
      level:levelArray
    }
    this.submitNoCurve(data);
  }

  submitAnalog(){
    let data={
      taskType:'ANALOG',
      chanel:this.analogChanel,
      dataType:this.analogType,
      analog:this.analogValue
    }
    this.submitNoCurve(data);
  }

  submitOutputWait(){
    let portArray = [];
    let levelArray = [];
    let num = this.outputAddValue.length;
    for(var i=0;i<num;i++){
      portArray.push(this.outputAddValue[i].portNo);
      levelArray.push(this.outputAddValue[i].value);
    }
    let data={
      taskType:'WAIT',
      waitType:0,
      port:portArray,
      level:levelArray,
      type:this.outputType
    }
    this.submitNoCurve(data);
  }

  submitSerialWait(){
    let data={
      taskType:'WAIT',
      waitType:1,
      serial:this.serialArray,
      type:this.outputType
    }
    this.submitNoCurve(data);
  }


  addOutputItem(){
    this.outputAddValue.push({
      portNo:this.outputPortNo,
      value:this.outputValue
    })
    console.log(this.outputAddValue);

  }

  addSerial(){
    this.serialArray.push(this.serialValue)
    console.log(this.serialArray);

  }

  addArc(curveType:string){
    if(this.threePointInfo.id>0&&this.secondPointInfo.id>0){
      let data = {
        name:this.secondPointInfo.name+"->"+this.threePointInfo.name,
        pointMiddle:this.secondPointInfo.id,
        pointTarget : this.threePointInfo.id,
        flatness :this.flatness,
        velocity:this.velocity,
        curveType:curveType
      }
      this.addPointAction(data);
    }else{
      this.toastr.error("请选择正确的点信息");
    }
  }
  ngOnInit(): void {

  }
}
