const Generator = require('yeoman-generator');
const _ = require('lodash');
const util = require('util');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.typeOfApp = opts.typeOfApp;
    this.entity = opts.entity;
    this.globalMessages = opts.globalMessages;
    this.entityNameFormats = opts.entityNameFormats;

    this.relationships = opts.relationships;
    this.duplicateFreeRelationships = opts.duplicateFreeRelationships;

    this.manyToOneRelationShips = opts.manyToOneRelationShips;
    this.duplicateFreeManyToOneRelationships = opts.duplicateFreeManyToOneRelationships;

    this.oneToManyRelationShips = opts.oneToManyRelationShips;
  }

  writing() {
    this._writeClientEntity();
  }

  _writeClientEntity() {
    const entityName = this.entityNameFormats.kebab;
    const layersNames = [
      '.service.ts', '.model.ts', '.component.ts',
      '-list.component.ts', '-list.component.html', '.module.ts', '.route.ts',
      '-upsert.component.ts', '-upsert.component.html',
      '-details.component.ts', '-details.component.html',
      '-shared.module.ts'
    ];

    layersNames.forEach((layerName) => {
      this.fs.copyTpl(
        this.templatePath(`angular/entity/_entity${layerName}`),
        this.destinationPath(`src/app/entities/${entityName}/${entityName}${layerName}`),
        {
          entityName: this.entityNameFormats,
          attributes: this.entity.attributes,
          attributesGroupByPosition: this._getAttributesGroupByPosition(this.entity.attributes),
          attributesWithoutPosition: this._getAttributesWithoutPosition(this.entity.attributes),
          globalMessages: this.globalMessages,
          relationships: this.relationships,
          duplicateFreeRelationships: this.duplicateFreeRelationships,
          manyToOneRelationShips: this.manyToOneRelationShips,
          oneToManyRelationShips: this.oneToManyRelationShips,
          duplicateFreeManyToOneRelationships: this.duplicateFreeManyToOneRelationships,
          util,
          _: _
        }
      );
    });
  }

  _getAttributesGroupByPosition(attributes) {
    // Arreglo de attributos ordenados por posición.
    const attributesSortedByPosition = this._sortAttributesByPosition(attributes);

    // Objeto JSON con los atributos agrupados por filas.
    const attributesGroupByPosition = _.groupBy(attributesSortedByPosition, 'position.row');

    // Quitar los atributos sin posicion, y convertir el JSON a un array
    const attributesArrayGroupByPosition = [];
    for (let key in attributesGroupByPosition) {
      if (key !== 'undefined') {
        attributesArrayGroupByPosition.push(attributesGroupByPosition[key]);
      }
    }
    // Arreglo de attributos agrupados por posiciones.
    return attributesArrayGroupByPosition;
  }

  _getAttributesWithoutPosition(attributes) {
    return attributes.filter(attribute => attribute.position === undefined);
  }

  _sortAttributesByPosition(attributes) {
    return attributes.sort((a, b) => {
      if (a.position === undefined ||
        (a.position.row === undefined || a.position.col === undefined)) {
        return -1;
      }
      if (b.position === undefined ||
        (b.position.row === undefined || b.position.col === undefined)) {
        return 1;
      }
      return (a.position.row - b.position.row) || (a.position.col - b.position.col);
    });
  }
};
