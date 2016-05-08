/**
 * Created by SkyAo on 16/5/7.
 *
 * HTTP请求对象
 */
module.exports = function Post() {
    this.content = '';

    this.addContent = function(chunk) {
        this.content += chunk;
    }
};