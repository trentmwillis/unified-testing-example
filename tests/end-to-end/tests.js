require('../helpers/qunit-in-browser');

QUnit.test.inBrowser('My browser test example', 'http://localhost:8000', function(assert) {
  debugger;
  assert.ok(document.querySelector('ute-app'));
  assert.equal(document.querySelector('ute-app').displayStatus, 'good');
});

