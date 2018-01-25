import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';

@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    BsDropdownModule,
    FormsModule,
    JWBootstrapSwitchModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
