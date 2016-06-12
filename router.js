var controller = require('./controller');

module.exports = function(router) {
  router.get('/', controller.index);
  router.get('/login', controller.login);
  router.post('/login', controller.doLogin);
  router.get('/gettoken', controller.getToken)
  router.post('/uploadImg', controller.uploadImg);
}
