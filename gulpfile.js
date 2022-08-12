const { stream } = require('browser-sync');
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const svgSprite = require('gulp-svg-sprite');
const webp = require('gulp-webp');



gulp.task('sass', function () {
    return gulp.src('./app/scss/style.scss')
        // Сжимаю и перевожу на css
        .pipe(sass({ outputStyle: 'compressed' }))
        // переименовываю 
        .pipe(rename({ suffix: '.min' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('sassMedia', function () {
    return gulp.src('./app/scss/media.scss')
        // Сжимаю и перевожу на css
        .pipe(sass({ outputStyle: 'compressed' }))
        // переименовываю 
        .pipe(rename({ suffix: '.min' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('js', function () {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

// Конкатинация сторонних библиотек как на js так и на css

gulp.task('style', function () {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/normalize.css/normalize.css',
        'node_modules/magnific-popup/dist/magnific-popup.css',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.css'
    ])

        .pipe(concat('libs.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('app/css'))
});

gulp.task('script', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
        'node_modules/jquery-validation/dist/jquery.validate.js',
        'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
    ])

        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

// svg спрайты
gulp.task('svgsprite', function () {

    // return gulp.src('app/images/timeless_svg/*.svg') // svg files for sprite
    //     .pipe(svgSprite({
    //         shape: {
    //             dimension: {
    //                 maxWidth: 500,
    //                 maxHeight: 500
    //             },
    //             spacing: {
    //                 padding: 0
    //             },
    //             transform: [{
    //                 "svgo": {
    //                     "plugins": [
    //                         // { removeViewBox: false },
    //                         // { removeUnusedNS: false },
    //                         // { removeUselessStrokeAndFill: true },
    //                         // { cleanupIDs: false },
    //                         // { removeComments: true },
    //                         // { removeEmptyAttrs: true },
    //                         // { removeEmptyText: true },
    //                         // { collapseGroups: true },
    //                         { removeAttrs: { attrs: '(fill|stroke|style)' } }
    //                     ]
    //                 }
    //             }]
    //         },
    //         mode: {
    //             stack: {
    //                 sprite: "../sprite.svg"  //sprite file name
    //             }
    //         },
    //     }
    //     ))
    //     .pipe(gulp.dest('app/images/svg_sprite'));


    // let config = {
    //     shape: {
    //         dimension: {
    //             maxWidth: 500,
    //             maxHeight: 500
    //         },
    //         spacing: {
    //             padding: 0
    //         },
    //         transform: [{
    //             "svgo": {
    //                 "plugins": [
    //                     { removeViewBox: false },
    //                     { removeUnusedNS: false },
    //                     { removeUselessStrokeAndFill: true },
    //                     { cleanupIDs: false },
    //                     { removeComments: true },
    //                     { removeEmptyAttrs: true },
    //                     { removeEmptyText: true },
    //                     { collapseGroups: true },
    //                     { removeAttrs: { attrs: '(fill|stroke|style)' } }
    //                 ]
    //             }
    //         }]
    //     },
    //     mode: {
    //         symbol: {
    //             dest: '.',
    //             sprite: 'sprite.svg'
    //         }
    //     }
    // };

    // return gulp.src("app/images/timeless_svg/*.svg")
    //     .pipe(svgSprite(config)).on('error', function (error) { console.log(error); })
    //     .pipe(gulp.dest("app/images/svg_sprite"));
})

// exports.svgsprite = svgsprite;

// конвертация в webP 
gulp.task('webp', () =>
    gulp.src('app/images/timeless_image/**')
        .pipe(webp())
        .pipe(gulp.dest('app/images/webp_image'))
);


gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/scss/media.scss', gulp.parallel('sassMedia'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('js'));
    gulp.watch('app/images/timeless_image/**', gulp.parallel('webp'));
    gulp.watch('app/images/timeless_svg/**', gulp.parallel('svgsprite'));
});


// Устанавливаю по дефолту имя, теперь обращаться можно просто по gulp и запускаю сразу несколько процессов
gulp.task('default', gulp.parallel('sass', 'sassMedia', 'watch', 'browser-sync', 'script', 'style', 'svgsprite', 'webp'))
