import { Routes } from '@angular/router';

export const entitiesRoutes: Routes = [
  <%_ for (let i = 0; i < entities.length; i++) { _%>
  { path: '<%= _.kebabCase(entities[i].name) %>', loadChildren: './<%= _.kebabCase(entities[i].name) %>/<%= _.kebabCase(entities[i].name) %>.module#<%= convertToPascalFormat(entities[i].name) %>Module' },
  <%_ } _%>
];

<%_
  function convertToPascalFormat(name) {
    const kebabName = _.kebabCase(name);
    return _.startCase(kebabName).replace(/ /g, '');
  }
_%>
