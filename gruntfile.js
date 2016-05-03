
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
        sourceMapName : 'dist/js/main.js.map',
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'dist/js/main.js.min' : ['<%= concat.dist.dest %>']
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
    
    // Task for cleaning.
    clean: {
      contents: ['dist/*'],
      combined_js: ['<%= concat.dist.dest %>']
    }
    
  });




  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Run as part of default task.
  grunt.registerTask('default', ['concat', 'uglify', 'compass']);

};
