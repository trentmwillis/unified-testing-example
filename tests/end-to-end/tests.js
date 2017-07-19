require('../helpers/qunit-in-browser');

QUnit.test.inBrowser('Application smoke test', 'http://localhost:8000', function(assert) {
  function waitFor(selector) {
    return new Promise(resolve => {
      function pollDOM() {
        const element = document.querySelector(selector);

        if (element) {
          resolve();
        } else {
          setTimeout(pollDOM, 16);
        }
      }

      setTimeout(pollDOM, 16);
    });
  }

  return waitFor('ute-app').then(() => {
    assert.ok(document.querySelector('ute-app'));
    assert.equal(document.querySelector('ute-app').displayStatus, 'Good');
  });
});
