/**
 * Created by SkyAo on 16/6/1.
 */
var expect = require('chai').expect,
    balanceController = require('../controller/balanceController');

describe('Controller', function() {
    describe('#BalanceController', function() {
        it('should return the right answer', function() {
            for (var i = 0; i < 4; i++) {
                var count = balanceController(5)();
                expect(count).to.equal(i + 1);
            }
        });
    });
});