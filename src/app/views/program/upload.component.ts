import { Component ,ViewContainerRef} from '@angular/core';
import {ProgramService} from "./program.service";
import {URLS} from "../../common/server.url";
import {ToastsManager} from "ng2-toastr";
@Component({
  templateUrl: 'upload.component.html',
  providers: [ProgramService]
})
export class ProgramUploadComponent {
  public maxSize:number = 5;
  public bigTotalItems:number = 50;
  public bigCurrentPage:number =1;
  public keyword:string = "";
  public pageChanged(event:any):void {
    console.log('Page changed to: ' + event.page);
    this.offset = this.max * (event.page-1);
    this.list();
    console.log('Number items per page: ' + event.itemsPerPage);
  }
  public name:string;
  public content:string;
  public max:number;
  public offset:number;
  public id:number;
  public listData:any;
  public listDataLoaded :boolean
  constructor(public programService : ProgramService,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.max = 10;
    this.offset = 0;
    this.id=-1;
    this.listDataLoaded = false;
    this.list();
    this.toastr.setRootViewContainerRef(vcr);
  }

  list(){
    this.programService.listOfflinePro(this.keyword,this.max,this.offset).subscribe(
      res =>{
        let jsonRes =  res.json();
        if (jsonRes.success) {
          this.listData = jsonRes.data;
          console.log(this.listData)
          this.bigTotalItems = this.listData.sumItem;
          console.log(this.bigTotalItems)
          this.listDataLoaded = true;
        } else {
          this.toastr.error("服务器执行出错！！！" +  jsonRes.errorCode +" " +jsonRes.errorMsg);
        }
      },
      error=>{
        this.toastr.error("服务器内部错误");
      }
    );
  }

  create(){
    this.programService.createOfflinePro(this.name,this.content).subscribe(
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


  del(id:number,name:string){
    if (confirm("确定删除："+name)==true){
      this.programService.delOfflinePro(id).subscribe(
        res =>{
          let jsonRes =  res.json();
          if (jsonRes.success) {
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

  }

  show(name:string,content:string){
    this.name = name;
    this.content = content;
  }

}
