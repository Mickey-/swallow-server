var controller = require('./controller'),
    poster = require('./controller/poster');

module.exports = function(router) {
    router.get('/', controller.index);
    router.get('/login', controller.login);
    router.post('/login', controller.doLogin);
    router.get('/gettoken', controller.getToken);
    router.post('/uploadImg', controller.uploadImg);


    router.get('/poster/check', poster.check);      //检查是否存在相同的path海报
    router.post('/poster', poster.save);            //保存海报信息
    router.get('/poster', poster.find);             //查询海报信息
    router.get('/poster/me', poster.findOwnerPoster);//查询我的海报信息
    router.get('/poster/detail', poster.detail);    //获取海报详情
    router.post('/poster/publish', poster.publish); //发布海报
    router.put('/poster', poster.update);           //更新海报信息
    router.delete('/poster', poster.del);           //删除海报信息

    /*
    * 用户相关
    * 1.单点登录
    * */
};
