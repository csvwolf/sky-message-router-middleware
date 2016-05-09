/**
 * Created by SkyAo on 16/4/10.
 *
 * Object自定义函数列表
 */
module.exports = {
    // 判断一个对象是否为空
    isEmpty: function(object) {
        var elem;
        for (elem in object) {
            if (object.hasOwnProperty(elem)) {
                return true;
            }
        }
        return false;
    },

    // 获取一个对象（哈希表）的长度
    getObjectLength: function(object) {
        var length = 0,
            elem;
        for (elem in object) {
            if (object.hasOwnProperty(elem)) {
                length++;
            }
        }

        return length;
    },

    // 获取哈希表中第n个值
    getSpecificElementOfObj: function(object, index) {
        var elem,
            counter = 0,
            result = {};
        for (elem in object) {
            if (object.hasOwnProperty(elem)) {
                if (counter++ == index) {
                    result['elem'] = object[elem];
                    result['key'] = elem;
                }
            }
        }

        return result;
    }
};