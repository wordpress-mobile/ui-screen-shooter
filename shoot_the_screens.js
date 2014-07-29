#import "capture.js"

var target = UIATarget.localTarget();
var app = target.frontMostApp();
var win = app.mainWindow();
var model = target.model();

UIALogger.logStart("screenshots");

target.delay(5);
captureLocalizedScreenshot("1-applaunched");

UIALogger.logPass("screenshots");
