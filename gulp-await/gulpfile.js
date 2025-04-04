const { src, dest, watch, series, parallel } = require("gulp");
const options = require("./config");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
var twig = require("gulp-twig");

async function getContent() {
  try {
    const response = await fetch("https://angrychickens.com/portal_api/");
    if (!response.ok) {
      throw new Error("Error");
    } else {
      const resData = await response.json();
      return resData.response;
    }
  } catch (error) {
    throw new Error("Error");
  }
}

/** Browser Sync */
function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: options.paths.dist.base,
    },
    port: 1225,
  });
  done();
}

function previewReload(done) {
  console.log("\n\t" + "Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

function watchFiles() {
  watch(`${options.paths.src.base}/**/*.twig`, series(devTwig, previewReload));
}

/** Dev Tasks */
function devClean() {
  console.log("\n\t" + "Cleaning dist folder for fresh start.\n");
  return src(options.paths.dist.base, { read: false, allowEmpty: true }).pipe(clean());
}

function devTwig(done) {
  console.log("\n\t" + "Compiling HTML.\n");
  fetch("https://angrychickens.com/portal_api/")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); // Handle errors
      }
      return response.json();
    })
    .then((content) => {
      return src([`${options.paths.src.base}/**/*.twig`, `!${options.paths.src.base}/twig/templates/**/*.twig`])
        .pipe(twig({ data: content }))
        .pipe(dest(options.paths.dist.base));
    })
    .catch((error) => console.error({ error: error.message }));
  done();
}

/** Production Tasks */
function prodClean() {
  console.log("\n\t" + "Cleaning build folder for fresh start.\n");
  return src(options.paths.docroot.base, { read: false, allowEmpty: true }).pipe(clean());
}

function prodTwig() {
  console.log("\n\t" + "Compiling HTML.\n");
  return src([`${options.paths.src.base}/**/*.twig`, `!${options.paths.src.base}/twig/templates/**/*.twig`])
    .pipe(twig())
    .pipe(dest(options.paths.docroot.base));
}

function buildFinish(done) {
  console.log("\n\t" + `Production build is complete. Files are located at ${options.paths.docroot.base}\n`);
  done();
}

exports.prod = series(
  prodClean, // Clean Build Folder
  parallel(prodTwig),
  // parallel(prodStyles, prodScripts, prodImages, prodHTML, prodFonts, prodThirdParty), //Run All tasks in parallel
  buildFinish
);

exports.default = series(devClean, parallel(devTwig), livePreview, watchFiles);
