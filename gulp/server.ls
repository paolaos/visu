require!{
  gulp
  \browser-sync
}

function browserSyncInit(baseDir, files)
  browserSync.instance = browserSync.init(files,
    startPath: "/"
    server:
      baseDir: baseDir
    browser: "default"
  )

gulp.task \serve, <[watch]>, ->
  browserSyncInit(<[app .tmp]>, [
    "app/*.html"
    ".tmp/*.html"
    ".tmp/styles/**/*.css"
    "app/scripts/**/*.js"
    ".tmp/scripts/**/*.js"
    "app/partials/**/*.html"
    ".tmp/partials/**/*.html"
    ".tmp/partials/**/*.js"
    "app/images/**/*"
  ])

gulp.task("serve:dist", -> browserSync.init(server: { baseDir: "dist"}))
