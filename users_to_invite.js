(function(){

  /**
  @param{number} angle
  @return{number} The angle given converted to radian.
  **/
  var toRadians = function(angle){
    return angle * Math.PI / 180;
  };

  /**
  @param{number} lat1
  @param{number} lon1
  @param{number} lat2
  @param{number} lon2
  @return{number} distance_between two points
  **/
  var getDistance = function(lat1, lon1, lat2, lon2){
    var R = 6371000; // earth radius
    var lat1 = toRadians(lat1);
    var lon1 = toRadians(lon1);
    var lat2 = lat2 || 53.3381985;
    var lon2 = lon2 || -6.2592576;
    var lat_abs_difference;
    var lon_abs_difference;


    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);
    lat_abs_difference = Math.abs(lat1 - lat2);
    lon_abs_difference = Math.abs(lon1 - lon2);

    var central_angle_aux = Math.sin(lat_abs_difference/2) * Math.sin(lat_abs_difference/2) +
                        Math.cos(lat1) * Math.cos(lat2) *
                        Math.sin(lon_abs_difference/2) * Math.sin(lon_abs_difference/2);
    var central_angle = 2 * Math.asin
    (Math.sqrt(central_angle_aux));
    return R * central_angle;
  };





  var result = {
    toRadians : toRadians,
    getDistance : getDistance
  };
  module.exports = result;
})()
