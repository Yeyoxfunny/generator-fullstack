const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.typeOfApp = opts.typeOfApp;
    this.appName = opts.appName;
    this.entities = opts.entities;
    this.globalMessages = opts.globalMessages;
  }

  writing() {
    this._writeSourceFolder();
    this._writeCommonFiles();
    this._writeAngularEntitiesModule();
    this._writeAngularLayoutsComponents();
    this.fs.copy(this.templatePath('angular/e2e'), this.destinationPath('e2e'));
  }

  _writeSourceFolder() {
    this.fs.copy(this.templatePath('angular/src'), this.destinationPath('src'));
  }

  _writeAngularEntitiesModule() {
    const fileNames = ['.module', '.route', '-shared.module'];

    fileNames.forEach((fileName) => {
      this.fs.copyTpl(
        this.templatePath(`angular/_app/entities/entities${fileName}.ts`),
        this.destinationPath(`src/app/entities/entities${fileName}.ts`),
        { entities: this.entities, globalMessages: this.globalMessages, _ }
      );
    });

    this.fs.copy(
      this.templatePath('angular/_app/entities/orderby.pipe.ts'),
      this.destinationPath('src/app/entities/orderby.pipe.ts')
    );
  }

  _writeAngularLayoutsComponents() {
    this.fs.copyTpl(
      this.templatePath('angular/_app/layouts'),
      this.destinationPath('src/app/layouts'),
      { entities: this.entities, appName: this.appName, _ }
    );
  }

  _writeCommonFiles() {
    this.fs.copy(this.templatePath('angular/angular.json'), this.destinationPath('angular.json'));
    this.fs.copy(this.templatePath('angular/tsconfig.json'), this.destinationPath('tsconfig.json'));
    this.fs.copy(this.templatePath('angular/tslint.json'), this.destinationPath('tslint.json'));
    // TODO - Add .gitignore in templates
    // this.fs.copy(this.templatePath('angular/.gitignore'), this.destinationPath('.gitignore'));
  }
};
