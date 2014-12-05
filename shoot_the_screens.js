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

var loggedIn = function() {
  for (var i=0; i<win.elements().length; i++) {
    if (win.elements()[i].name() == "My Surveys") { 
      return true;
    }
  }

  return false;
}

var username = "enter-user-name-here";
var password = "enter-password-here";

// wait for app to load
sleep(5);

UIALogger.logStart("screenshots");

// TODO: Implement code to log user out.

win.textFields()[0].tap(); sleep(1);
//type(username);
win.textFields()[0].setValue(username);
type("\n");
type(password);
//win.textFields()[1].setValue(password);
win.buttons()[0].tap();
sleep(5); // Wait to login

// Wait for login to complete
while (!loggedIn()) { sleep(1); }
UIALogger.logMessage("Logged In!");
sleep(5);
captureLocalizedScreenshot("1-select-surveys");

// Select the Surveys
win.tableViews()[0].cells()[0].tap();
win.tableViews()[0].cells()[1].tap();
win.tableViews()[0].cells()[2].tap();

// Press Save Selection Button
for (var i=0; i < win.buttons().length; i++) {
  if (win.buttons()[i].name() == "Save Selections") {
    UIALogger.logMessage("Saving Selections");
    win.buttons()[i].tap();
    break;
  }
}
sleep(5);
captureLocalizedScreenshot("2-survey-responses");

// Load first survey
win.tableViews()[1].cells()[0].tap();
sleep(5);
captureLocalizedScreenshot("3-survey-intro");

// Press Save Selection Button
for (var i=0; i < win.buttons().length; i++) {
  if (win.buttons()[i].name() == "Start Survey »") {
    win.buttons()[i].tap();
  }
}
sleep(5);
captureLocalizedScreenshot("4-survey-question-page");

UIALogger.logMessage("Finished screenshots");
