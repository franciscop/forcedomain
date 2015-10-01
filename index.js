// Force a specific domain. This is useful when you have both the .com & .org
// It can also be used to force "www.", but there's a better module for this
module.exports = function(options){

  return function(req, res, next){

    // Better naming for variables
    var host = req.get('Host');
    var wanted = options.domain || false;
    var localhost = options.localhost !== false;   // note: "!==" is not "!="


    // If we don't want to match anything we cannot force it to match something
    if (!wanted)
      return false;

    // localhost:[0-9]+ is exempted
    if (localhost && host.match(/^localhost\:[0-9]+/)) {
      return false;
    }

    // If the domain is the specified one, no problem
    if(host.indexOf(wanted, host.length - wanted.length) > -1){
      return false;
    }

    // Last case is the failing one
    return "https://" + wanted + req.url;
  };
};
