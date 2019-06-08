import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { <%= entityName.pascal %> } from './<%= entityName.kebab %>.model';
import { <%= entityName.pascal %>Service } from './<%= entityName.kebab %>.service';

@Component({
  selector: 'app-<%= entityName.kebab %>-details',
  templateUrl: './<%= entityName.kebab %>-details.component.html'
})
export class <%= entityName.pascal %>DetailsComponent implements OnInit {

  <%= entityName.camel %>: <%= entityName.pascal %>;

    constructor(
      private <%= entityName.camel %>Service: <%= entityName.pascal %>Service,
      private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.<%= entityName.camel %>Service.getById(id).subscribe(<%= entityName.camel %> => this.<%= entityName.camel %> = <%= entityName.camel %>);
      });
    }
  }
