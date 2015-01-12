/*
 * grunt-filesize
 * https://github.com/k-maru/grunt-filesize
 *
 * Copyright (c) 2015 kazuhide maruyama
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    filesize: {
      test: {
        src: ["test/files/**/*.*", "test/files2/**/*.*"],
        options: {
          output: [
            {
              stdout: true
            },
            {
              path: "test/result/overwirte.txt",
              format: "{fullpath} {filename} {basename} {now:YYYY/MM/DD HH:mm:ss} {size}"
            },
            {
              path: "test/result/append.txt",
              format: "{fullpath} {filename} {basename} {now:YYYY/MM/DD HH:mm:ss} {size}",
              append: true
            },
            {
              path: "test/result/{now:DDMMMYYYY}.csv",
              format: "{filename},{size}"
            }
          ]
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadTasks('tasks');

};
