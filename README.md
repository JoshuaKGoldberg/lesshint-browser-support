# gulp-typespace

Typespace plugin for Gulp.

## Usage

All parameters supported by Typespace can be passed as a settings object.

Required arguments/flags:

* `namespace` - name of the root namespace

Optional arguments/flags:

* `config` - input tsconfig.json file path to load files from
* `files` - paths of files to include
* `outFile` - output .ts file path
* `pathPrefix` - directory root to ignore from module paths
* `root` - root path to search for files under

```javascript
const typespace = require("gulp-typespace");

gulp.task("typespace", () => {
    const settings = {
        config: "./tsconfig.json",
        namespace: "MyProject",
        pathPrefix: "src/",
        root: "."
    };

    typespace(settings)
        .pipe(gulp.dest("dist"));
});
```

You can also pass a callback to be executed instead of creating a stream.
It will receive the generated text as a string.

```javascript
const typespace = require("gulp-typespace");

gulp.task("typespace", () => {
    const settings = {
        config: "./tsconfig.json",
        rootNamespace: "MyProject",
        root: "."
    };

    typespace(settings, text => console.log(text));
});
```
