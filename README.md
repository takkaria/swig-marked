Markdown filter and tag based on remarkable. As the name already states, this module combines
[swig](https://github.com/paularmstrong/swig/) and [remarkable](https://www.npmjs.com/package/remarkable).

usage:

```javascript
const remarkableSwig = require('swig-marked');
const swig = require('swig');

remarkableSwig.useFilter(swig);
remarkableSwig.useTag(swig);

swig.render('{% markdown %}# hello world{% endmarkdown %}');
// <h1>hello world</h1>

swig.render('{{ words|markdown }}', { locals: { words: '# hello word' } });
// <h1>hello world</h1>

// filter and tag are also exposed like so:
swig.setFilter( 'dingus', remarkableSwig.filter);
swig.render('{{ words|dingus }}', { locals: { words: '# hello word' } });
// <h1>hello world</h1>

// provide configuration options to marked:
var configured = remarkableSwig.configure({
    typographer: true
});
```

Attribution
===========

This code is a fork of [swig-marked](https://www.npmjs.com/package/swig-marked) by Matthijs van Henten.  That project carried the following notice:

A large part of this code is based upon upon the [original markdown](https://github.com/paularmstrong/swig-extras) tag writen by Paul Armstrong, and extended from the marked tag written by [Jon Schlinkert, Brian Woodward & contributors](https://github.com/assemble/swig-extensions).
