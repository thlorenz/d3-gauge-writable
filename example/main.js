'use strict';
var gaugeWritable = require('../')
  , numbers = require('./number-readable')
  , numbersObj = require('./number-readable-objmode')

var el = document.createElement('div');
document.body.appendChild(el);

var gaugeOpts = { clazz: 'simple', label: 'numbers', transitionDuration: 200, max: 40 };

numbers({ to: 40, throttle: 500 })
  .pipe(gaugeWritable(el, { gauge: gaugeOpts }))

var gaugeOptsObj = { clazz: 'simple', label: 'obj-numbers', transitionDuration: 100, max: 100 };
numbersObj({ to: 100, throttle: 200 })
  .pipe(gaugeWritable(el, { gauge: gaugeOptsObj, objectMode: true }))
