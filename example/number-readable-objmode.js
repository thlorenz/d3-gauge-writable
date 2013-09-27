'use strict';

var util = require('util')
  , stream = require('stream')
  , Readable = stream.Readable

module.exports = NumberReadableObjMode;

util.inherits(NumberReadableObjMode, Readable);

function NumberReadableObjMode (opts) {
  if (!(this instanceof NumberReadableObjMode)) return new NumberReadableObjMode(opts);
  opts.objectMode = true;
  Readable.call(this, opts);
  this.idx = 0;
  this.to = opts.to;
  this.throttle = opts.throttle;
}

NumberReadableObjMode.prototype._read = function () {
  if (this.idx > this.to) return this.push(null);
  var push = function () { this.push(this.idx++); }.bind(this);
  setTimeout(push, this.throttle);
}

// Test
if (typeof window === 'undefined' && !module.parent) {
  var numbers = new NumberReadableObjMode({ to: 3 });
  numbers
    .on('data', function (d) { console.log(d) })
    .on('end', function () { console.error('ended') })
}
