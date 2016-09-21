/**
 * Created by yangxun on 16/9/21.
 */
var fs = require('fs');
var text = fs.readFileSync("./test/HTML.html", encoding='utf8');
var minify = require('html-minifier').minify;
var result = minify(text, {
    collapseWhitespace: true
});

console.log(result);
