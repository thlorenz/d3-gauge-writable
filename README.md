# d3-gauge-writable 

[![testling badge](https://ci.testling.com/thlorenz/d3-gauge-writable.png)](https://ci.testling.com/thlorenz/d3-gauge-writable)

[d3-gauge](http://thlorenz.github.io/d3-gauge/) with a writable stream API so you can pipe into it.

```js
var gaugeWritable = require('d3-gauge-writable')
  , numbers = require('./number-readable')

numbers({ to: 40, throttle: 500 })
  .pipe(gaugeWritable(el, { gauge: gaugeOpts }))
```
**Note:** please make sure to [include the appropriate `css`](https://github.com/thlorenz/d3-gauge/blob/master/README.md#styling) in your page, otherwise all you'll see is a
big black circle.

## Installation

    npm install d3-gauge-writable

## API

###*function GaugeWritable (el, opts)*

Creates a writable stream that writes to a d3-gauge.

@name GaugeWritable
@function
**params:**

- el *DOMElement* to attach the gauge to
- opts *Object* passed to the [Writable](http://nodejs.org/api/stream.html#stream_new_stream_writable_options)
  - gauge: property on the opts Object passed to [d3-gauge](https://github.com/thlorenz/d3-gauge#gauge-el-opts)

**returns:**

*Stream* a writable stream

Please review [the example](https://github.com/thlorenz/d3-gauge-writable/blob/master/example/main.js) as well.

## License

MIT
