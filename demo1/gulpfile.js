var gulp = require('gulp'),
    fs = require('fs'),
    yaml = require('yamljs'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    concat = require('gulp-concat');

var srcDir = './src/';  // 源目录
var distDir = './dist';     // 生成目录

function loadYAMLFile (file) {
  return yaml.parse(fs.readFileSync(file).toString());
}

// 模块渲染html
gulp.task('bulid', function(){
    var config = loadYAMLFile('./_config.yml');
    for(var i in config){
        config[i].less.unshift(srcDir+'b_color.less');
        console.log(config[i].less);
        gulp.src(config[i].less)
            .pipe(concat(config[i].css+'.less'))
            .pipe(less())
            .pipe(cssmin())
            .pipe(gulp.dest(distDir));
    }   
});

