const gulp = require("gulp");;

gulp.task("tslint", () => {
    const tslint = require("gulp-tslint");

    return gulp
        .src("src/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task("tsc", () => {
    const merge = require("merge2");
    const sourcemaps = require("gulp-sourcemaps");
    const ts = require("gulp-typescript");

    const project = ts.createProject("tsconfig.json");
    const output = project
        .src()
        .pipe(sourcemaps.init())
        .pipe(project());

    return merge([
        output.dts.pipe(gulp.dest("lib")),
        output.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("lib"))
    ]);
});

gulp.task("test", () => {
    const mocha = require("gulp-mocha")

    return gulp
        .src("test/**/*.js")
        .pipe(mocha({
            reporter: "spec"
        }));
});

gulp.task("watch", ["default"], () => {
    gulp.watch("src/**/*.ts", ["default"]);
});

gulp.task("default", callback => {
    const runSequence = require("run-sequence");

    runSequence(
        ["tslint", "tsc"],
        ["test"],
        callback);
});
