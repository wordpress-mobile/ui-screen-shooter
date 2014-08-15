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

// captureLocalizedScreenshot(name)
//
// Tells the local target to take a screen shot and names the file after the
// state of the simulator like so:
//
//   [model]___[orientation]___[name].png
//
// `model` is the model of the device (iphone, iphone5, ipad)
// `orientation` is...well...duh!
// `name` is what you passed in to the function
//
// Screenshots are saved along with the trace results in UI Automation. See
// `run_screenshooter.sh` for examples on how to pull those images out and put
// them wherever you want.
//
function captureLocalizedScreenshot(name) {
  var target = UIATarget.localTarget();
  var model = target.model();
  var rect = target.rect();

  var orientation = "portrait";
  if (rect.size.height < rect.size.width) orientation = "landscape";

  if (model.match(/iPhone/)) {
    if ((orientation == "portrait" && rect.size.height > 480) || (orientation == "landscape" && rect.size.width > 480)) {
      model = "iOS-4-in";
    } else {
      model = "iOS-3.5-in";
    }
  } else {
    model = "iOS-iPad";
  }

  var parts = [model, orientation, name];
  target.captureScreenWithName(parts.join("___"));
}

