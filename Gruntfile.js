module.exports = function(grunt) {

	// This is the default port that livereload listens on;
	// change it if you configure livereload to use another port.
	var LIVERELOAD_PORT = 35729;
	// lrSnippet is just a function.
	// It's a piece of Connect middleware that injects
	// a script into the static served html.
	var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
	// All the middleware necessary to serve static files.
	var livereloadMiddleware = function (connect, options) {
	  return [
		// Inject a livereloading script into static files.
		lrSnippet,
		// Serve static files.
		connect.static(options.base),
		// Make empty directories browsable.
		connect.directory(options.base)
	  ];
	};

    // Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'dist/js/controllers.min.js': ['src/js/controllers/**/*.js'],
					'dist/js/services.min.js': ['src/js/services/**/*.js'],
					'dist/js/app.min.js': ['src/js/app.js'],
				}
			}
		},
		bower_concat: {
			all: {
				dest: 'dist/js/dependencies.js',
				cssDest: 'dist/css/dependencies.css',
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/css/app.min.css': ['src/css/app/*.css'],
					'dist/css/third-party.min.css': ['src/css/*.css']
				}
			}
		},
		processhtml: {
			options: {
				data: {
					message: 'Hello world!'
				}
			},
			dist: {
				files: {
					'dist/index.html': ['src/index.html']
				}
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, flatten: true, src: ['src/partials/*', 'src/img/*', 'src/fonts/*'], dest: 'dist/partials', filter: 'isFile'},
					{expand: true, flatten: true, src: ['src/css/bootstrap.min.css'], dest: 'dist/css', filter: 'isFile'}
				],
			},
		},
		connect: {
			dev: {
				options: {
					port: 9000,
					base: {
						path: 'src',
						options: {
							index: 'index.html',
							maxAge: 300000
						}
					}
				}
			},
			prod: {
				options: {
					port: 8000,
					base: {
						path: 'dist',
						options: {
							index: 'index.html',
							maxAge: 300000
						}
					}
				}
			}
		},
		watch: {
			client: {
				// '**' is used to include all subdirectories
				// and subdirectories of subdirectories, and so on, recursively.
				files: ['src/**/*'],
				tasks:['uglify', 'bower_concat', 'cssmin', 'copy', 'processhtml'],
				options: {
					livereload: true
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['connect','watch:client']);
	grunt.registerTask('dist', ['uglify', 'bower_concat', 'cssmin', 'copy', 'processhtml']);

};