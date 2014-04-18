var test = require('tape');
var concat = require('concat-stream');
var staticModule = require('../');
var fs = require('fs');
var path = require('path');

test('object', function (t) {
    t.plan(1);
    
    var sm = staticModule({
        beep: { x: 5, f: function (n) { return n * 111 } }
    });
    readStream('source.js').pipe(sm).pipe(concat(function (body) {
        Function(['console'],body)({ log: log });
        function log (msg) { t.equal(msg, 555) }
    }));
});

function readStream (file) {
    return fs.createReadStream(path.join(__dirname, 'obj', file));
}
