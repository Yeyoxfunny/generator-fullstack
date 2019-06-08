const _ = require('lodash');

function getNaminFormats(name) {
  const kebabName = _.kebabCase(name);
  const pascalName = _.startCase(kebabName).replace(/ /g, '');
  const startName = _.startCase(kebabName);

  return {
    name,
    kebab: kebabName,
    camel: _.camelCase(name),
    pascal: pascalName,
    start: startName
  };
}

module.exports = {
  getNaminFormats
};
