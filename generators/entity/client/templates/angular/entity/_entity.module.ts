import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EntitiesSharedModule } from '../entities-shared.module';
import { <%= entityName.pascal%>SharedModule } from '../<%= entityName.kebab%>/<%= entityName.kebab%>-shared.module';

<%_ for (let relationship of duplicateFreeRelationships) { _%>
import { <%= relationship.entityRef.pascal%>SharedModule } from '../<%= relationship.entityRef.kebab%>/<%= relationship.entityRef.kebab%>-shared.module';
<%_ } _%>

import { <%= entityName.pascal %>Component } from './<%= entityName.kebab %>.component';
import { <%= entityName.pascal %>UpSertComponent } from './<%= entityName.kebab %>-upsert.component';
import { <%= entityName.pascal %>DetailsComponent } from './<%= entityName.kebab %>-details.component';
import { <%= entityName.pascal %>Service } from './<%= entityName.kebab %>.service';

import { <%= entityName.camel %>Routes } from './<%= entityName.kebab %>.route';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(<%= entityName.camel %>Routes),
    EntitiesSharedModule,
    <%= entityName.pascal %>SharedModule<%_if(duplicateFreeRelationships && duplicateFreeRelationships.length > 0){_%>,<%_}_%>
    <% duplicateFreeRelationships.forEach((relationship, index) => { %>
    <%= relationship.entityRef.pascal %>SharedModule<%_if (index < duplicateFreeRelationships.length - 1) { _%>,<%_ } _%>
    <% }); %>
  ],
  declarations: [
    <%= entityName.pascal %>Component,
    <%= entityName.pascal %>UpSertComponent,
    <%= entityName.pascal %>DetailsComponent
  ],
  providers: [ <%= entityName.pascal %>Service ]
})
export class <%= entityName.pascal %>Module { }
