import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PortComponent} from "./port.component";
import {PortRoutingModule} from "./port-routing.module";
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';
@NgModule({
  imports: [
    PortRoutingModule,
    BsDropdownModule,
    CommonModule,
    FormsModule,
    JWBootstrapSwitchModule
  ],
  declarations: [ PortComponent ]
})
export class PortModule { }
