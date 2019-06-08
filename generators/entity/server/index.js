const Generator = require('yeoman-generator');
const _ = require('lodash');
const constants = require('../../generator-constants');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.typeOfApp = opts.typeOfApp;
    this.entity = opts.entity;
    this.destinationServerDirectory = this.typeOfApp === constants.APP_TYPE_RESTFUL_API ? 'api' : 'server/api';
    this.entityNameFormats = opts.entityNameFormats;

    this.relationships = opts.relationships;
    this.manyToOneRelationShips = opts.manyToOneRelationShips;
    this.oneToManyRelationShips = opts.oneToManyRelationShips;
  }

  writing() {
    this._writeServerEntity();
    this._writeServerEntityController();
  }

  _writeServerEntity() {
    const entityName = this.entityNameFormats.kebab;
    const layersNames = ['model', 'repository', 'controller'];

    layersNames.forEach((layerName) => {
      this.fs.copyTpl(
        this.templatePath(`api/entidad/_entidad.${layerName}.js`),
        this.destinationPath(`${this.destinationServerDirectory}/${entityName}/${entityName}.${layerName}.js`),
        {
          entityName: this.entityNameFormats,
          attributes: this.entity.attributes,
          relationships: this.relationships,
          manyToOneRelationShips: this.manyToOneRelationShips,
          oneToManyRelationShips: this.oneToManyRelationShips,
          _: _
        }
      );
    });
  }

  _writeServerEntityController() {
    const entityName = this.entityNameFormats.kebab;
    this.fs.copyTpl(
      this.templatePath('api/entidad/_index.js'),
      this.destinationPath(`${this.destinationServerDirectory}/${entityName}/index.js`),
      { entityName: this.entityNameFormats }
    );
  }
};
