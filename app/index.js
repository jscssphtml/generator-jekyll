'use strict';

var path = require('path');
var util = require('util');
var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _s = require('underscore.string');

module.exports = generators.Base.extend({
  constructor: function () {

    generators.Base.apply(this, arguments);

    this.argument('appname', {
      type: String,
      required: false
    });

    this.appname = this.appname || path.basename(process.cwd());
    this.appname = _s.camelize(_s.slugify(_s.humanize(this.appname)));
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  welcome: function () {
    this.log(yosay());
    this.log(
      chalk.magenta(
        'Out of the box I include Bootstrap and some Jekyll recommended modules.' +
        '\n'
      )
    );
  },

  writing: {
    gruntfile: function () {
      this.fs.copyTpl(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js'), {
          date: (new Date).toISOString().split('T')[0],
          name: this.pkg.name,
          version: this.pkg.version
        }
      );
    },

    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
    },
  }

});