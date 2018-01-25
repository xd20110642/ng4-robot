import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import {PointComponent} from "./point.component";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
const routes: Routes = [
  {
    path: '',
    component: PointComponent,
    data: {
      title: 'Point'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),ToastModule.forRoot()],
  exports: [RouterModule]
})
export class PointRoutingModule {}
