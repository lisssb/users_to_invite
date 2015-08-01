(function(){

  var http = require('http');

  var options = {
    host : 'cdn.rawgit.com',
    path : '/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt'
  }

  http.request(options , function(res){
    var body = '';
    var i = 0;
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      body = body.replace(/\}\n\{/g, '},{');
      body = '[' + body + ']';
      get_users_to_invite(JSON.parse(body));
    });
  }).end();

  /**
  @param{Array[object]} ==> users
  get the users that are within 100km of the Dublin office
  **/
  var get_users_to_invite = function(users){
    var user;
    var current;
    var result = [];
    for(user in users){
      current = users[user];
      if(canBeInvited(current)){
        result.push({
          name : current.name,
          id : current.user_id
        });
      }
    }
    result.sort(function(a, b){
      return a.id - b.id;
    });
    print_users_list(result);
    return result;

  };

  /**
  @param{object} the parameters that define the user properties
  @param{number} the
  @return This function tell if the users have a distance to (dublin offices)
  minor or equal to "distance"
  **/
  var canBeInvited = function(user, distance){
    var distance = distance || 100000;
    return getDistance(user.latitude, user.longitude) <= distance;
  };

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

  /**
  @param{Array[objects]} ==> users_list
  **/
  var print_users_list = function(users){
    var i = 0;
    var len = users.length;
    for ( i; i < len; i += 1) {
      console.log(users[i].id + ' ' + users[i].name );
    }
  };

  var result = {
    toRadians : toRadians,
    getDistance : getDistance,
    canBeInvited : canBeInvited,
    getUsersToInvite : get_users_to_invite
  };
  module.exports = result;
})();
