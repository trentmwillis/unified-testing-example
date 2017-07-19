QUnit.module('Integration Tests for UTEApp', function(hooks) {

  const Component = DOMObject({
    status: '.status',
    changeStatus: '.change-status'
  });

  hooks.beforeEach(function(assert) {

    const fixture = document.getElementById('qunit-fixture');
    this.element = document.createElement('ute-app');
    fixture.appendChild(this.element);

    this.component = new Component(assert, this.element.shadowRoot);
    this.dom = new DOMAssert(assert);

  });

  QUnit.test('displays a formatted status', function(assert) {

    this.element.status = 'foo bar';
    assert.equal(this.component.status.innerText, 'Foo Bar');

  });

  QUnit.test('clicking the change-status button updates the displayed status', function(assert) {

    assert.equal(this.component.status.innerText, 'Good');
    assert.equal(this.component.changeStatus.innerText, 'Change Status to "Bad"');

    this.dom.click(this.component.changeStatus);

    assert.equal(this.component.status.innerText, 'Bad');
    assert.equal(this.component.changeStatus.innerText, 'Change Status to "Good"');

  });

});
