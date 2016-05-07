/**
 * Created by SkyAo on 16/5/7.
 */
module.exports = function Post() {
    this.content = '';

    this.addContent = function(chunk) {
        this.content += chunk;
    }
};