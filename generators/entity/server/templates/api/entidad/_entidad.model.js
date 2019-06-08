const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const <%= entityName.camel %>Schema = new Schema({<%attributes.forEach((attribute, index) => { %>
  <%= attribute.name %>: { type: <%= attribute.type %><%- include _entidad-validations -%> }<%_ if (index < attributes.length - 1 || relationships) { _%>,<%_ } _%>
  <% }); %>

  <%_ if (manyToOneRelationShips.length > 0) { _%>
  /** Foreign Fields */
  <% manyToOneRelationShips.forEach((relationship, index) => { %>
  id<%= relationship.fieldName.pascal %>: { type: Schema.Types.ObjectId }<%_ if (index < manyToOneRelationShips.length - 1) { _%>,<%_ } _%>
  <%_ });} _%>
}, { toJSON: { virtuals: true } });

<%_ if (manyToOneRelationShips.length > 0) { _%>
/** Relaciones Many-To-One */
<%_ for (let relationship of manyToOneRelationShips) { _%>
<%= entityName.camel %>Schema.virtual('<%= relationship.fieldName.camel %>', {
  ref: '<%= relationship.entityRef.pascal %>',
  localField: 'id<%= relationship.entityRef.pascal %>',
  foreignField: '_id',
  justOne: true
});
<%_ }}_%>

<%_ if (oneToManyRelationShips.length > 0) { _%>
/** Relaciones One-To-Many */
<%_ for(let oneToManyRelationShip of oneToManyRelationShips) { _%>
<%= entityName.camel %>Schema.virtual('<%= oneToManyRelationShip.fieldName.camel %>s', {
  ref: '<%= oneToManyRelationShip.entityRef.pascal %>',
  localField: '<%= oneToManyRelationShip.localField %>',
  foreignField: 'id<%= entityName.pascal %>'
});
<%_ }}_%>

module.exports = mongoose.model('<%= entityName.pascal %>', <%= entityName.camel %>Schema);
