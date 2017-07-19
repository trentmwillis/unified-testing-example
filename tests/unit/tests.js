QUnit.module('Unit Tests for UTEApp', function() {

  QUnit.module('UTEApp.capitalize', function() {

    QUnit.test('capitalizes the first letter of each word', function(assert) {

      let result = UTEApp.capitalize('one two three');
      assert.equal(result, 'One Two Three');

      result = UTEApp.capitalize('one Two tHREE');
      assert.equal(result, 'One Two Three');

    });

  });

  QUnit.module('UTEApp.capitalizeWord', function() {

    QUnit.test('capitalizes the first letter of a string', function(assert) {

      let result = UTEApp.capitalizeWord('one');
      assert.equal(result, 'One');

      result = UTEApp.capitalizeWord('oNE');
      assert.equal(result, 'One');

      result = UTEApp.capitalizeWord('one two');
      assert.equal(result, 'One two');

    });

  });

});
