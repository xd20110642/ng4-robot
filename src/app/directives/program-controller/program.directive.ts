/**
 * Created by abel.lee on 2017/9/26.
 */
import {Component, Input, ElementRef, TemplateRef,ViewContainerRef} from '@angular/core';
import {ProgramService} from "../../views/program/program.service";
import {BsModalService, BsModalRef} from "ngx-bootstrap";
import {ToastsManager} from "ng2-toastr";
@Component({
  selector: 'program-controller', // 定义组件在HTML代码中匹配的标签
 // template: `<h1>program-controller {{name}}</h1>`, // 指定组件关联的内联模板
  templateUrl:'program.directive.html',
  providers:[ProgramService]
})
export class ProgramControllerDirective  {
  public largeModal;

  @Input("proId") proId: number;
  @Input("offlinePro") offlinePro:boolean;
  @Input("proName") proName:string;
  public modalRef: BsModalRef;
  public  velocity:number;                             //速率
  public  movementFlag :number;                        //运动模式标志  0:单步运动 1：单次运动 2：循环运动
  public  repeatMovementNumber :number;
  public movementFlagSelectData :any;
  public config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };
  constructor(public el: ElementRef,public programService:ProgramService ,public modalService: BsModalService,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.movementFlagSelectData = [
      {name:"单步运动",value:0},
      {name:"单次运动",value:1},
      {name:"循环运动",value:2},
    ]
    this.movementFlag = 1;
    this.velocity = 50;
    this.repeatMovementNumber = 1;
    this.toastr.setRootViewContainerRef(vcr);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  load(programId:number){
    if(this.offlinePro){
      this.programService.loadOfflinePro(programId).subscribe(
        res =>{
          let jsonRes =  res.json();
          if (jsonRes.success) {
            this.toastr.success("加载成功");
          } else {
            this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
          }
        },
        error=>{
          this.toastr.error("服务器内部错误");
        }
      );
    }else{
      this.programService.load(programId).subscribe(
        res =>{
          let jsonRes =  res.json();
          if (jsonRes.success) {
            this.toastr.success("加载成功");
          } else {
            this.toastr.error("服务器执行出错！！ ！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
          }
        },
        error=>{
          this.toastr.error("服务器内部错误");
        }
      );
    }

  }

  start(){
    let data={
      velocity:this.velocity,                             //速率
      movementFlag :this.movementFlag,                        //运动模式标志  0:单步运动 1：单次运动 2：循环运动
      repeatMovementNumber :this.repeatMovementNumber
    }
    this.programService.start(data).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.toastr.success("启动成功");
        } else {
          this.toastr.error("服务器执行出错！！ ！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  pause(){
    this.programService.pause().subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.toastr.success("暂停成功");
        } else {
          this.toastr.error("服务器执行出错！！ ！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  stop(){
    this.programService.stop().subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.toastr.success("停止成功");
        } else {
          this.toastr.error("服务器执行出错！！ ！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  goon(){
    this.programService.goon(this.velocity).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.toastr.success("继续成功");
        } else {
          this.toastr.error("服务器执行出错！！ ！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }


}
