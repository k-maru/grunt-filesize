/*
 * grunt-filesize
 * https://github.com/k-maru/grunt-filesize
 *
 * Copyright (c) 2013 kazuhide maruyama
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var fs = require('fs');

  grunt.registerMultiTask('filesize', 'A Grunt plugin for logging filesize.', function() {
    var options = this.options({
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var path = f.src.join('');

      if (!fs.existsSync(path)){
        grunt.log.writeln(path + ": not found.");
      } else {
        var stat = fs.statSync(path),
          size = (stat.size / 1024).toFixed(2);

        grunt.log.writeln(path + ": " + String(size).green + " kb (" + String(stat.size).green + " bytes)");
        if (options.reporting) {
          grunt.file.write(options.reporting(f.dest), 'YVALUE=' + size + '\n');
        }
      }

    });
  });

};
