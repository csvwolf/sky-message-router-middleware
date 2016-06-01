/**
 * Created by SkyAo on 16/6/1.
 */
var expect = require('chai').expect,
    objMethods = require('../common/objMethods');

describe('Common', function() {
    describe('#objMethods', function() {
        describe('.isEmpty', function() {
            it('should return false if empty', function() {
                expect(objMethods.isEmpty({})).to.be.false;
                expect(objMethods.isEmpty([])).to.be.false;
            });

            it('should return true if not empty', function() {
                expect(objMethods.isEmpty({test: ''})).to.be.true;
            });
        });

        describe('.getObjectLength', function() {
            it('should return the correct count', function() {
                expect(objMethods.getObjectLength({})).to.equal(0);
                expect(objMethods.getObjectLength({'test': 111})).to.equal(1);
            })
        });

        describe('.getSpecificElementOfObj', function() {
            it('should return the correct result', function() {
                expect(objMethods.getSpecificElementOfObj({'test1': 1, 'test2': 2, 'test3': 3}, 2)).to.have.property('key', 'test3');
            })
        })
    });
});