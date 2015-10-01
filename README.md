# force-domain

A module part of the project [Clean Url](https://github.com/franciscop/cleanurl). It forces a domain, for those who manage multiple domains. Say you have the following domains:

- example.info
- example.com
- example.org

But you want them all to use the last one, `example.org`. Easy, just point them all to the same server and let `force-domain` to take care of it. It's also useful when changing domains, since urls will be preserved: `example.info/any/folder` will redirect to `example.org/any/folder`

Use it with your middleware:

```js
// Include the repository from npm
var forcedomain = require('force-domain')({ host: "example.org" });

// Allow express to use it (put this before your routes!)
app.use(notrailing);
```

## Options

There are some options that can be used with the module:

- `host`: the domain that you want to use. You can also use this to force `www.`, but we don't really recommend it
- `localhost`: defaults to `true`. Allow for localhost to be excluded for development purposes.
- `permanent`: defaults to `true`.

## Testing

`npm test` should do the trick to make sure everything works


## Known issues

If you are behind a proxy like in heroku, when there's a redirect from `force-domain` it will redirect to the `http` version. We recommend using `force-https` or the full `clean-url` npm modules to avoid this.
