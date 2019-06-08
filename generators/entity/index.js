const Generator = require('yeoman-generator');
const _ = require('lodash');
const constants = require('../generator-constants');
const utils = require('../utils');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.typeOfApp = opts.typeOfApp;
    this.globalMessages = opts.globalMessages;

    this.entity = this._changeFormatEntityAttributeNames(opts.entity);
    this.entityNameFormats = utils.getNaminFormats(this.entity.name);

    this.relationships = this.entity.relationships ? this._changeFormatRelationshipsName(this.entity.relationships) : [];
    this.duplicateFreeRelationships = this._getDuplicateFreeRelationships(this.relationships);

    this.manyToOneRelationShips = this._getManyToOneRelationships(this.relationships);
    this.duplicateFreeManyToOneRelationships = this.duplicateFreeRelationships.filter(rel => rel.typeRelationship.toLowerCase() === 'many-to-one');

    this.oneToManyRelationShips = this._getOneToManyRelationships(this.relationships);
  }

  writing() {
    if (this._isAngularFullStackApp()) {
      this._writeAngularEntity();
    }
    this._writeServerEntity();
  }

  /**
   * Obtiene un arreglo sin entidades de referencia duplicados y
   * valida que no hayan relaciones entre la misma tabla,
   * esto para evitar problemas al importar archivos duplicados en angular
   * */
  _getDuplicateFreeRelationships(relationships) {
    return _.uniqBy(relationships, 'entityRef.camel')
      .filter(relationship => relationship.entityRef.camel !== this.entityNameFormats.camel);
  }

  _getManyToOneRelationships(relationships) {
    return relationships.filter(rel => rel.typeRelationship.toLowerCase() === 'many-to-one');
  }

  _getOneToManyRelationships(relationships) {
    return relationships.filter(rel => rel.typeRelationship.toLowerCase() === 'one-to-many');
  }

  _writeAngularEntity() {
    this.composeWith(require.resolve('./client'), {
      typeOfApp: this.typeOfApp,
      entity: this.entity,
      entityNameFormats: this.entityNameFormats,
      globalMessages: this.globalMessages,
      relationships: this.relationships,
      manyToOneRelationShips: this.manyToOneRelationShips,
      oneToManyRelationShips: this.oneToManyRelationShips,
      duplicateFreeRelationships: this.duplicateFreeRelationships,
      duplicateFreeManyToOneRelationships: this.duplicateFreeManyToOneRelationships
    });
  }

  _writeServerEntity() {
    this.composeWith(require.resolve('./server'), {
      typeOfApp: this.typeOfApp,
      entity: this.entity,
      entityNameFormats: this.entityNameFormats,
      relationships: this.relationships,
      manyToOneRelationShips: this.manyToOneRelationShips,
      oneToManyRelationShips: this.oneToManyRelationShips
    });
  }

  // Cambia el formato de los nombres de los atributos de una entidad al formato Camel Case.
  _changeFormatEntityAttributeNames(entityObject) {
    const entity = Object.assign({}, entityObject);
    const attributes = [];
    for (const attribute of entity.attributes) {
      const name = attribute.name;
      attribute.name = _.camelCase(name);
      attributes.push(attribute);
    }
    entity.attributes = attributes;
    return entity;
  }

  /**
   * Cambia el formato de los nombres de las entidades de referencia, y su campo
   *  para realizar las relaciones.
  */
  _changeFormatRelationshipsName(relationships) {
    const _relationships = [];
    for (let i = 0; i < relationships.length; i++) {
      const relationship = Object.assign({}, relationships[i]);
      const entityRefName = relationship.entityRef;
      const fieldName = relationship.fieldName;

      relationship.entityRef = utils.getNaminFormats(entityRefName);
      relationship.fieldName = utils.getNaminFormats(fieldName);
      _relationships.push(relationship);
    }
    return _relationships;
  }

  _isAngularFullStackApp() {
    return this.typeOfApp === constants.APP_TYPE_ANGULAR_FULLSTACK;
  }
};
