// Generado el 2017-09-22
// generator-f6html 1.0.15
'use strict';

module.exports = function (grunt) {

  // Comprueba lo que tarda cada tarea
  require('time-grunt')(grunt);

  // Carga cada tarea de grunt sin necesidad de llamarla
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  // Carpetas de desarrollo
  var config = {
    app: 'src',
    dist: 'dist',
    pre: 'pre'
  };


  // Empieza lo bueno. Tareas.
  grunt.initConfig({

    // Project settings
    config: config,

    // Escucha la carpeta src por si hay algún cambio. Si lo hay, corre la tarea correspondiente.
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep:pre']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.app %>/styles/**/*.{scss,sass}'],
        tasks: ['copy:stylesPre','sass:prueba', 'postcss:scss']
      },
      styles: {
        files: ['<%= config.app %>/styles/**/*.css'],
        tasks: ['copy:stylesPre', 'cssjoin:pre']
      },
      coffee: {
        files: ['<%= config.app %>/script/**/*.coffee'],
        tasks: ['copy:scriptsPre','coffee:prueba']
      },
      js: {
        files: ['<%= config.app %>/script/**/*.js'],
        tasks: ['copy:scriptsPre']
      },
      html: {
      files: ['<%= config.app %>/**/*.html','<%= config.app %>/**/*.shtml'],
        tasks: ['copy:html','ssi','copy:ssi','clean:ssi','clean:predashed','wiredep:pre','processhtml:pre']
      }
    },
    browserSync: {
      options: {
        notify: false,
        background: true,
        reloadDelay: 2000,
        watchOptions: {
          ignored: ''
        }
      },
      livereload: {
        options: {
          files: [
            '<%= config.pre %>/**/*.html',
            '<%= config.pre %>/styles/**/*.css',
            '<%= config.pre %>/imgs/**/*',
            '<%= config.pre %>/script/**/*.js'
          ],
          port: 9000,
          server: {
            baseDir: ['<%= config.pre %>', config.app],
            routes: {
              '/bower_components': './bower_components'
            }
          }
        }
      },
      dist: {
        options: {
          background: false,
          server: '<%= config.dist %>'
        }
      }
    },
    // Empties folders to start fresh
    clean: {
      dist: {
        options: {
          force: true
        },
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      pre: {
        options: {
          force: true
        },
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.pre %>/*',
            '!<%= config.pre %>/.git*'
          ]
        }]
      },
      server: '.tmp',
      dashed: {
        options: {
          force: true
        },
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/_*.*'
          ]
        }]
      },
       scripts: {
        options: {
          force: true
        },
        files: [{
          dot: true,
          src: [
            '<%= config.pre %>/script'
          ]
        }]
      },
      predashed: {
        options: {
          force: true
        },
        files: [{
          dot: true,
          src: [
            '<%= config.pre %>/_*.*'
          ]
        }]
      },
      ssi: {
        options: {
          force: true
        },
        files: [{
          dot: true,
          src: [
            '<%= config.pre %>/*.shtml'
          ]
        }]
      }
    },
    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: true,
        sourceMapEmbed: true,
        sourceMapContents: true,
        includePaths: ['.']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.pre %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      prueba: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= config.pre %>/styles/main.css': ['<%= config.pre %>/styles/main.scss']
        }
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          // Add vendor prefixed styles
          require('autoprefixer')({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
          })
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }]
      },
      pre: {
        files: [{
          expand: true,
          cwd: '<%= config.pre %>/styles/',
          src: '{,*/}*.css',
          dest: '<%= config.pre %>/styles/'
        }]
      },
      scss: {
        files: [{
          expand: true,
          cwd: '<%= config.pre %>/styles/',
          src: 'main.css',
          dest: '<%= config.pre %>/styles/'
        }]
      }
    },
    // Compiles Coffee to JS and generates necessary files if requested
    coffee: {
      options : {
        sourceMap: true
      },
      prueba: {
        options: {
          join: true,
          joinExt: '.js'
        },
        files: {
          '<%= config.pre %>/script/main.js':['<%= config.pre %>/script/**/*.coffee'],
        }
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.pre %>/scripts',
          src: ['*.coffee'],
          dest: '.tmp/script',
          ext: '.js'
        }]
      }
    },
    // Automatically inject Bower components into the HTML file
    wiredep: {
      pre: {
        src: ['<%= config.pre %>/**/*.html'],
        exclude: ['bootstrap.js'],
        fileTypes: {
            html: {
                block: /(([\s\t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                detect: {
                    js: /<script.*src=['"](.+)['"]>/gi,
                    css: /<link.*href=['"](.+)['"]/gi
                },
                replace: {
                    js: '<script src="{{filePath}}"></script>',
                    css: '<link rel="stylesheet" href="{{filePath}}" />'
                }
            }
        }
        //ignorePath: /^(\.\.\/)*\.\./
      },
      sass: {
        src: ['<%= config.pre %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /^(\.\.\/)+/
      }
    },
    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= config.dist %>/script/{,*/}*.js',
          '<%= config.dist %>/styles/{,*/}*.css',
          '<%= config.dist %>/imgs/**/*.*',
          '<%= config.dist %>/styles/base/fonts/{,*/}*.*',
          '<%= config.dist %>/*.{ico,png}'
        ]
      }
    },
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
        options: {
          dest: '<%= config.dist %>'
        },
        html: '<%= config.pre %>/index.html'
    },
    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
        options: {
          assetsDirs: [
            '<%= config.dist %>',
            '<%= config.dist %>/imgs',
            '<%= config.dist %>/styles',
            '<%= config.dist %>/script'
          ]
        },
        html: ['<%= config.dist %>/**/*.html'],
        css: ['<%= config.dist %>/styles/{,*/}*.css'],
        js: ['<%= config.dist %>/script/{,*/}*.js']
    },
    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/imgs',
          src: '**/*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/imgs'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/imgs',
          src: '**/*.svg',
          dest: '<%= config.dist %>/imgs'
        }]
      }
    },
    tinypng: {
      options: {
        apiKey: "QH_tFrKXadHOXoftg0L2GbofB0AfkKw-",
        checkSigs: true,
        sigFile: "tinypng.sig",
        summarize: true,
        showProgress: true
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.app %>/imgs',
            src: ['**/*.png'],
            dest: '<%= config.dist %>/imgs',
            ext: '.png'
          }
        ]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          // true would impact styles with attribute selectors
          removeRedundantAttributes: false,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '**/*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },
    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    cssmin: {
      dist: {
        files: {
          '<%= config.dist %>/styles/main.css': [
            '<%= config.pre %>/styles/main.css'
          ]
        }
      }
    },
    uglify: {},
    concat: {
      dist: {}
    },
    processhtml: {
      dist: {
        options: {
          recursive: true
        },
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.dist %>',
            src: [
              '*.html'
            ]
          }
        ]
      },
      pre: {
        options: {
          recursive: true
        },
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.pre %>',
            dest: '<%= config.pre %>',
            src: [
              '*.html'
            ]
          }
        ]
      },
      serve: {
        options: {
          recursive: true
        },
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '.tmp',
            src: [
              '*.html'
            ]
          }
        ]
      }
    },
    uncss: {
      dist: {
        files: {
          '<%= config.pre %>/styles/main.css': ['<%= config.pre %>/*.html'],
        },
      }
    },
    cssjoin: {
      join :{
        files: {
          '<%= config.dist %>/styles/main.css': ['<%= config.app %>/styles/main.css'],
        },
      },
      pre :{
        options: {
          paths : ["<%= config.pre %>/styles/"]
        },
        files: {
          '<%= config.pre %>/styles/main.css': ['<%= config.pre %>/styles/main.css'],
        },
      },
      dist :{
        options: {
          paths : ["<%= config.dist %>/styles/"]
        },
        files: {
          '<%= config.pre %>/styles/main.css': ['<%= config.pre %>/styles/main.css'],
        },
      }
    },
    jsjoin: {
      join : {
        files: {
          '<%= config.dist %>/script/main.js': ['<%= config.app %>/script/main.js'],
        },
      },
      pre :{
        options: {
          paths : ["<%= config.pre %>/script/"]
        },
        files: {
          '<%= config.pre %>/script/main.js': ['<%= config.pre %>/script/main.js'],
        },
      },
      dist :{
        options: {
          paths : ["<%= config.dist %>/script/"]
        },
        files: {
          '<%= config.pre %>/script/main.js': ['<%= config.pre %>/script/main.js'],
        },
      }
    },
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.pre %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'imgs/**/*.*',
            '**/*.html',
            '**/*.json',
            'styles/base/fonts/{,*/}*.*',
            'styles/**/*.{jpg,png,gif}'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
          dest: '<%= config.dist %>'
        }]
      },
      vendor: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.tmp/concat/styles/',
          dest: '<%= config.dist %>/styles/',
          src: [
            'vendor.css'
          ]

        }]
      },
      pre: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.pre %>',
          src: ['**/*.*']
        }, {
          expand: true,
          dot: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
          dest: '<%= config.dist %>'
        }]
      },
      stylesPre: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '<%= config.pre %>/styles/',
        src: ['**/*.scss','**/*.css']
      },
      html: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.pre %>/',
          src: [
            '**/*.shtml', '**/*.html'
          ]

        }]
      },
      ssi: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.pre %>',
          dest: '<%= config.pre %>/',
          src: [
            '**/*.shtml'
          ],
          rename: function(dest, src) {
            return dest + src.replace('.shtml','.html');
          }
        }]
      },
      scripts: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/script',
        dest: '<%= config.pre %>/script/',
        src: '**/*.js'
      },
      scriptsPre: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/scripts',
        dest: '<%= config.pre %>/scripts/',
        src: ['**/*.coffee']
      }
    },
    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.dist %>/script/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.dist %>/script/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '!<%= config.dist %>/script/vendor/*'
          ]
        },
        uglify: true
      },
      pre: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.pre %>/script/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.pre %>/script/{,*/}*.js',
            '<%= config.pre %>/styles/{,*/}*.css',
            '!<%= config.pre %>/script/vendor/*'
          ]
        },
        uglify: true
      }
    },
    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
      ],
      dist: [
        'imagemin',
        'svgmin'
      ]
    },
    ssi: {
      options: {
        cache: 'all',
        ext: '.html',
        baseDir: '<%= config.app %>',
      },
      target: {
        files: [{
            expand: true,
            cwd: '<%= config.app %>',
            src: ['**/*.shtml'],
            dest: '<%= config.pre %>'
          }]
      }
    }
  });





  grunt.registerTask('serve', 'start the server and preview your app', function (target) {
    grunt.task.run([
      'clean:pre', // Borra carpeta pre
      'copy:pre', // Copia carpeta src a pre
      'ssi', // En pre, junta los includes en los archivos shtml
      'copy:ssi', // En pre, copia los shtml a html
      'clean:ssi', // Borra los shtml
      'clean:predashed', // Borra el footer y header de pre
      'wiredep:pre', // Mete los componentes de bower en los html en pre
      'useminPrepare',

      'sass:prueba',
      'postcss:scss',
       // Completa el main.css de tmp los prefijos de los navegadores (-moz, etc)
      'coffee:prueba',
      'concat', // Mete todos los js y css en un único archivo. Los nuestros en main. Los componentes en vendor.

      'cssmin:dist', // Minimiza el main.css de tmp y lo copia en dist.

      'modernizr:pre',  // Copia el modernizr.js
      'processhtml:pre', // Cambia la ruta del css en los html de pre.
      'usemin', // Sustituye los href de los html con las nuevas rutas.
      'browserSync:livereload', // Abre el navegador
      'watch' // Escucha los cambios
    ]);
  });


  grunt.registerTask('png', 'Minimize your pngs from app to dist', function (target) {
    grunt.task.run([
      'tinypng' //Comprime los pngs y los pasa a dist
    ]);
  });


  grunt.registerTask('build', [
    'clean:dist', // Borra carpeta dist
    'clean:pre', // Borra carpeta pre
    'copy:pre', // Copia carpeta src a pre
    'ssi', // En pre, junta los includes en los archivos shtml
    'copy:ssi', // En pre, copia los shtml a html
    'clean:ssi', // Borra los shtml
    'clean:predashed', // Borra el footer y header de pre
    'wiredep:pre', // Mete los componentes de bower en los html en pre
    'useminPrepare',

    'sass:prueba',
    'postcss:scss',
     // Completa el main.css de tmp los prefijos de los navegadores (-moz, etc)
    'coffee:prueba',
    'concat', // Mete todos los js y css en un único archivo. Los nuestros en main. Los componentes en vendor.
    'cssmin:dist', // Minimiza el main.css de tmp y lo copia en dist.
    'uglify', // Minimiza los dos js concatenados y los copia en dist.
    'copy:dist', // Copia los archivos de pre a dist.

    'modernizr:dist',  // Copia el modernizr.js
    'copy:vendor',
    'processhtml:pre', // Cambia la ruta del css en los html de pre
    //'filerev', // Sustituye los nombres de imágenes y archivos aleatoriamente y cambia los enlaces a ellos, para evitar cachés.
    'usemin', // Sustituye los href de los html con las nuevas rutas.
    'htmlmin' // Comprime los htmls.
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
