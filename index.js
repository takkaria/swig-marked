var remarkable = require('remarkable');

/**
 * {% markdown }...{% endmarkdown %}
 *
 * Based on swig-marked by Matthijs van Henten
 *
 * Based upon the original markdown tag writen by Paul Armstrong
 * https://github.com/paularmstrong/swig-extras
 *
 * Extended from the markdown tag written by Jon Schlinkert, Brian Woodward & contributors
 */
function tag(remarkable) {
    return {
        parse: function(str, line, parser, types, options) {
            parser.on('*', function() {
                throw new Error('The remarkable tag does not accept arguments');
            });

            return true;
        },

        compile: function(compiler, args, content, parents, options, blockName) {
            return '(function () {\n' +
                '  var __o = _output;\n' +
                '  _output = "";\n' +
                compiler(content, parents, options, blockName) + ';\n' +
                '  __o += _ext.remarkable.render(_output);\n' +
                '  _output = __o;\n' +
                '})();\n';
        },

        ends: true,

        blockLevel: false,

        ext: {
            name: 'remarkable',
            obj: remarkable
        },

        safe: true
    };
}

/**
 * Wrap around remarkable.setOptions, adding the possiblity of overriding defaults if needed.
 * setOptions sets the options for *all* instances of remarkable at this package's level, sadly,
 * so you're basically changing your global markdown config each time.
 */
function configure(options) {
    var md = new remarkable(options);

    return {
        useTag: function(swig, name) {
            var t = tag(md);

            swig.setTag(name || 'markdown', t.parse, t.compile, t.ends, t.blockLevel);
            swig.setExtension(t.ext.name, t.ext.obj);
        },

        useFilter: function(swig, name) {
            swig.setFilter(name || 'markdown', this.filter);
        },

        get filter() {
            var filter = function(str) {
                return md.render(str);
            };

            filter.safe = true;

            return filter;
        },

        get tag() {
            return tag(md);
        }
    };
}

module.exports = configure();
module.exports.configure = configure;
