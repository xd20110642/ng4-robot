import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PointComponent} from "./point.component";
import {PointRoutingModule} from "./point-routing.module";
import {PaginationModule} from "ngx-bootstrap";
@NgModule({
  imports: [
    PointRoutingModule,
    BsDropdownModule,
    CommonModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  declarations: [ PointComponent ]
})
export class PointModule { }
