import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';

import { AuditPage } from './audit.page';

const routes: Routes = [
  {
    path: '',
    component: AuditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [Camera]
})
export class AuditPageRoutingModule {}
