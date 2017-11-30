const targetDir = process.env.LOG_PATH || "./logs/";
const applicationName = process.env.APPNAME || "APPNAME";
const combinedLogName = "combined";
const errorLogName = "error";

const bunyan = require('bunyan');
var fileStream = require('bunyan-rotating-file-stream');

const fs = require('fs');
const path = require('path');
const sep = path.sep;
const initDir = path.isAbsolute(targetDir) ? sep : '';
targetDir.split(sep).reduce((parentDir, childDir) => {
  const curDir = path.resolve(parentDir, childDir);
  try {
    fs.mkdirSync(curDir);
  } catch (err) {
    if (err.code !== 'EEXIST') { 
      throw err;
    }
    return curDir;
  }
  return curDir;
}, initDir);


var log = bunyan.createLogger({
  name: applicationName,
  streams: [
    {
      level: 0,
      stream: process.stdout            // log INFO and above to stdout
    },
    {type:'raw',
    stream: new fileStream({
      path: targetDir+applicationName+'.%d-%b-%y.'+combinedLogName+'.log',
      period: '1d',
      totalFiles: 10,
      rotateExisting: true,
      threshold: '10m',
      totalSize: '20m',
      gzip: false
    })
    },
    {level: "ERROR",
    stream: new fileStream({
      path: targetDir+applicationName+'.%d-%b-%y.'+errorLogName+'.log',
      period: '1d',
      totalFiles: 10,
      rotateExisting: true,
      threshold: '10m',
      totalSize: '20m',
      gzip: false
    })
    }
  ]
});
module.exports = log;

