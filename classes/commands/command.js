/**
 * Created by SkyAo on 16/5/8.
 *
 * 命令的抽象类
 */
module.exports = function Command() {
    this.run = function() {
        console.log('Here is the command');
    }
};