require('../helpers/qunit-in-browser');

QUnit.test.inBrowser('Application smoke test', 'http://localhost:8000', function(assert) {

  function wait(time) {
    const start = Date.now();
    while (Date.now() < start + time) {}
  }

  const App = DOMObject({
    status: '.status',
    changeStatus: '.change-status'
  });
  const HomePage = DOMObject({
    app: 'ute-app'
  });

  this.page = new HomePage(assert);
  this.page.appComponent = new App(assert, this.page.app.shadowRoot);

  assert.equal(this.page.app.displayStatus, 'Good');

  wait(1000);

  this.dom = new DOMAssert(assert);
  this.dom.click(this.page.appComponent.changeStatus);

  wait(1000);

  assert.equal(this.page.app.displayStatus, 'Bad');

});
