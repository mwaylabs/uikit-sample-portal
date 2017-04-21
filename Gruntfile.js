(function () {
  'use strict';

  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

  module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var getVersionFromPackageJson = function () {
      var packageJSON = grunt.file.readJSON('./package.json');
      return packageJSON.version;
    };

    var setConfigVars = function (filePath, configObj) {

      filePath = grunt.template.process(filePath);

      if (grunt.file.expand(filePath).length > 0) {
        filePath = grunt.file.expand(filePath)[0];

        var configJSON = grunt.file.readJSON(filePath);

        for (var key in configObj) {
          if (configObj.hasOwnProperty(key) && configJSON[key]) {
            configJSON[key] = configObj[key];
          }
        }
        grunt.file.write(filePath, JSON.stringify(configJSON));
      } else {
        grunt.log.error('Config file could not be found!');
      }

    };

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
            protocol: 'http',
            base: ['<%= config.src %>', '.tmp'],
            middleware: function (connect, options, defaultMiddleware) {
              return [
                proxySnippet
              ].concat(defaultMiddleware);
            }
          },
          proxies: [
            {
              context: ['/api'],
              host: '127.0.0.1',
              port: 3000
            }
          ],
          server: {
            options: {
              port: 9000,
              livereload: true
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
                  'app/**/{,*/}*.json',
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
        processhtml: {
          dist: {
            options: {
              data: {
                version: getVersionFromPackageJson()
              }
            },
            src: '<%= config.tmp %>/index.html',
            dest: '<%= config.tmp %>/index.html'
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
      'copy:fonts', // this is needed for external fonts that were installed via bower like font-awesome
      'clean:server', // remove all prevous build files
      'compass:server', // compile sass to css
      'connect:server', // start a local server that is serving your files (localhost:9000)
      'configureProxies:server', // start proxy server for api requests
      'watch' // watch files and recompile sass too css and reload page
    ]);

    grunt.registerTask('test', [
      'jshint' // lint all javascript files of your project if they match the settings defined in the .jshintrc
    ]);

    grunt.registerTask('prepareBuild', [
      'clean:tmp', // clean previous build files
      'clean:dist', // clean previous build files
      'copy:fonts', // this is needed for external fonts that were installed via bower like font-awesome
      'copy:portalToTmpFolder', // copy the whole src folder into tmp for the build step
      'processhtml:dist' // set config vars to production mode in index.html
    ]);

    grunt.registerTask('buildTmpFolder', [
      'compass:build', // compile sass file into css
      'useminPrepare', // prepare dynamic configuration for concat task by parsing the index.html <!-- build x.js --> comments
      'imagemin', // optimize images
      'concat', // put all file group that were defined by useminPrepare into one file
      'ngtemplates', // puts all used html files into one file so there won't be any template reqeusts to the server
      'ngAnnotate:dist', // optimize injectors of all angular controllers so obfuscation is possible
      'uglify', // js minfication and obfuscation
      'copy:buildToDist', // copy output of previous task into final dist folder
      'cssmin', // css minification
      'rev:dist', // add cache buster to file name (hash.filename.ext)
      'manifest', // be careful with the cache manifest. Make sure the server is not caching the index.html otherwise you will get into trouble!
      'replace:addCacheManifest', //this task is only needed when using the manifest task
      'usemin', // update the html file links with the links to the concated, minified files
      'clean:tmp' // clean tmp folder
    ]);

    grunt.registerTask('build', [
      'prepareBuild',
      'test',
      'buildTmpFolder'
    ]);

    grunt.registerTask('default', ['server']);
  };
}());
