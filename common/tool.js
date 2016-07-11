/**
 * Created by yangxun on 16/7/8.
 */
//log记录
var Logger = require('mini-logger');
var logger = Logger({
    dir: config.logDir,
    format: 'YYYY-MM-DD-[{category}][.log]'
});
//router use : this.logger.error(new Error(''))
exports.logger = logger;

/**
 * 处理成功的数据
 * @param data
 * @returns {{status: number, msg: string, data: *}}
 */
exports.prepareSuccess = function(data, msg="success"){
    return {
        status: 0,
        msg: msg,
        data: data
    }
};

/**
 * 处理失败的数据
 * @param data
 * @param status
 * @param msg
 * @returns {{status: number, msg: string, data: *}}
 */
exports.prepareFailure = function(data, msg='error', status=-1){
    return {
        status: status,
        msg: msg,
        data: data
    }
};

/**
 * 过滤掉target中在paramsList中不存在的属性字段
 * @param target
 * @param paramsList
 * @returns {{}}
 */
exports.filterParams = function(target={}, paramsList){
    var result = {};
    target.keys().map(key=>{
        if(paramsList.includes(key)){
            result[key] = target[key];
        }
        else{
            logger.error(JSON.stringify(target));
        }
    });

    return result;
};