const {src, dest, task, series, watch, parallel} = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {DIST_PATH, SRC_PATH, DOCS_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');

task('clean', () => {
    return src([`${DIST_PATH}/*`, `${DOCS_PATH}/*`], {read: false}).pipe(clean());
});

task("copy:html", () => {
    return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(dest(DOCS_PATH))
    .pipe(reload({stream: true}));
});

task('styles', () => {
    return  src([...STYLES_LIBS, `${SRC_PATH}/styles/main.scss`])
    .pipe(gulpif(env == 'dev', sourcemaps.init()))
    .pipe(concat("main.min.scss"))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env == 'dev', 
        autoprefixer({
            browsers: ['last 2 version'],
            cascade: false
        })
    )) 
    // .pipe(gulpif(env == 'prod', gcmq()))      //сбивает ссылку на шрифты после точки с запятой на следующий ряд
    .pipe(gulpif(env == 'prod', cleanCSS()))
    .pipe(gulpif(env == 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(dest(DOCS_PATH))
    .pipe(reload({stream: true}));
});

task('scripts', () => {
    return src([...JS_LIBS, `${SRC_PATH}/scripts/*.js`])
    .pipe(gulpif(env == 'dev', sourcemaps.init()))
    .pipe(concat("main.min.js", {newLine: ";"}))
    // .pipe(gulpif(env == 'dev', babel({
    //     presets: ['@babel/env']      //Unexpected reserved word 'let'
    // })))
    .pipe(gulpif(env == 'prod', uglify()))
    .pipe(gulpif(env == 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(dest(DOCS_PATH))
    .pipe(reload({stream: true}));
})

task('icons', () => {
    return src(`${SRC_PATH}/images/**/*`)
    // .pipe(svgo({     
    //     plugins: [
    //         {
    //             removeAttrs: {
    //                 attrs: "(fill|stroke|style|width|height|data.*"
    //             }
    //         }
    //     ]
    // }))
    // .pipe(swgSprite({
    //     mode: {
    //         symbol: {
    //             sprite: "../sprite.swg"
    //         }
    //     }
    // }))
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(dest(`${DOCS_PATH}/img`));
})

// task('images', () => {
//     return src(`${SRC_PATH}/images/*`)
//     .pipe(dest(`${DIST_PATH}/images`));
// });

task('server', () => {
    browserSync.init({
        server: {
            baseDir: DIST_PATH
        },
        open: false
    });
});

task('watch', () => {
    watch('./src/styles/**/*.scss', series('styles'));
    watch('./src/*.html', series('copy:html'));
    watch('./src/scripts/*.js', series('scripts'));
    watch('./src/images/icons/*.svg', series('icons'));
})

task("default", series("clean", parallel("copy:html", "styles", "scripts", "icons"), parallel("watch", "server")));

task("build", series("clean", parallel("copy:html", "styles", "scripts", "icons")));