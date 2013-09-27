'use strict';
var gaugeWritable = require('../')
  , numbers = require('./number-readable')

var el = document.createElement('div');
document.body.appendChild(el);

var gaugeOpts = { clazz: 'simple', label: 'numbers', transitionDuration: 200, max: 40 };
numbers({ to: 40, throttle: 500 })
  .pipe(gaugeWritable(el, { gauge: gaugeOpts }))
