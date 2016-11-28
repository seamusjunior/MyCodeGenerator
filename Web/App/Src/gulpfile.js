				var gulp = require("gulp");
var templateCache = require("gulp-angular-templatecache");
var webpack = require("gulp-webpack");
var open = require('gulp-open');
var protractor = require("gulp-protractor").protractor;
var shell = require("gulp-shell");
var jasmineBrowser = require('gulp-jasmine-browser');
var watch = require("gulp-watch");

gulp.task("webdriver", function () {
    shell.task([
        "webdriver-manager start"]);
});



gulp.task("default", ["build", "html-templates", "watch-templates"]);


gulp.task("build", function() {
    return gulp.src("entry.js")
        .pipe(webpack( require("./webpack.config.js") ))
        .pipe(gulp.dest("./dist"));
});




var config = {
    srcTemplates:[
        'Features/**/**/**/**/*.html'
    ],
    base: function(file) {
        return  file.path.replace(/^.*(\\|\/|\:)/, '');   
    },
    destPartials: './dist/',
    module: "contacts"
};


//////////////////////////////////////////////
///////////   Templates   //////////////
///////////////////////////////////////////
gulp.task("watch-templates", function() {
    gulp.watch('src/**/*.html', ['html-templates']);
});

gulp.task('html-templates', function() {
    return gulp.src(config.srcTemplates)
        .pipe(templateCache('templateCache.js', config))
        .pipe(gulp.dest(config.destPartials));
});



//////////////////////////////////////////////
///////////   Protractor   //////////////
///////////////////////////////////////////
gulp.task("all", ["e2e", "open"]);

    

gulp.task("e2e", function() {

    gulp.src(["app/Tests/testClients.js"])
        .pipe(protractor({
            "configFile": "Tests/conf.js",
        }));

});

gulp.task('protractor-run', function (done) {
    var argv = process.argv.slice(3); // forward args to protractor
    child_process.spawn(getProtractorBinary('protractor'), argv, {
        stdio: 'inherit'
    }).once('close', done);
});
function getProtractorBinary(binaryName){
    var winExt = /^win/.test(process.platform)? '.cmd' : '';
    var pkgPath = require.resolve('protractor');
    var protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));
    return path.join(protractorDir, '/'+binaryName+winExt);
}

		
		
			

		
		
			