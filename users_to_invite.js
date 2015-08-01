(function(){

  /**
  @param{number} angle
  @return{number} The angle given converted to radian.
  **/
  var toRadians = function(angle){
    return angle * Math.PI / 180;
  };

  var result = {
    toRadians : toRadians
  };
  module.exports = result;
})()
