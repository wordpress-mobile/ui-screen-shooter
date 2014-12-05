source ./settings.sh

export build_dir="$tmp_dir/screen_shooter"
export bundle_dir="$build_dir/app.app"
export trace_results_dir="$build_dir/traces"

function main {
  _setup
  _run_simulators
  _cleanup
}

function _setup {
  if [ ! -d $trace_results_dir/Run\ 1 ]; then
    mkdir -p $trace_results_dir/Run\ 1
  fi
}

function _run_simulators {
  for language in $languages; do
    for simulator in "${simulators[@]}"; do
      while [ `find $trace_results_dir/Run\ 1/ -maxdepth 1 -name '*.png' 2>>/dev/null | wc -l` -lt $shots_per_simulator ]; do
        sh ui-screen-shooter.sh $uiautomation_script $language "$simulator"
      done

      mkdir -p $screenshots_dir/$language
      mv $trace_results_dir/Run\ 1/*.png $screenshots_dir/$language
    done
  done
}

function _cleanup {
  rm -rf $build_dir
}

main