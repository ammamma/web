
(function () {
   'use strict';
}());

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // Combine JS files to one main file.
    concat: {
      options: {
        separator: '\r\n'
      },
      dist: {
        src: [
          'src/js/globals.js',
          'src/js/boot.js'
        ],
        dest: 'src/js/all-combined.js'
      }
    },
    
    // Minify the JS file.
    uglify: {
      options: {
        compress: true,
        mangle: true,
        //mangleProperties: true,
        sourceMap : true,
        sourceMapName : 'dist/js/main.min.js.map',
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'dist/js/main.min.js' : ['<%= concat.dist.dest %>']
        }
      }
    },
    
    // Compile Sass SCSS files to CSS.
    compass: {
      dist: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'dist/css',
          // development, production
          environment: 'development',
          // nested, expanded, compact, compressed
          outputStyle: 'compact',

          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          specify: 'src/scss/*.scss' 
        }
      }
    },
    
    // Copy HTML files to dist.
    copy: {
      main: {
        files: [
          {
            cwd:    'src/html/',   // set working folder / root to copy
            src:    ['*.html'],     // copy html files
            dest:   'dist/html/',  // destination folder
            expand: true          // required when using cwd
          },
          {
            cwd:    'bower_components/jquery/dist/',   // set working folder / root to copy
            src:    ['jquery.min.js'], // copy html files
            dest:   'dist/js/',   // destination folder
            expand: true         // required when using cwd
          }
        ]
      }
    },
    
    // Task for cleaning.
    clean: {
      contents: ['dist/*'],
      combined_js: ['<%= concat.dist.dest %>']
    }
    
  });




  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Run as part of default task.
  grunt.registerTask('default', ['concat', 'uglify', 'compass', 'copy']);

};
