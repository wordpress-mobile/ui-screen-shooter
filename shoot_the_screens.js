#import "capture.js"

var target = UIATarget.localTarget();
var app = target.frontMostApp();
var win = app.mainWindow();
var model = target.model();

var type = function(text) {
    app.keyboard().typeString(text);
}
var sleep = function(duration) {
    target.delay(duration);
}

var username = "theultimatecatblog";
var password = "xxxxxxxxxxxxxxxxxx";

// wait for app to load
sleep(5);

UIALogger.logStart("screenshots");

// logout if needed
if ( app.tabBar().checkIsValid() ) {
    app.tabBar().buttons()[2].tap(); sleep(1);

    // need two taps of the back button if there is only one blog added to the app
    while ( ! win.navigationBar().rightButton().checkIsValid() ) {
        app.navigationBar().leftButton().tap(); sleep(1);
    }

    app.navigationBar().rightButton().tap(); sleep(2);

    if (model.match(/iPhone/)) {
        win.tableViews()[0].cells()[1].tap();
        app.actionSheet().buttons()[0].tap();
    } else {
        target.frontMostApp().mainWindow().tableViews()[1].cells()[1].tap();
        target.frontMostApp().mainWindow().popover().actionSheet().buttons()[1].tap();
    }
}

// take screenshot of login
sleep(5);
captureLocalizedScreenshot("1-login");

win.textFields()[0].tap(); sleep(1);
type(username);
type("\n");
type(password);
win.buttons()[1].tap();

// Wait for login to complete
// load reader
while ( !app.tabBar().checkIsValid() ) { sleep(1); }
app.tabBar().buttons()[0].tap(); sleep(1);
app.navigationBar().tapWithOptions({tapOffset:{x:0.95, y:0.55}}); sleep(1);
win.scrollViews()[0].tableViews()[0].cells()[0].tap();

// wait for reader to load content and take screenshot
sleep(10);
captureLocalizedScreenshot("2-reader");

// load notifications
app.tabBar().buttons()[1].tap();

// wait for notifications to load and then take screenshot
sleep(5);
captureLocalizedScreenshot("3-notifications");

// load blog details
app.tabBar().buttons()[2].tap(); sleep(1);
// this is needed if there is more than one blog
if ( win.tableViews()[0].visibleCells()[0].name() == 'Ultimate Cat Blog' ) {
    win.tableViews()[0].visibleCells()[0].tap(); sleep(1);
}

// take screenshot for blog details
captureLocalizedScreenshot("4-blogdetails");

// load comments
win.tableViews()[0].cells()[2].tap(); sleep(1);

// wait for comments to load and then take screenshot
sleep(5);
captureLocalizedScreenshot("5-comments");

// load post editor
app.navigationBar().leftButton().tap(); sleep(1);
win.tableViews()[0].cells()[0].tap(); sleep(1);
win.tableViews()[0].cells()[1].tap(); sleep(1);

// take screenshot for post editor
captureLocalizedScreenshot("6-posteditor");

app.navigationBar().leftButton().tap(); sleep(1);
app.navigationBar().leftButton().tap(); sleep(1);
win.tableViews()[0].cells()[3].tap(); sleep(1);

// wait for stats to load and then take screenshot
sleep(5);
captureLocalizedScreenshot("7-stats");

UIALogger.logPass("screenshots");
