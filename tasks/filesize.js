/*
 * grunt-filesize
 * https://github.com/k-maru/grunt-filesize
 *
 * Copyright (c) 2015 kazuhide maruyama
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  'use strict';

  var fs = require("fs"),
      path = require("path"),
      numeral = require("numeral"),
      moment = require("moment"),
      os = require('os'),
      defaultFormat= "{filename}: {kb,green:0,0.00} kb ({size,green:0,0} bytes)";

  function isArray(val){
    return Object.prototype.toString.call(val) === "[object Array]";
  }

  function isStr(val){
    return Object.prototype.toString.call(val) === "[object String]";
  }

  function isNum(val){
    return Object.prototype.toString.call(val) === "[object Number]";
  }

  function isDate(val){
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return Object.prototype.toString.call(val) === "[object Object]" &&
        typeof val !== "undefined" && val !== null;
  }

  function isFunc(val){
    return Object.prototype.toString.call(val) === "[object Function]";
  }

  function trim(val){
    if(typeof val === "undefined" || val === null){
      return "";
    }
    return (val + "").replace(/^[\s　]+|[\s　]+$/g, "");
  }

  function retrieveOutputs(optOutput){
    if(!optOutput){
      return [];
    }
    if(isArray(optOutput)){
      return optOutput
    }
    return [optOutput];
  }

  function prepareOutput(output, options){
    //パスが指定されているものとみなす
    if(isStr(output)){
      return {
        path: output,
        format: options.format
      }
    }
    //オブジェクトじゃなかったら処理をなしにするためundefinedを返す
    if(!isObj(output)){
      return;
    }
    if(!!output.stdout){
      return {
        stdout: true,
        format: isStr(output.format) ? output.format : options.format
      };
    }
    if(isStr(output.path)){
      return {
        path: output.path,
        format: isStr(output.format) ? output.format : options.format,
        append: !!output.append
      };
    }
    return;
  }

  function format(format, data, useColor){
    if(isFunc(format)){
      return format(data);
    }
    return format.toString().replace(/\{?\{(.+?)\}\}?/g, function (match, param) {
      var colonPos, prop, formatStr, commaPos, colorStr,
          val, temp;

      if (match.substr(0, 2) === "{{" && match.substr(match.length - 2) === "}}") {
        return match.replace("{{", "{").replace("}}", "}");
      }
      prop = param;
      colonPos = prop.indexOf(":");
      if(colonPos > -1){
        temp = param;
        prop = temp.substr(0, colonPos) + "";
        formatStr = temp.substr(colonPos + 1);
      }
      commaPos = prop.indexOf(",");
      if(commaPos > -1){
        temp = prop;
        prop = temp.substr(0, commaPos) + "";
        colorStr = temp.substr(commaPos + 1);
      }
      prop = trim(prop);
      formatStr = trim(formatStr);
      colorStr = trim(colorStr);

      if(!prop){
        return "";
      }

      val = data[prop];

      if(formatStr && (isNum(val) || isDate(val))){
        if(isNum(val)){
          val = numeral(val).format(formatStr);
        } else if(isDate(val)){
          val = moment(val).format(formatStr);
        }
      }
      val = val + "";

      if(colorStr && useColor){
        return val[colorStr];
      }
      return val;
    });
  }

  function write(output, files, now, options){
    var outputSetting = prepareOutput(output, options),
        filePath, filePool = {};
    if(!outputSetting){
      return;
    }
    if(outputSetting.stdout){
      files.forEach(function(file){
        grunt.log.writeln(format(outputSetting.format, file, true));
      });
    }
    if(outputSetting.path){
      files.forEach(function(file){
        filePath = format(outputSetting.path, file, false);
        if(!filePool[filePath]){
          filePool[filePath] = true;
          if(!grunt.file.exists(filePath)){
            grunt.file.write(filePath, "");
          } else if(!outputSetting.append) {
            grunt.file.write(filePath, "");
          }
        }
        fs.appendFileSync(filePath, format(outputSetting.format, file, false) + os.EOL);
      });
    }
  }

  grunt.registerMultiTask("filesize", "A Grunt plugin for logging filesize.", function() {
    var now = new Date(),
        options = this.options({
          output: [],
          format: defaultFormat
        }),
        outputs = retrieveOutputs(options.output),
        files = this.filesSrc.filter(function (file) {
          return grunt.file.exists(file);
        }).map(function(file){
          var stat = fs.statSync(file);
          return {
            fullpath: path.resolve(file),
            filename: file,
            basename: path.basename(file),
            size: stat.size,
            kb: (stat.size / 1024),
            mb: (stat.size / 1024 / 1024),
            now: now
          };
        });

    if(!outputs.length){
      outputs.push({
        stdout: true,
        format: options.format
      });
    }

    outputs.forEach(function(output){
      write(output, files, now, options);
    });

    //TODO: obsolete
    var opts = this.options({});
    if(opts.reporting){
      grunt.log.writeln(">>".yello + " reporting options is now obsolete.");
      this.files.forEach(function(file) {
        grunt.file.write(opts.reporting(file.dest), 'YVALUE=' + size + '\n');
      });
    }

  });
};
