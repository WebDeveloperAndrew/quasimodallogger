# quasimodallogger

A simple module for the logging purposes of quasimodal

### Installing

Install the package using the following command:
```
npm i quasimodallogger
```

### Sample Code

The logger will output to stdout as well as 2 files a combined logging file and an error logging file.
```
const log = require("quasimodallogger");

log.info("test");
log.error("ERROR");
```

### Enviornment variables

There are two enviornment variables that can be changed.

```
APPNAME - Changes the name of the app in the logs and changes the log filenames.
LOG_PATH - Changes the path of the log files.
```

## Built With

* [bunyan](https://github.com/trentm/node-bunyan) - Logging
* [bunyan-rotating-file-stream](https://www.npmjs.com/package/bunyan-rotating-file-stream) - File management

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details