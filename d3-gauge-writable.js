'use strict';
var d3gauge =  require('d3-gauge')
  , stream  =  require('stream')
  , util    =  require('util')

var Writable = stream.Writable;

module.exports = GaugeWritable;

util.inherits(GaugeWritable, Writable);

/**
 * Creates a writable stream that writes to a d3-gauge.
 * 
 * @name GaugeWritable
 * @function
 * @param el {DOMElement} to attach the gauge to
 * @param opts {Object} passed to the [Writable](http://nodejs.org/api/stream.html#stream_new_stream_writable_options)
 *  - gauge: property on the opts Object passed to d3-gauge
 * @return {Stream} a writable stream
 */
function GaugeWritable (el, opts) {
  if (!(this instanceof GaugeWritable)) return new GaugeWritable(el, opts);

  opts = opts || {};
  this.gauge = d3gauge(el, (opts && opts.gauge));
  Writable.call(this, opts);
}

function isBuffer (chunk) {
  // it seems like chunks emitted from a readable are considered not to be buffers by the browserify-buffer module
  // mainly because instanceof chunk !== Buffer although chunk is actually a Buffer
  // however these Buffers have an .offset and .get, and numerous .read methods, so if we find these we'll assume it's a buffer
  return Buffer.isBuffer(chunk)
    || ( typeof chunk.offset === 'number'
      && typeof chunk.get === 'function'
      && typeof chunk.readDoubleBE === 'function'
      && typeof chunk.readInt32BE === 'function')
}

GaugeWritable.prototype._write = function (chunk, encoding, cb) {
  var val;
  try {
         if (typeof chunk === 'number') val = chunk; 
    else if (isBuffer(chunk))  val = parseInt(chunk.toString(), 10);
    else if(typeof chunk === 'string')  val = parseInt(chunk, 10);
    else cb(new Error('Stream needs to emit numbers in object mode or stringified or buffered numbers otherwise'));

    this.gauge.write(val);
    cb();
  } catch (err) {
    cb(err);
  }
};

