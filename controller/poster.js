/**
 * Created by yangxun on 16/7/7.
 */
var Poster = require('../service/poster'),
    Common = require('../service/common');

module.exports = {
    /**
     * 保存到数据库
     */
    save: function*(){
        var poster = this.request.body;
        var tempFiles = poster.tempFiles;
        var result = yield Common.publishImage(tempFiles);
        if(result.status == 0){
            this.body = yield Poster.save(poster);
        }
        else{
            this.body = result;
        }
    },
    /**
     * path唯一性校验
     */
    check: function*(){
        var path = this.query.path;
        var id = this.query.id;
        this.body = yield Poster.check(id, path);
    },
    /**
     * 根据自定义过滤条件查询
     */
    find: function* (){
        var where = this.query,
            page = {
                size: Number(where.size) || 20,
                index: Number(where.index) || 0
            };
        this.body = yield Poster.find(where, page);
    },
    /**
     * 获取自己创建的海报活动列表
     */
    findOwnerPoster: function*(){
        var user_id = this.session.user_id,
            page = this.query.page,
            where = {
                user_id: user_id
            };
        this.body = yield Poster.find(where, page);
    },
    /**
     * 根据ID查询海报详情
     */
    detail: function* (){
        var id = this.query.id;
        this.body = yield Poster.detail(id);
    },
    /**
     * 更新海报信息
     */
    update: function* (){
        var id = this.request.body.id,
            params = this.request.body.params;
        var tempFiles = params.tempFiles;
        var result = yield Common.publishImage(tempFiles);
        if(result.status == 0){
            this.body = yield Poster.update(id, params);
            //this.body = yield Poster.save(poster);
        }
        else{
            this.body = result;
        }

    },
    /**
     * 更新关注状态
     */
    attention: function* (){
        var id = this.request.body.id, attention = this.request.body.attention;

        this.body = yield Poster.attention(id, attention);
    },
    /**
     * 发布到CDN
     */
    publish: function* (){
        var id = this.request.body.id,
            params = this.request.body.params;

        var result = yield Poster.update(id, params);
        if(result.status == 0){
            this.body = yield Common.publishHtml(params.pathname, params.html);
        }
        else{
            this.body = result;
        }
    },
    /**
     * 根据ID删除海报
     */
    del: function* (id){
        var id = this.params.id;
        this.body = yield Poster.del(id);
    }
};