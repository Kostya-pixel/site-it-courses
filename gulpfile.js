var gulp = require('gulp');
var sass = require('gulp-sass');
var brSync = require('browser-sync');
 //и что-то выведем в консоль для подтверждения

gulp.task('sass', () => 
    gulp.src('app/styles/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build'))
    .pipe(brSync.reload({ stream: true }))
);
gulp.task('html', () =>    
    gulp.src('app/**/*.html')
        .pipe(gulp.dest('./build'))                // перенос HTML в папку деплоя 
        .pipe(brSync.reload({ stream: true }))  // перезагрузка страницы 
);
gulp.task('js', () =>    
    gulp.src('app/**/*.js')
        .pipe(gulp.dest('./build'))                // перенос HTML в папку деплоя 
        .pipe(brSync.reload({ stream: true }))  // перезагрузка страницы 
);
gulp.task('brSync', () => 
    brSync.init({
        server: {
            baseDir: 'build' // здесь указываем корневую папку для локального сервера 
        }
           // уведомления (false - отключение уведомлений) 
    })
);
gulp.task('watch', gulp.parallel('brSync', function() {
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/*.js', gulp.parallel('js'));
    gulp.watch('app/styles/**/*.scss', gulp.parallel('sass'));
  }));

gulp.task('start', gulp.parallel( 'html', 'js', 'sass','watch'));


