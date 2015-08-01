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



  describe('Define if a user can be invited', function(){
    describe('When a user has a distance less or equal than 100000 he can be invited', function(){
      var user_1;
      var user_2;
      beforeEach(function(){
        user_1 = {
          "latitude": "52.986375",
          "user_id": 12,
          "name": "Christina McArdle",
          "longitude": "-6.043701"
        };
        user_2 = {
          "latitude": "53.2451022",
          "user_id": 4,
          "name": "Ian Kehoe",
          "longitude": "-6.238335"
        };
      });

      it('The user1 can be invited', function(){
        var can_be_invited = user.canBeInvited(user_1);
        expect(can_be_invited).toEqual(true);
      });

      it('The user2 can be invited', function(){
        var can_be_invited = user.canBeInvited(user_2);
        expect(can_be_invited).toEqual(true);
      });
    });


    describe('When a user has a distance more than 100000 he can not be invited', function(){
      var user_json1;
      var user_json2;
      beforeEach(function(){
        user_1 = {
          "latitude": "52.366037",
          "user_id": 16,
          "name": "Ian Larkin",
          "longitude": "-8.179118"
        };
        user_2 = {
          "latitude": "51.802",
          "user_id": 21,
          "name": "David Ahearn",
          "longitude": "-9.442"
        };
      });

      it('The user1 can not be invited', function(){
        var can_be_invited = user.canBeInvited(user_1);
        expect(can_be_invited).toEqual(false);
      });
      it('The user2 can not be invited', function(){
        var can_be_invited = user.canBeInvited(user_2);
        expect(can_be_invited).toEqual(false);
      });
    });
  });

  describe('When we get a lsit of users we decide which one can be invited', function(){
    var users_to_invite;
    var users_to_invite_false;
    var users_to_check_false;
    var users_to_check;
    var are_equals_array;
    var are_equals_objects;
    beforeEach(function() {
      are_equals_objects = function(o1, o2){
        var i = 0;
        var l1 = Object.getOwnPropertyNames(o1);
        var l2 = Object.getOwnPropertyNames(o2);
        var len = l1.length;
        var current;
        if(l1.length !== l2.length){
          return false;
        }
        for(i; i < len; i += 1){
          current = l1[1];
          if(o1[current] !== o2[current]){
            return false;
          }
        }
        return true;
      };
      are_equals_array = function  (a1, a2){
        var i = 0;
        var len = a1.len;
        if(a1.length !== a2.length){
          return false;
        }
        for (i; i < len; i += 1) {
          if(!are_equals_objects(a1, a2)){
            return false;
          }
        }
        return true;
      };
      users_to_invite_false = [{
        "latitude": "53.1302756",
        "user_id": 5,
        "name": "Nora Dempsey",
        "longitude": "-6.2397222"
      }];
      users_to_check_false = [{
        "latitude": "53.1302756",
        "user_id": 5,
        "name": "Nora Dempsey",
        "longitude": "-6.2397222"
      }];
      users_to_invite = [{
        "latitude": "53.2451022",
        "user_id": 4,
        "name": "Ian Kehoe",
        "longitude": "-6.238335"
      }, {
        "latitude": "52.986375",
        "user_id": 12,
        "name": "Christina McArdle",
        "longitude": "-6.043701"
      }];

      users_to_check = [{
        "latitude": "53.1302756",
        "user_id": 5,
        "name": "Nora Dempsey",
        "longitude": "-6.2397222"
      },{
        "latitude": "52.366037",
        "user_id": 16,
        "name": "Ian Larkin",
        "longitude": "-8.179118"
      },{
        "latitude": "53.2451022",
        "user_id": 4,
        "name": "Ian Kehoe",
        "longitude": "-6.238335"
      }, {
        "latitude": "51.802",
        "user_id": 21,
        "name": "David Ahearn",
        "longitude": "-9.442"
      },{
        "latitude": "52.986375",
        "user_id": 12,
        "name": "Christina McArdle",
        "longitude": "-6.043701"
      }];
    });
    it('Users that gets invited to the offices', function(){
      var user_list = user.getUsersToInvite(users_to_check);
      var result = are_equals_array(user_list, users_to_invite);
      expect(result).toEqual(false);

    });
    it('Users that do not get invited to the offices', function(){
      var user_list = user.getUsersToInvite(users_to_check_false);
      var result = are_equals_array(user_list, users_to_invite_false);
      expect(result).toEqual(true);
    });
  });

});
