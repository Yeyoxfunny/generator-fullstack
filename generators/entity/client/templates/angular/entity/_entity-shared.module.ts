import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EntitiesSharedModule } from '../entities-shared.module';

import { <%= entityName.pascal %>ListComponent } from './<%= entityName.kebab %>-list.component';
import { <%= entityName.pascal %>Service } from './<%= entityName.kebab %>.service';

@NgModule({
  imports: [
    CommonModule,
    EntitiesSharedModule,
    RouterModule
  ],
  exports: [
    <%= entityName.pascal %>ListComponent
  ],
  declarations: [
    <%= entityName.pascal %>ListComponent
  ],
  providers: [<%= entityName.pascal %>Service]
})
export class <%= entityName.pascal %>SharedModule { }
