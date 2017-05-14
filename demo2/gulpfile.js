var gulp = require('gulp'),
	fs = require('fs'),
	yaml = require('yamljs'),
    gutil = require('gulp-util'),
	browserSync = require('browser-sync'),
	ejs= require('gulp-ejs');

var srcDir = './src';  // 源目录
var distDir = './dist';     // 生成目录

function loadYAMLFile (file) {
  return yaml.parse(fs.readFileSync(file).toString());
}

// 模块渲染html
gulp.task('bulidHtml', function(){
	var config = loadYAMLFile('./_config.yml');
	gulp.src(srcDir + '/templates/*.html')
        .pipe(ejs(config).on('error', function(err) {
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest(distDir)); 
});

//压缩图片 (未压缩)
gulp.task('bulidImg', function () {
    gulp.src([srcDir + '/images/*.png',srcDir + '/images/*.jpg']) 
        .pipe(gulp.dest(distDir + '/images'));
});

gulp.task('bulid', ['bulidHtml','bulidImg'], browserSync.reload);

// 开发服务
gulp.task('dev', function() {
    browserSync.init({
        server: {
            baseDir: distDir
        },
        reloadDebounce: 0
    });
    // 无论是数据文件更改还是模版更改都会触发页面自动重载
    gulp.watch([srcDir + '/**/*.*','./_config.yml'], ['bulid']);

});