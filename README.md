# grunt-filesize

A Grunt plugin for logging filesize.

## Documentation
modify your `grunt.js` file by adding the following line:

```
grunt.loadNpmTasks('grunt-filesize');
```

Then add some configuration for the plugin like so:

```js
grunt.initConfig({
  ...
  filesize: {
    base: {
      files: [
        {expand: true, cwd: 'build', src: ['*.css', '*.js']}
      ],
      options: {
        output: [
          {
            stdout: true
          },
          {
            path: "output/file/{now:MMMDDYYYY}.csv",
            format: {filename},{size:0,0}
          },
          {
            path: "output/file/filename.txt",
            format: "{now:YYYY/MM/DD} {filename} {mb} mb",
            append: true
          }
        ]
      }
    }
  },
  ...
});
```

## Options

### format(string | function) not required.

Specify the format of the file to be output.

Specify the format in the placeholder if you have set in the String. Possible placeholder is as follows.

|placeholder |type   |description             |
|------------|-------|------------------------|
|fullpath    |string |full absolute file path |
|filename    |string |file name               |
|basename    |string |last portion of a path  |
|size        |number |file size (bytes)       |
|kb          |number |file size (kb)          |
|mb          |number |file size (mb)          |
|now         |date   |output date             |

Placeholder I enclosed in curly braces. It is possible to specify the color and format. Color is valid only if the standard output.

e.g.
```
{property,color:format}
```

Color specification the contents of the [colors](https://www.npmjs.com/package/colors) can be specified.
Format specification can be specified only in the date type or numeric type.
Date type format use the [moment](https://www.npmjs.com/package/moment).
Number type format use the [numeral](https://www.npmjs.com/package/numeral).

### output(array | string) not required.

Output options is specify the output destination and format.

Possible property is as follows.

|ploperty  |type            |description                                                            |
|----------|----------------|-----------------------------------------------------------------------|
|stdout    |bool            |output to console. If true is specified, the path property is ignored. |
|path      |string          |output file name. You can specify the place holder.                    |
|append    |bool            |Append the results to output file.                                     |
|format    |string,function |Same format option                                                     |

### reporting(function) not required.

Obsolete.

Setting the 'reporting' option will generate a properties file on the given path for each file measured, you can use those in the Jenkins Plot plugin or other ways.

e.g.

```js
options: {
  reporting: function (filePath) {
    return 'target/grunt/filesize/' + filePath + '.txt';
  }
},
```
