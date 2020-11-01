let browserSync = require('browser-sync');
let gulp = require('gulp');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');
// let uglify = require('gulp-uglify');
var uglify = require('gulp-uglify-es').default
let concat = require('gulp-concat');
let imageMin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');


browserSync.init({
    proxy: "http://localhost:8080/"
});


gulp.task('browserSync', () => {
    browserSync({
        server: {
            // baseDir: "/"
        },
        options: {
            reloadDelay: 250
        },
        notify: false
    });
});


gulp.task('build-css', () => {
    gulp.src('assets/style/{,/**/*}*.{scss,sass}')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
            //outputStyle: 'nested'
        }))
        .pipe(sourcemaps.write())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', () => {
    gulp.src([
        'node_modules/bluebird/js/browser/bluebird.min.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/css-browser-selector/css_browser_selector_dev.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/locomotive-scroll/dist/locomotive-scroll.min.js',
        'assets/scripts/swiper-bundle.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'assets/scripts/gsap.min.js',
        'assets/scripts/SplitText.min.js',
        'assets/scripts/EasePack.min.js',
        'node_modules/jquery-inview/jquery.inview.js',
    ])
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(browserSync.reload({stream: true}));
        return gulp.src([
            'assets/scripts/main.js'
        ])
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('imageMin', () => {
    return gulp.src('assets/img/**/*/')
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant({quality: '50-100', speed: 5})]
        }))
        .pipe(gulp.dest('assets/images'))
});


gulp.task('watch', function () {
    gulp.watch('assets/style/**/*.scss', ['build-css']);
    gulp.watch(['assets/scripts/*.js'], ['scripts']);
    gulp.watch(['assets/img/*.*'], ['imageMin']);
});

// Create Gulp Default Task
gulp.task('default', ['browserSync', 'scripts', 'build-css', 'imageMin', 'watch']);
