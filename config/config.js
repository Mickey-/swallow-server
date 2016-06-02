var path = require('path');
var local = require('./local');
var config = {
  "title":"",
  //默认生产环境
  "env":"production",
  "appName": "swallow-server",
  //端口号配置
  "port": 3000,
  //模板所在的目录
  "viewDir": path.join(__dirname,'..','view'),
  //log所在的目录
  "logDir": path.join(__dirname,'..', 'log'),
};

//当NODE_ENV环境变量值为local时
//本地调试环境
if(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'){
  config = Object.assign(config, local);
}

module.exports = config;
