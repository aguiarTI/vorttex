module.exports = function(grunt) {
    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        cacheBust: (new Date()).getTime(),
        dirs: {
            base      : "./",
            css       : {
                src   : "./css/less",
                dest  : "./css/"                
                },
            js        : {
                src   : "./js/src",
                dest  : "./js",
                temp  : "./js/src/_temp"

            },
            img       : "./img"
        },
        jshint: {
            options: {
                jshintrc: "<%= dirs.js.src %>/.jshintrc"
            },
            all: [
                "<%= dirs.js.src %>/*.js",
                "!<%= dirs.js.src %>/script.js"
            ]
        },
        concat: {
            options       : {
                separator : "\n\n"
            },
            common: {
                src       : [
                    "<%= dirs.js.src %>/plugins/swiper/3.3.1/swiper.min.js",
                    "<%= dirs.js.src %>/plugins/zepto/1.1.6/zepto.min.js",
                    "<%= dirs.js.src %>/app*.js"
                ],
                dest      : "<%= dirs.js.src %>/common.js"
            }
        },
        uglify: {
            options                 : {
                mangle              : {
                    except          : ["Swiper", "Zepto"]
                }
            },
            prod                    : {
                options             : {
                    banner          : "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */",
                    properties      : true,
                    preserveComments: false,
                    compress        : {
                        global_defs : {
                            "DEBUG" : false
                        },
                        dead_code   : true
                    }
                },
                files               : {
                    "<%= dirs.js.dest %>/common.min.js": ["<%= dirs.js.temp %>/common.log.js"],
                }
            },
        },
        removelogging: {
            dist: {
                files: {
                    "<%= dirs.js.temp %>/common.log.js": ["<%= dirs.js.src %>/common.js"],
                }
            },
        },
        less: {
            dev              : {
                options      : {
                    compress : false,
                    dumpLineNumbers: true,
                    mangle              : {
                        except          : ["Flexbox Grid"]
                    }
                },
                files        : {
                    "<%= dirs.css.src %>/common.css": "<%= dirs.css.src %>/common.less"
                }
            },
            prod             : {
                options      : {
                    compress : true
                },
                files        : {
                    "<%= dirs.css.dest %>/common.min.css": "<%= dirs.css.src %>/common.less"
                }
            },
        },
        csslint: {
            strict: {
                options: {
                    "important": false,
                    "adjoining-classes": false,
                    "known-properties": false,
                    "box-sizing": false,
                    "box-model": false,
                    "overqualified-elements": false,
                    "display-property-grouping": false,
                    "bulletproof-font-face": false,
                    "compatible-vendor-prefixes": false,
                    "regex-selectors": false,
                    "errors": true,
                    "duplicate-background-images": false,
                    "duplicate-properties": false,
                    "empty-rules": false,
                    "selector-max-approaching": false,
                    "gradients": false,
                    "fallback-colors": false,
                    "font-sizes": false,
                    "font-faces": false,
                    "floats": false,
                    "star-property-hack": false,
                    "outline-none": false,
                    "import": false,
                    "ids": false,
                    "underscore-property-hack": false,
                    "rules-count": false,
                    "qualified-headings": false,
                    "selector-max": false,
                    "shorthand": false,
                    "text-indent": false,
                    "unique-headings": false,
                    "universal-selector": false,
                    "unqualified-attributes": false,
                    "vendor-prefix": false,
                    "zero-units": false
                },
                src: ["<%= dirs.css.src %>/style.css"]
            }
        },
        sprite:{
            options       : {
                cssFormat : ".less"
            },
            common:{                
                src             : "<%= dirs.img %>/sprites/*.png",
                retinaSrcFilter : "<%= dirs.img %>/sprites/*-2x.png",
                dest            : "<%= dirs.img %>/sprite.png",
                retinaDest      : "<%= dirs.img %>/sprite@2x.png",
                destCss         : "<%= dirs.css.src %>/sprites.less",
                imgPath         : "../img/sprite.png",
                retinaImgPath   : "../img/sprite@2x.png",
                padding         : 5
            },
        },
        watch: {
            options: {
                livereload: true
            },
            less: {
                files: "<%= dirs.css.src %>/**/*.less",
                tasks: ["less:prod"],
                options: {
                    livereload: false
                }
            },
            css: {
                files: ["<%= dirs.css.dest %>/*.css"]
            },
            js: {
                files: [

                    "Gruntfile.js",
                    "<%= dirs.js.src %>/**/*.js",
                    "!<%= dirs.js.temp %>/*.js"
                ],
                tasks: ["concat","removelogging","uglify"]
            },
            sprite: {
                files: ["<%= dirs.img %>/sprites/*.png"],
                tasks: ["sprite"],
                options: {
                    livereload: false
                }
            },
        },
        browserSync: {
            common: {
                options: {
                    watchTask: true,
                    // proxy: "192.168.0.169"
                },
                bsFiles: {
                    injectChanges: false,
                    src : [
                        "<%= dirs.base %>/css/*.css",
                        "<%= dirs.base %>/js/script.js",
                        "<%= dirs.base %>/*.{html,txt,php}"
                    ]
                }
            },
        }
    });

    grunt.registerTask("build", ["sprite","less:prod","js"]);
    grunt.registerTask("w", ["build","watch"]);
    grunt.registerTask("css", ["less"]);
    grunt.registerTask("js", ["concat","removelogging","uglify"]);
    grunt.registerTask("default", ["build"]);
}
