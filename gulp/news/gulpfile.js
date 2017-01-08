//引入gulp模块
var gulp = require('gulp');
console.log(gulp);
//压缩的js的代码块
var uglify = require('gulp-uglify');
//合并代码块
var concat = require('gulp-concat');
//重命名的代码块
var rename = require('gulp-rename');
//压缩css模块
var minifycss = require('gulp-minify-css');
//压缩html
var minifyhtml = require('gulp-minify-html');
//压缩图片
var imagemin = require('gulp-imagemin');
//var minifyimg=require('gulp-minify-image');

//引入gulp任务
gulp.task('minify', function() {
	//引入需要压缩的文件
	//gulp.src('js/base.js')
	//压缩js
	//.pipe(uglify())
	//导出压缩好的js放入某个文件
	//.pipe(gulp.dest('dist/js'));

	gulp.src(['js/base.js', 'js/controller/controller.js', 'js/service/service.js', 'js/directive/directive.js'])
		//把js合并成main.js
		.pipe(concat('frame.js'))
		//修改后缀名
		.pipe(rename({
			suffix: ".niubi",
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

//压缩css
gulp.task('minifycss', function() {
	//压缩css文件夹里面的全部的css
	gulp.src('css/*.css')
		.pipe(concat('total.css'))
		.pipe(minifycss())
		//导出
		.pipe(gulp.dest('dist/css'))

})

//压缩html
gulp.task('minifyhtml', function() {
	gulp.src('directive/*.html')
		.pipe(concat('directive.all.html'))
		//压缩
		.pipe(minifyhtml())
		//导出
		.pipe(gulp.dest('dist/directive'))

	gulp.src('template/*.html')
		.pipe(concat('template.all.html'))
		.pipe(minifyhtml())
		.pipe(gulp.dest('dist/template'))
})

//压缩图片
gulp.task('imagemin', function() {
		gulp.src('image/*+(jpg|png|jpeg)')
			.pipe(imagemin({
				optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
				progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
				interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
				multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
			}))
			.pipe(gulp.dest('dist/img'));
	})
	//监听改动的js并执行压缩任务
	//gulp.watch(['js/base.js','js/cotroller/controller.js','js/directive/directive.js','js/service/service.js'],['minify'])
gulp.task('default', ['minify', 'minifycss', 'minifyhtml', 'imagemin']);