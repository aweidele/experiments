const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// Define a task to compile Sass
gulp.task("sass", function () {
  return gulp
    .src("src/scss/**/*.scss") // Source folder containing the Sass files
    .pipe(sass().on("error", sass.logError)) // Compile Sass and log errors
    .pipe(gulp.dest("dist/css")); // Destination folder for compiled CSS
});

// Define a watch task
gulp.task("watch", function () {
  gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
});

// Default task
gulp.task("default", gulp.series("sass", "watch"));
