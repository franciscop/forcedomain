# notrailing
A super simple module to delete trailing slashes

```js
// Include the repository from npm
var notrailing = require('notrailing');

// Allow express to use it
app.use(notrailing);
```

Your urls will remove their trailing slashes. The only exception is the root one `/`, since deleting it makes a nasty redirect loop.
