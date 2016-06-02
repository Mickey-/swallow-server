var koa = require('koa');
var router = require('koa-router')();
var appRouter = require('./router.js');
var config = require('./config/config');
var path = require('path');
var serve = require('koa-static');
var app = koa();

app.use(serve('./uploaded'));

app.use(function *(next){
  //config 注入中间件，方便调用配置信息
  if(!this.config){
    this.config = config;
  }
  yield next;
});

//log记录
var Logger = require('mini-logger');
var logger = Logger({
  dir: config.logDir,
  format: 'YYYY-MM-DD-[{category}][.log]'
});

//router use : this.logger.error(new Error(''))
app.context.logger = logger;

var onerror = require('koa-onerror');
onerror(app);

//xtemplate对koa的适配
var xtplApp = require('xtpl/lib/koa');
//xtemplate模板渲染
xtplApp(app,{
  //配置模板目录
  views: config.viewDir
});

//post body 解析
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());

/*//路由
app.use(router(app));
//应用路由
appRouter(app);*/

appRouter(router);
app
  .use(router.routes())
  .use(router.allowedMethods());
  
app.listen(config.port);
module.exports = app;
