set -e

ui_script="$1"
language="$2"
simulator="$3"

function main {
  if [ ! -d $build_dir/app.app ]; then
    _xcode clean build
  fi

  _clean_trace_results_dir
  _run_automation "$ui_script" "$language" "$simulator"
  _close_sim
}

function _xcode {
  if test -n "$(find $xcode_project_dir -maxdepth 1 -name '*.xcworkspace' -print -quit)"
  then
    base=$(basename $xcode_project_dir/*.xcworkspace .xcworkspace)
    # First build omits PRODUCT_NAME
    # Do NOT ask me why you need to build this twice for it to work
    # or how I became to know this fact
    xcodebuild -sdk "iphonesimulator7.1" \
      CONFIGURATION_BUILD_DIR="$build_dir/build" \
      -workspace $xcode_project_dir/$base.xcworkspace -scheme $base -configuration AdHoc \
      DSTROOT=$build_dir \
      OBJROOT=$build_dir \
      SYMROOT=$build_dir \
      ONLY_ACTIVE_ARCH=NO \
    "$@"
    xcodebuild -sdk "iphonesimulator7.1" \
      CONFIGURATION_BUILD_DIR="$build_dir/build" \
      PRODUCT_NAME=app \
      -workspace $xcode_project_dir/$base.xcworkspace -scheme $base -configuration AdHoc \
      DSTROOT=$build_dir \
      OBJROOT=$build_dir \
      SYMROOT=$build_dir \
      ONLY_ACTIVE_ARCH=NO \
    "$@"
    cp -r "$build_dir/build/app.app" "$build_dir"
  else
    xcodebuild -sdk "iphonesimulator7.1" \
      CONFIGURATION_BUILD_DIR=$build_dir \
      PRODUCT_NAME=app \
      -workspace $xcode_project_dir/$base.xcworkspace -scheme $base \
    "$@"
  fi
}

function _clean_trace_results_dir {
  rm -rf "$trace_results_dir"
  mkdir -p "$trace_results_dir"
}

function _run_automation {
  automation_script="$1"
  language="$2"
  simulator="$3"

  echo "Running automation script \"$automation_script\"
          for \"$simulator\"
          in language \"${language}\"..."

  dev_tools_dir=`xcode-select -print-path`
  tracetemplate="$dev_tools_dir/../Applications/Instruments.app/Contents/PlugIns/AutomationInstrument.bundle/Contents/Resources/Automation.tracetemplate"

  # Check out the `unix_instruments.sh` script to see why we need this wrapper.
  DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
  "$DIR"/unix_instruments.sh \
    -w "$simulator" \
    -D "$trace_results_dir/trace" \
    -t "$tracetemplate" \
    $bundle_dir \
    -e UIARESULTSPATH "$trace_results_dir" \
    -e UIASCRIPT "$automation_script" \
    -AppleLanguages "($language)" \
    -AppleLocale "$language" \
    "$@"

  find $trace_results_dir/Run\ 1/ -name *landscape*png -type f -exec sips -r -90 \{\} \;
}

function _close_sim {
  osascript -e "tell application \"iPhone Simulator\" to quit"
}

main

