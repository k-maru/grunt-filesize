# grunt-filesize

> A Grunt plugin for logging filesize.

## Documentation
modify your `grunt.js` file by adding the following line:

    grunt.loadNpmTasks('grunt-filesize');

Then add some configuration for the plugin like so:

    grunt.initConfig({
        ...
        filesize: {
          options: {
            reporting: function (filePath) {
              return 'target/grunt/filesize/' + filePath + '.txt';
            }
          },
          base: {
            files: [
                {expand: true, cwd: 'build', src: ['*.css', '*.js']}
            ]
          }
        },
        ...
    });

Setting the 'reporting' option will generate a properties file on the given path for each file measured, you can use those in the Jenkins Plot plugin or other ways.
