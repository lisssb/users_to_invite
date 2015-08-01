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
});
