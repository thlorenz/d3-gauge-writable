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
  setTimeout(check.bind(null, -135    ) , wait  + 50     )
  setTimeout(check.bind(null, -128.25 ) , 2 * wait + 50  )
  setTimeout(check.bind(null, -121.5  ) , 3 * wait + 50  )
  setTimeout(check.bind(null, -114.75 ) , 4 * wait + 50  )
  setTimeout(check.bind(null, -108    ) , 5 * wait + 50  )
  setTimeout(check.bind(null, -67.5   ) , 10 * wait + 50 )
  setTimeout(check.bind(null, -33.75  ) , 15 * wait + 50 )
  setTimeout(check.bind(null, 6.75    ) , 20 * wait + 50 )
  setTimeout(check.bind(null, 135     ) , 40 * wait + 50 )
  setTimeout(check.bind(null, 135     ) , 50 * wait + 50 )
  setTimeout(t.end.bind(t) , 50 * wait + 100 )

  function check(val) { t.equal(g._currentRotation, val) }
})
