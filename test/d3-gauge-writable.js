'use strict';
/*jshint asi: true */

var test = require('tape')
var gaugeWritable = require('../')
  , numbers = require('../example/number-readable')
  , numbersObj = require('../example/number-readable-objmode')

test('\nwhen I pipe a stringified number stream into the gauge', function (t) {
  var transitionDuration = 10  
  var throttle = 100
  var wait = throttle + transitionDuration
  var el = document.createElement('div');
  document.body.appendChild(el);

  var gaugeOpts = { clazz: 'simple', label: 'numbers', transitionDuration: transitionDuration, max: 40 };

  var w = gaugeWritable(el, { gauge: gaugeOpts })
  var g = w._gauge;
  numbers({ to: 40, throttle: throttle }).pipe(w)

  t.notOk(g._currentRotation, 'initially it does not have a current rotation')
  var lastVal = -135;
  setTimeout(function () { t.equal(g._currentRotation, -135, 'starts at -135 rotation') }, wait  + 50     )
  setTimeout(check , 2 * wait + 50  )
  setTimeout(check, 3 * wait + 50  )
  setTimeout(check, 4 * wait + 50  )
  setTimeout(check, 5 * wait + 50  )
  setTimeout(check, 10 * wait + 50 )
  setTimeout(check, 15 * wait + 50 )
  setTimeout(check, 20 * wait + 50 )
  setTimeout(check, 40 * wait + 50 )
  setTimeout(function () { t.equal(g._currentRotation, 135, 'ends at 135 rotation') }, 55 * wait + 50 )
  setTimeout(t.end.bind(t) , 55 * wait + 100 )

  function check() { 
    var currentVal = g._currentRotation
    t.ok(currentVal > lastVal, 'current: ' + currentVal + ' is greater than last: ' + lastVal) 
    lastVal = currentVal 
  }
})
