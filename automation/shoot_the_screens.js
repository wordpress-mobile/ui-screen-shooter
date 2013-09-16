// Copyright (c) 2012 Jonathan Penn (http://cocoamanifest.net/)

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


// Pull in the special function, captureLocalizedScreenshot(), that names files
// according to device, language, and orientation
#import "capture.js"

// Now, we simply drive the application! For more information, check out my
// resources on UI Automation at http://cocoamanifest.net/features
var target = UIATarget.localTarget();
var app = target.frontMostApp();
var win = app.mainWindow();
var model = target.model();

var username = "theultimatecatblog";
var password = "xxxxxxxxxxxxxxxxxx";

UIALogger.logStart("screenshots");

captureLocalizedScreenshot("1-nux");

target.frontMostApp().mainWindow().scrollViews()[0].buttons()[3].tap();
target.frontMostApp().keyboard().typeString(username);
target.frontMostApp().keyboard().typeString("\n");
target.frontMostApp().keyboard().typeString(password);
target.frontMostApp().keyboard().typeString("\n");
target.frontMostApp().keyboard().typeString("\n");

// Wait for login
target.delay(6);

// Dismiss post-NUX
target.tap({x:140.50, y:353.00});
target.tap({x:140.50, y:353.00});
target.delay(4);
target.frontMostApp().mainWindow().tableViews()[1].cells()[7].tap();
target.delay(2);

captureLocalizedScreenshot("5-editor");

target.frontMostApp().navigationBar().leftButton().tap();
target.frontMostApp().navigationBar().buttons()[0].tap();
// Load reader
target.frontMostApp().mainWindow().tableViews()[0].cells()[0].tap();
target.delay(4);
// Dismiss friend finder
if (model.match(/iPhone/)) {
    target.frontMostApp().mainWindow().buttons()[1].tap();
}
target.frontMostApp().mainWindow().tableViews()[1].cells()[2].scrollToVisible();
target.delay(3);

captureLocalizedScreenshot("2-reader");

target.frontMostApp().navigationBar().buttons()[0].tap();
target.frontMostApp().mainWindow().tableViews()[0].groups()["Ultimate Cat Blog"].tapWithOptions({tapOffset:{x:0.32, y:0.48}});
target.delay(2);

captureLocalizedScreenshot("3-sidebar");

target.frontMostApp().mainWindow().tableViews()[0].cells()[2].tapWithOptions({tapOffset:{x:0.76, y:0.64}});
target.delay(1);
// Select photo
if (model.match(/iPhone/)) {
    target.frontMostApp().mainWindow().tableViews()[0].cells()[0].tap();
    target.frontMostApp().mainWindow().collectionViews()[0].cells()[0].tap();    
} else {
    target.frontMostApp().mainWindow().popover().tableViews()[0].cells()[0].tap();
    target.frontMostApp().mainWindow().popover().collectionViews()[0].cells()[0].tap();    
}
// Type caption
target.frontMostApp().mainWindow().textViews()[0].tap();
target.frontMostApp().keyboard().typeString("Really cute cat toy!");

captureLocalizedScreenshot("4-quickphoto");

target.frontMostApp().navigationBar().leftButton().tap();

if (model.match(/iPhone/)) {
    target.frontMostApp().navigationBar().buttons()[0].tap();
    target.delay(1);
    target.frontMostApp().mainWindow().tableViews()[0].cells()[0].tap();
    target.frontMostApp().navigationBar().buttons()[0].tap();
    target.frontMostApp().mainWindow().tableViews()[0].cells()[2].tap();
    // Settings View Controller
    target.frontMostApp().mainWindow().tableViews()[0].cells()[3].tap();
    target.frontMostApp().actionSheet().buttons()[0].tap();
    target.delay(1);
}

UIALogger.logPass("screenshots");

//*/

