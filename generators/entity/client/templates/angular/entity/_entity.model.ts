<%_ for (let relationship of duplicateFreeRelationships) { _%>
import { <%= relationship.entityRef.pascal %> } from '../<%= relationship.entityRef.kebab %>/<%= relationship.entityRef.kebab %>.model';
<%_ } _%>

export interface <%= entityName.pascal %> {
  _id?: string;<%attributes.forEach(attribute => {%>
  <%= attribute.name %>: <%=attribute.type %>;<%})%>

  <%_ if (manyToOneRelationShips.length > 0) { _%>
  /** Many-To-One Relationships */
  <% for (let relationship of manyToOneRelationShips) { %>
  id<%= relationship.fieldName.pascal %>?: String;
  <%= relationship.fieldName.camel %>?: <%= relationship.entityRef.pascal %>;
  <%_ }} _%>

  <%_ if (oneToManyRelationShips.length > 0) { _%>
  /** One-To-Many Relationships */
  <%_ for (let relationship of oneToManyRelationShips) { _%>
  <%= relationship.fieldName.camel %>s?: <%= relationship.entityRef.pascal %>[];
  <%_ }} _%>
}
