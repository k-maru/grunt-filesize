grunt-filesize
==============

log file size

## Documentation
modify your `grunt.js` file by adding the following line:

    grunt.loadNpmTasks('grunt-filesize');

Then add some configuration for the plugin like so:

    grunt.initConfig({
        ...
        filesize: {
          base: {
            files: ['build/*.js']
          }
        },
        ...
    });
