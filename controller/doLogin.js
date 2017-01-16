//var md5 = require('')

module.exports = function *(next) {
    console.log(this)
    this.redirect('/');
}
