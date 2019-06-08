import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { entitiesRoutes } from './entities.route';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(entitiesRoutes)
  ]
})
export class EntitiesModule { }
