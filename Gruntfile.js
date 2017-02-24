(function () {
  'use strict';

  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

  module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var config = {
      src: 'src/',
      app: 'src/app',
      bowerFiles: 'src/bower-components',
      dist: 'dist',
      tmp: '.tmp',
      buildFileName: 'mw-portal'
    };

    grunt.initConfig({
        config: config,
        watch: {
          options: {
            livereload: true
          },
          compass: {
            files: [
              '<%= config.app %>/*.scss',
              '<%= config.app %>/modules/*.scss',
              '<%= config.app %>/modules/**/styles/{,*/}*.scss'
            ],
            tasks: ['compass:server']
          },
          livereload: {
            files: [
              '<%= config.src %>/index.html',
              '<%= config.app %>/**/*.html',
              '<%= config.app %>/modules/*.js',
              '<%= config.app %>/modules/**/*.js',
              '<%= config.app %>/modules/**/i18n/*.json'
            ]
          }
        },
        connect: {
          options: {
            hostname: '0.0.0.0',
            base: ['<%= config.src %>', '.tmp'],
            middleware: function (connect, options, defaultMiddleware) {
              return [
                proxySnippet
              ].concat(defaultMiddleware);
            }
          },
          server: {
            options: {
              port: 9000,
              livereload: true
            }
          },
          dist: {
            options: {
              port: 9009,
              base: 'dist'
            }
          }
        },
        clean: {
          dist: {
            files: [
              {
                dot: true,
                src: [
                  '<%= config.dist %>/*'
                ]
              }
            ]
          },
          tmp: {
            files: [
              {
                dot: true,
                src: [
                  '<%= config.tmp %>/*'
                ]
              }
            ]
          },
          server: '.tmp'
        },
        jshint: {
          options: {
            jshintrc: '.jshintrc'
          },
          all: [
            '<%= config.app %>/modules/**/{,*/}*.js'
          ]
        },
        compass: {
          options: {
            cssDir: '<%= config.tmp %>',
            relativeAssets: true
          },
          build: {
            options: {
              sassDir: ['<%= config.tmp %>/app'],
              imagesDir: '<%= config.tmp %>/app/modules',
              fontsDir: '<%= config.tmp %>/app/modules',
              importPath: ['<%= config.tmp %>/bower-components', '<%= config.tmp %>/app/modules']
            }
          },
          server: {
            options: {
              sassDir: ['<%= config.app %>'],
              imagesDir: '<%= config.app %>/modules',
              fontsDir: '<%= config.app %>/modules',
              importPath: ['<%= config.src %>/bower-components', '<%= config.app %>/modules']
            }
          }
        },
        useminPrepare: {
          src: ['<%= config.tmp %>/index.html'],
          options: {
            dest: '<%= config.dist %>'
          }
        },
        usemin: {
          html: ['<%= config.dist %>/**/{,*/}*.html'],
          css: ['<%= config.dist %>/**/{,*/}*.css'],
          options: {
            dirs: ['<%= config.dist %>']
          }
        },
        imagemin: {
          dist: {
            files: [
              {
                expand: true,
                cwd: '<%= config.app %>',
                src: '**/{,*/}*.{png,jpg,jpeg}',
                dest: '<%= config.dist %>'
              }
            ]
          }
        },
        cssmin: {
          dist: {
            files: [{
              expand: true,
              cwd: '<%= config.dist %>',
              src: ['*.css', '!*.min.css'],
              dest: '<%= config.dist %>',
              ext: '.css'
            }]
          }
        },
        ngAnnotate: {
          options: {
            singleQuotes: true
          },
          dist: {
            files: [
              {
                expand: true,
                cwd: '<%= config.tmp %>/concat/modules/',
                src: '<%= config.buildFileName %>.min.js',
                dest: '<%= config.tmp %>/concat/modules'
              }
            ]
          }
        },
        ngmin: {
          dist: {
            files: [
              {
                expand: true,
                cwd: '.tmp/concat/modules/',
                src: '*.js',
                dest: '.tmp/concat/modules/'
              }
            ]
          }
        },
        uglify: {
          options: {
            mangle: true //obfuscation
          }
        },
        rev: {
          dist: {
            files: {
              src: [
                '<%= config.dist %>/assets/**/{,*/}*.*',
                '<%= config.dist %>/modules/{,*/}*.js',
                '<%= config.dist %>/{,*/}*.css'
              ]
            }
          }
        },
        copy: {
          portalToTmpFolder: {
            files: [
              {
                expand: true,
                dot: true,
                cwd: '<%= config.src %>',
                dest: '<%= config.tmp %>',
                src: [
                  '**/*'
                ]
              }
            ]
          },
          buildToDist: {
            files: [
              {
                expand: true,
                dot: true,
                cwd: '<%= config.tmp %>',
                dest: '<%= config.dist %>',
                src: [
                  '*.*',
                  'app/modules/**/images/{,*/}*',
                  'app/modules/**/assets/{,*/}*',
                  'app/modules/**/{,*/}*.json',
                  'images/**/{,*/}*',
                  'assets/**/{,*/}*',
                  'fonts/**/{,*/}*'
                ]
              }
            ]
          },
          buildStyleToDist: {
            src: '<%= config.tmp %>/styles/*.css',
            dest: '<%= config.dist %>/style.css',
            flatten: true,
            filter: 'isFile'
          },
          fonts: {
            files: [
              {
                expand: true,
                cwd: '<%= config.bowerFiles %>/font-awesome',
                src: 'fonts/**/*.{eot,svg,ttf,woff,woff2}',
                dest: '<%= config.src %>'
              }
            ]
          }
        },
        replace: {
          addCacheManifest: {
            src: ['<%= config.dist %>/index.html'],
            overwrite: true,
            replacements: [{
              from: /<html([^>]+)>/g,
              to: function (orgStr) {
                var cacheManifestPath = grunt.file.expand(config.dist + '/*.appcache')[0].split('/')[1];
                return orgStr.replace('>', ' manifest="' + cacheManifestPath + '">');
              }
            }]
          }
        },
        ngtemplates: {
          app: {
            src: [
              '<%= config.app %>/modules/**/*.html',
              '!<%= config.app %>/modules/**/node_modules/**/{,*/}*.html'
            ],
            dest: '<%= config.tmp %>/concat/modules/<%= config.buildFileName %>.ui.min.js',
            options: {
              url: function (url) {
                return url.replace('src/', '');
              },
              bootstrap: function (module, script) {
                return 'angular.module("mwPortal").run(["$templateCache", function($templateCache) {' + script + '}]);';
              }
            }
          }
        },
        manifest: {
          generate: {
            options: {
              basePath: '<%= config.dist %>',
              preferOnline: false,
              verbose: true,
              timestamp: true,
              hash: false,
              master: ['index.html'],
              process: function (path) {
                return path.replace('dist/', '');
              }
            },
            src: [
              'index.html',
              '**/*.js',
              '**/*.css',
              '**/*.png',
              'fonts/*.*'
            ],
            dest: '<%= config.dist %>/manifest.appcache'
          }
        }
      }
    );

    grunt.registerTask('serve', [
      'copy:fonts',
      'clean:server',
      'compass:server',
      'configureProxies:server',
      'connect:server',
      'watch'
    ]);

    grunt.registerTask('test', [
      'jshint'
    ]);

    grunt.registerTask('prepareBuild', [
      'clean:tmp',
      'clean:dist',
      'copy:fonts',
      'copy:portalToTmpFolder'
    ]);

    grunt.registerTask('buildTmpFolder', [
      'compass:build',
      'useminPrepare',
      'imagemin',
      'concat',
      'ngtemplates',
      'ngAnnotate:dist',
      'uglify',
      'copy:buildToDist',
      'cssmin',
      'rev:dist',
      'manifest',
      'replace:addCacheManifest',
      'usemin',
      'clean:tmp'
    ]);

    grunt.registerTask('build', [
      'prepareBuild',
      'test:codequality',
      'buildTmpFolder'
    ]);

    grunt.registerTask('default', ['server']);
  };

}());
