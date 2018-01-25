import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ProgramComponent} from "./program.component";
import {ProgramRoutingModule} from "./program-routing.module";
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import {ProgramUploadComponent} from "./upload.component";
import {ProgramControllerDirective} from "../../directives/program-controller/program.directive";
import {PaginationModule} from "ngx-bootstrap";
@NgModule({
  imports: [
    ProgramRoutingModule,
    BsDropdownModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [
    ProgramComponent ,
    ProgramUploadComponent,
    ProgramControllerDirective
  ]
})
export class ProgramModule { }


export class PageInfo {
  public maxSize:number = 5;
  public bigTotalItems:number = 50;
  public bigCurrentPage:number = 1;
  public max:number = 10;
  public offset:number = 0;

 }

export class ServerEnum{

  TaskType = {
    'CURVE':'曲线',
    'OUTPUT':'输出',
    'ANALOG':'模拟量',
    'SLEEP': '延时',
    'WAIT': '等待',
    'START': '起始点',
  };

  CurveType ={
    'JOINT':'关节',
    'LINE':'直线',
    'CIR':'圆弧',
    'ARC': '圆'
  };
}
