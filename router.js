var controller = require('./controller');

module.exports = function(router) {
  router.get('/', controller.index);
  router.get('/x', controller.x);
  router.get('/gettoken', controller.getToken)
  router.post('/uploadImg', controller.uploadImg);
}
