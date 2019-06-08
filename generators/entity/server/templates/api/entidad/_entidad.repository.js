const <%= entityName.pascal %> = require('./<%=  entityName.kebab %>.model');

module.exports = {
  get() {
    return <%= entityName.pascal %>.find();
  },
  getById(id) {
    return <%= entityName.pascal %>.findById(id)
          <% manyToOneRelationShips.forEach(relationship => { %>.populate('<%= relationship.entityRef.camel %>')<% }); %>
          <% oneToManyRelationShips.forEach(relationship => { %>.populate('<%= relationship.entityRef.camel %>s')<% }); %>
  },
  add(<%= entityName.camel %>) {
    const _<%= entityName.camel %> = new <%= entityName.pascal %>(<%= entityName.camel %>);
    return _<%= entityName.camel %>.save();
  },
  update(id, <%= entityName.camel %>) {
    return <%= entityName.pascal %>.findByIdAndUpdate(id, <%= entityName.camel %>, { new: true, runValidators: true });
  },
  remove(id) {
    return <%= entityName.pascal %>.findByIdAndRemove(id);
  }
};
