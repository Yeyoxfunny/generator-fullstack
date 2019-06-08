import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { <%= entityName.pascal %>Service } from './<%= entityName.kebab %>.service';
import { <%= entityName.pascal %> } from './<%= entityName.kebab %>.model';

<%_ for (let relationship of duplicateFreeManyToOneRelationships) { _%>
import { <%= relationship.entityRef.pascal %>Service } from '../<%= relationship.entityRef.kebab %>/<%= relationship.entityRef.kebab %>.service';
import { <%= relationship.entityRef.pascal %> } from '../<%= relationship.entityRef.kebab %>/<%= relationship.entityRef.kebab %>.model';
<%_ } _%>

@Component({
  selector: 'app-<%= entityName.kebab %>-upsert',
  templateUrl: './<%= entityName.kebab %>-upsert.component.html'
})
export class <%= entityName.pascal %>UpSertComponent implements OnInit {

  crudOperationTitle = 'Crear';
  isCreate = true;
  <%= entityName.camel %>: <%= entityName.pascal %>;

  <%_ if (manyToOneRelationShips.length > 0) { _%>
  /** Many-To-One Relationships */
  <%_ for (let relationship of manyToOneRelationShips) {_%>
  <%= relationship.fieldName.camel %>s: <%= relationship.entityRef.pascal %>[];
  <%_ }} _%>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private <%= entityName.camel %>Service: <%= entityName.pascal %>Service,
    <%_ for (let relationship of duplicateFreeManyToOneRelationships) { _%>
    private <%= relationship.entityRef.camel %>Service: <%= relationship.entityRef.pascal %>Service,
    <%_ } _%>
  ) { }

  ngOnInit() {
  <%_ for (let relationship of manyToOneRelationShips) { _%>
    this.<%= relationship.entityRef.camel %>Service.getAll().subscribe(<%= relationship.fieldName.camel %>s => this.<%= relationship.fieldName.camel %>s = <%= relationship.fieldName.camel %>s);
  <%_ } _%>
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.crudOperationTitle = 'Actualizar';
        this.isCreate = false;
        this.<%= entityName.camel %>Service.getById(id).subscribe(<%= entityName.camel %> => this.<%= entityName.camel %> = <%= entityName.camel %>);
      }
    });
  }

  save(formValues) {
    this.<%= entityName.camel %> = formValues;
    this.<%= entityName.camel %>Service.insert(this.<%= entityName.camel %>).subscribe(
      (response) => {
        this.router.navigate(['/entities/<%= entityName.kebab %>']);
      }
    );
  }

  update() {
    this.<%= entityName.camel %>Service.update(this.<%= entityName.camel %>._id, this.<%= entityName.camel %>).subscribe(
      (response) => {
        this.router.navigate(['/entities/<%= entityName.kebab %>']);
      }
    );
  }
}
