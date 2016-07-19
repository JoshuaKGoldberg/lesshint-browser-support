const gulp = require("gulp");
const mocha = require("gulp-mocha");
const runSequence = require("run-sequence");
const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");

gulp.task("tslint", () => {
    return gulp
        .src("src/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task("tsc", () => {
    const tsProject = ts.createProject("tsconfig.json");

    return tsProject
        .src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("lib"));
});

gulp.task("test", () => {
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
    runSequence(
        ["tslint", "tsc"],
        ["test"],
        callback);
});
