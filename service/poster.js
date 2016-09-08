/**
 * Created by yangxun on 16/7/6.
 */
var Model = require('../model'),
    Tool = require('../common/tool'),
    ObjectId = require('../common/objectid').ObjectID;

/**
 * 保存海报数据
 * @param poster
 * @returns {Promise.<T>}
 */
exports.save = function*(poster){
    poster = Tool.filterParams(poster, Model.params.poster);
    poster.id = new ObjectId().toHexString();
    poster.isPublish = false;
    return Model.poster.create(poster).then(result=>{
        return Tool.prepareSuccess(poster);
    }).catch(err=>{
        Tool.logger.error(err);
        return Tool.prepareFailure({}, err);
    });
};

/**
 * 根据海报发布的url查询海报信息
 * @param path
 * @returns {Promise.<T>}
 */
exports.check = function*(id, path){
    return Model.poster.findOne({
            where: {pathname: path}
        }).then(poster=>{
            if(poster == null || poster.id == id){
                return Tool.prepareSuccess(true);
            }
            else{
                return Tool.prepareFailure(false, '该地址已被使用');
            }
        }).catch(err=>{
            Tool.logger.error(err);
            return Tool.prepareFailure(false, err);
        });
};

/**
 * 根据海报发布的url查询海报信息
 * @param path
 * @returns {Promise.<T>}
 */
exports.findByFilter = function*(where){
    where = Tool.filterParams(where, Model.params.poster);

    return Model.poster.count({
            where: where
        }).then(count=>{
            return Tool.prepareSuccess(count);
        }).catch(err=>{
            Tool.logger.error(err);
            return Tool.prepareFailure(false, err);
        });
};

/**
 * 根据指定条件查询
 * @param where 过滤条件
 * @param page 分页信息
 * @returns {Promise.<T>}
 */
exports.find = function*(where={}, page){
    where = Tool.filterParams(where, Model.params.poster);
    where = Tool.filterEmptyOrNull(where);

    var filter = {
        where: {},
        order: [
            ['createDate', 'DESC'],
            ['updateDate', 'DESC']
        ]
    };
    for(var i in where){
        filter.where[i] = {$like: `%${where[i]}%`};
    }

    if(page){
        try{
            filter.limit = Number(page.size);
            filter.offset = page.size * page.index;
        }
        catch (e){
            Tool.logger.error(e);
        }
    }

    return Promise.all([
        Model.poster.findAndCountAll(filter).then(count=>{
            return count;
        }).catch(err=>{
            return err;
        })
        ,Model.poster.findAll(filter).then(list=>{
            return list;
        }).catch(err=>{
            return err;
        })
    ]).then(result=>{
        return Tool.prepareSuccess({
            total: result[0].count,
            list: result[1]
        });
    }).catch(err=>{
        Tool.logger.error(err);
        return Tool.prepareFailure(false, err);
    });
};

/**
 * 根据ID获取详情
 * @param id
 */
exports.detail = function* (id){
    return Model.poster.findById(id).then(poster=>{
        return Tool.prepareSuccess(poster);
    }).catch(err=>{
        Tool.logger.error(err);
        return Tool.prepareFailure(false, err);
    });
};

/**
 * 根据id更新海报信息
 * @param poster
 */
exports.update = function*(id, params){
    params = Tool.filterParams(params, Model.params.poster);

    params.isPublish = true;
    params.updateDate = new Date();
    return Model.poster.update(params, {where: {id}}).then(result=>{
        return Tool.prepareSuccess(true);
    }).catch(err=>{
        Tool.logger.error(err);
        return Tool.prepareFailure(false);
    });
};

/**
 * 根据ID删除海报信息
 * @param id
 */
exports.del = function*(id){
    return Model.poster.destroy({where: {id}}).then(result=>{
        return Tool.prepareSuccess(true);
    }).catch(err=>{
        Tool.logger.error(err);
        return Tool.prepareFailure(false, err);
    });
};