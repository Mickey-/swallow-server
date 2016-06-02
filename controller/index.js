module.exports = {
  index: function*(){
    yield this.render('index',{"title":"swallow"});
  },
  x: function*(){
    this.body = 'Hello Swallow!';
  },
  getToken: function*(){
    var qiniu = require("qiniu");
    qiniu.conf.ACCESS_KEY = 'xx';
    qiniu.conf.SECRET_KEY = 'oo';
    var bucket = 'fecdn';
    var key = 'test';

    function uptoken(bucket, key) {
      var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
      return putPolicy.token();
    }

    var token = uptoken(bucket, key);
    console.log(token)
    this.body = 'swallow qiniu token has generated!';

  },
  uploadImg: function*(){
    var parse = require('co-busboy');
    var fs = require('fs');
    var path = require('path');
    var os = require('os');

    // ignore non-POSTs
    if ('POST' != this.method) return yield next;

    // multipart upload
    var parts = parse(this);
    var part;

    while (part = yield parts) {
      console.log(part)
      if (!/image/.test(part.mimeType)) continue;
      var stream = fs.createWriteStream(path.resolve('./uploaded/' + part.filename));
      part.pipe(stream);
      console.log('uploading %s -> %s', part.filename, stream.path);
    }

    this.redirect('/');
  }
}
