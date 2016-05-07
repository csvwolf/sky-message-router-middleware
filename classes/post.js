/**
 * Created by SkyAo on 16/5/7.
 */
module.exports = function Post() {
    this.content = '';

    this.addContent = function(chunk) {
        console.log(this.content);
        this.content += chunk;
        console.log(this.content);
    }
};