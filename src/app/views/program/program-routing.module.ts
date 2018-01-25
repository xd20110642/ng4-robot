import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import {ProgramComponent} from "./program.component";
import {ProgramUploadComponent} from "./upload.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Program'
    },
    children: [
      {
        path: 'upload',
        component: ProgramUploadComponent,
        data: {
          title: 'upload'
        }
      },
      {
        path: 'edit',
        component: ProgramComponent,
        data: {
          title: 'edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule {}
