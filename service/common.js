/**
 * Created by yangxun on 16/7/12.
 */
var formidable = require('formidable'),
    config = require('../config/config'),
    Tool = require('../common/tool'),
    fs = require('fs'),
    md5 = require('../common/md5.min');

/**
 * 上传文件
 * @param req
 * @returns {Promise}
 */
exports.uploadFile = function* (req){
    var form = new formidable.IncomingForm();
    form.uploadDir = config.qiniu.cache;
    form.hash = true;
    form.keepExtensions = true;

    return new Promise((resolve, reject)=>{
        form.parse(req, function(err, fields, files) {
            if(err){
                Tool.logger.error(err);
                resolve(Tool.prepareFailure({}, '文件上传失败'));
            }
            else{
                var path = files.file.path;
                var hash = md5(fs.readFileSync(path));
                resolve(Tool.prepareSuccess({
                    tempUrl: path.replace(process.cwd(), ''),
                    releaseUrl: Tool.buildRleaseUrl(hash + path.substring(path.lastIndexOf('.')))
                }));
                //reject(Tool.prepareSuccess(false));
            }
        });
    });
};

/**
 * 上传文件到七牛
 * @param files
 */
exports.publish = function* (files=[]){
    var promises = [];
    files.map(item=>{
        var key = Object.keys(item)[0];
        var path = item[key];
        var promise = Tool.uploadFile(path.substring(path.lastIndexOf('/')+1), key);
        promises.push(promise);
    });

    return Promise.all(promises).then(result=>{
        return Tool.prepareSuccess(true);
    }, err=>{
        return Tool.prepareFailure(false, '图片转移云存储失败');
    })
};