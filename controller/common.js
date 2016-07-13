/**
 * Created by yangxun on 16/7/12.
 */
var common = require('../service/common');

/**
 * 上传文件
 */
exports.uploadFile = function* (){
    // parse a file upload
    this.body = yield common.uploadFile(this.req);
};