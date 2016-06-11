var assert = require('assert'),
    util = require('util'),
    faker = require('faker'),
    remarkableSwig = require('../index'),
    swig = require('swig');

suite('swig-marked', function() {

    test('marked tag', function() {
        var words = faker.lorem.sentence(),
            input = util.format('{% markdown %}# %s{% endmarkdown %}', words),
            expected = util.format('<h1>%s</h1>\n', words);

        remarkableSwig.useTag(swig);
        assert.equal(swig.render(input), expected);
    });

    test('marked filter', function() {
        var words = faker.lorem.sentence(),
            input = '{{ words|markdown }}',
            expected = util.format('<h1>%s</h1>\n', words);

        remarkableSwig.useFilter(swig);
        assert.equal(swig.render(input, {
            locals: {
                words: util.format('# %s', words)
            }
        }), expected);
    });

});
