module.exports = function(grunt) {

  'use strict';

  var fs = require('fs');
  
  grunt.registerMultiTask('filesize', 'logging file size', function() {

    var files = grunt.file.expandFiles(this.data.files);
	files.forEach(function(item, index){
	  if(!fs.existsSync(item)){
	  	grunt.log.writeln(item + ": not found.");
	  }else{
	  	var stat = fs.statSync(item);
	    grunt.log.writeln(item + ": " + String((stat.size / 1024).toFixed(2)).green + " kb (" + String(stat.size).green + " bytes)");
	  }
	});
  });
};
