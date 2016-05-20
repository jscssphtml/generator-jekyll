/*!
 * Huawei Digital Design Guides's Gruntfile
 * generated on <%= date %> using <%= name %> <%= version %>
 */

module.exports = function (grunt) {
  'use strict';

  var serveStatic = require('serve-static');

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: 'dist',
      server: '.tmp',
      sass: '.sass-cache'
    },

    watch: {
      html: {
        files: 'html/{,*/,*/*/}*.{html,yml}',
        tasks: ['jekyll:server']
      },
      styles: {
        files: 'scss/{,*/}*.scss',
        tasks: ['sass:styles', 'postcss:dist']
      },
      gruntfile: {
        files: 'Gruntfile.js'
      },
      livereload: {
        options: {
          livereload: ''
        },
        files: [
          '.tmp/{,*/}*.html',
          '.tmp/styles/{,*/}*.css'
        ]
      }
    },

    sass: {
      options: {
        style: 'expanded',
        unixNewlines: true,
      },
      styles: {
        files: {
          '.tmp/styles/designguide.css': 'scss/designguide.scss' // 'destination': 'source'
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'bower_components/bootstrap/dist',
          dest: 'dist/',
          src: [
            'fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          dest: 'dist/',
          src: [
            'assets/**/*.{ico,png,jpg,jpeg,gif}'
          ]
        }, {
          expand: true,
          dest: 'dist/',
          src: [
            'fonts/{,*/}*.*'
          ]
        }]
      }
    },

    connect: {
      options: {
        port: 4567,
        livereload: 35729,
        hostname: '*',
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect().use(
                '/bower_components',
                serveStatic('./bower_components')
              ),
              connect().use(
                '/fonts',
                serveStatic('./fonts')
              ),
              connect().use(
                '/assets',
                serveStatic('./assets')
              ),
              serveStatic('.tmp')
            ];
          }
        },
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: 'last 2 versions'
          })
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },

    filerev: {
      dist: {
        src: [
          'dist/{,*/}*.{js,css}',
        ]
      }
    },

    useminPrepare: {
      html: 'html/{,*/}*.html',
      options: {
        dest: 'dist',
        flow: {
          html: {
            steps: {
              js: ['concat'], //, 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['dist/{,*/}*.html'],
      css: ['dist/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          'dist',
          'dist/assets',
          'dist/styles'
        ]
      }
    },

    jekyll: {
      options: {
        config: 'html/_config.yml'
      },
      server: {
        options: {
          dest: '.tmp/'
        }
      },
      dist: {
        options: {
          dest: 'dist/'
        }
      }
    },

    wiredep: {
      examples: {
        src: ['html/*.html'],
        ignorePath: /\.\.\//
      },
      layouts: {
        src: ['html/{_layouts,_includes}/*.html'],
        ignorePath: /\.\.\/\.\.\//
      }
    },

  });

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  require('time-grunt')(grunt);

  grunt.registerTask('serve', [
    'clean:server',
    'jekyll:server',
    'sass:styles',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'jekyll:dist',
    'sass:styles',
    'postcss',
    'copy:dist',
    'concat',
    'cssmin',
    'filerev',
    'usemin'
  ]);

  grunt.registerTask('default', ['build']);

};