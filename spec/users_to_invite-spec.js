var user = require("../users_to_invite.js");
describe('Users to invate test', function(){
  describe('toRadians', function(){
    describe("convert positive grades to radian", function () {
      it("should convert 30 grades to radian", function () {
        var radians = user.toRadians(30);
        expect(radians).toBe(0.5235987755982988);
      });
      it("should convert 125 grades to radian", function () {
        var radians = user.toRadians(125);
        expect(radians).toBe(2.1816615649929116);
      });
    });

    describe("convert negatives grades to radian", function () {
      it("should convert -15 grades to radian", function () {
        var radians = user.toRadians(-15);
        expect(radians).toBe(-0.2617993877991494);
      });
    });
  });


  describe('getDistance', function(){
    it('The distance should be 43559.47257088365', function(){
      var distance = user.getDistance(52.966, -6.463, 53.3381985, -6.2592576);
      expect(distance).toBe(43559.47257088365);
    });
    it('The distance should be 41676.83909574573', function(){
      var distance = user.getDistance(52.986375, -6.043701, 53.3381985, -6.2592576);
      expect(distance).toBe(41676.83909574573);
    });
    it('The distance should be 82634.79317536046', function(){
      var distance = user.getDistance(53.761389, -7.2875, 53.3381985, -6.2592576);
      expect(distance).toBe(82634.79317536046);
    });
  });

  


});
