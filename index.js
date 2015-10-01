var defaults = require('defaults');

// Force a specific domain. This is useful when you have both the .com & .org
// It can also be used to force "www.", but there's a better module for this
module.exports = function(options){

  options = defaults(options, {
    host: false,        // The host to force
    localhost: true,    // Allow for localhost
    permanent: true,    // Make a permanent redirect
    clean: false        // If it's included from clean-url
  });

  return function(req, res, next){

    // Better naming for variables
    var current = req.get('Host');


    // If we don't want to match anything we cannot force it to match something
    if (!options.host) {
      return next();
    }

    // localhost:[0-9]+ is exempted
    if (options.localhost && current.match(/^localhost\:[0-9]+/)) {
      return next();
    }

    // If the domain is the specified one, no problem
    if(current.indexOf(options.host, current.length - options.host.length) > -1){
      return next();
    }

    // Last case is the failing one
    var newdomain = req.protocol + "://" + options.host + req.url;

    if (options.clean)
      return newdomain;

    return res.redirect(options.permanent ? 301 : 307, newdomain);
  };
};
