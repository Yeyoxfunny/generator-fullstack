import { Component, OnInit, Inject } from '@angular/core';

import { <%= entityName.pascal %>Service } from './<%= entityName.kebab %>.service';
import { <%= entityName.pascal %> } from './<%= entityName.kebab %>.model';

@Component({
  selector: 'app-<%= entityName.kebab %>',
  template: `
              <div class="container-fluid">
                <app-<%= entityName.kebab %>-list [<%= entityName.camel %>s]="<%= entityName.camel %>s"></app-<%= entityName.kebab %>-list>
              </div>
            `
})
export class <%= entityName.pascal %>Component implements OnInit {

  <%= entityName.camel %>s: <%= entityName.pascal %>[] = [];

  constructor(private <%= entityName.camel %>Service: <%= entityName.pascal %>Service) {

  }

  ngOnInit() {
    this.<%= entityName.camel %>Service.getAll().subscribe(<%= entityName.camel %>s => this.<%= entityName.camel %>s = <%= entityName.camel %>s);
  }
}
