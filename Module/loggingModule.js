require('dotenv').config();
const path = "./logs/";
const applicationName = process.env.APPNAME || "APPNAME";
const combinedLogName = "combined";
const errorLogName = "error";

const bunyan = require('bunyan');
var fileStream = require('bunyan-rotating-file-stream');
var fs = require('fs');

if (!fs.existsSync(path)){
    fs.mkdirSync(path);
}

var log = bunyan.createLogger({
  name: applicationName,
  streams: [
    {
      level: 0,
      stream: process.stdout            // log INFO and above to stdout
    },
    {type:'raw',
    stream: new fileStream({
      path: path+applicationName+'.%d-%b-%y.'+combinedLogName+'.log',
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
      path: path+applicationName+'.%d-%b-%y.'+errorLogName+'.log',
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

