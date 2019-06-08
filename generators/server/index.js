const Generator = require('yeoman-generator');
const constants = require('../generator-constants');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.typeOfApp = opts.typeOfApp;
    this.appName = opts.appName;
    this.entities = opts.entities;
  }

  writing() {
    this.fs.copy(this.templatePath('bin'), this.destinationPath('bin'));
    this.fs.copyTpl(this.templatePath('server-config'), this.destinationPath('server-config'), { appName: this.appName });
    this._writeEntryPoint();
  }

  _writeEntryPoint() {
    let sourceApiFolder = 'api/';
    if (this.typeOfApp === constants.APP_TYPE_ANGULAR_FULLSTACK) {
      sourceApiFolder = `server/${sourceApiFolder}`;
    }
    this.fs.copyTpl(
      this.templatePath('server.js'),
      this.destinationPath('server.js'),
      {
        typeOfApp: this.typeOfApp,
        entities: this.entities,
        sourceApiFolder,
        _: _
      }
    );
  }
};
