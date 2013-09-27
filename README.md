# d3-gauge-writable

d3 gauge with a writable stream API so you can pipe into it.

```js
var gaugeWritable = require('d3-gauge-writable')
  , numbers = require('./number-readable')

numbers({ to: 40, throttle: 500 })
  .pipe(gaugeWritable(el, { gauge: gaugeOpts }))
```

## Installation

    npm install d3-gauge-writable

## API


## License

MIT
