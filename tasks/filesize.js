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
    var results = '"file","size"\n';
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
        
        if (options.gangResults || options.trackResults) {
        	results = results + '"' + f.dest + '","'+ size +'"\n';
        }
      }

    });
    if (options.gangResults) {
    	grunt.file.write(options.gangResults, results);
    }
    
    if (options.trackResults) {
    	var d= new Date();
    	var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    	var month = months[d.getMonth()];
    	var day = d.getDate();
    	if (day < 10) {day = '0' + day;}
    	grunt.file.write(options.gangResults + day + month + d.getFullYear() + '.csv', results);
    }
  });

};
//dummy comment added blah blah blah