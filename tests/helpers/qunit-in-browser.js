const ChromeDevToolsProtocol = require('chrome-remote-interface');
const ChromeLauncher = require('chrome-launcher');
const fs = require('fs');

async function browserTest(url, test) {
  const chrome = await ChromeLauncher.launch({
    startingUrl: url
  });
  const devtools = await ChromeDevToolsProtocol({
    port: chrome.port
  });

  const {
    Page,
    Runtime
  } = devtools;

  await Page.enable();
  await Page.loadEventFired();

  // Construct test scripts to inject into page
  const qunitConfig = `
    QUnit = {
      config: {
        autostart: false
      }
    };
  `;
  const qunitPath = require.resolve('qunitjs');
  const qunit = fs.readFileSync(qunitPath, 'utf-8');
  const testScript = `
    new Promise((resolve) => {
      QUnit.on('runEnd', (data) => resolve(JSON.stringify(data)));
      QUnit.test('testing', ${test});
      ${test.toString().indexOf('debugger') === -1 ? 'QUnit.start();' : ''}
    });
  `;

  // Evaluate test scripts in page
  await Runtime.evaluate({ expression: qunitConfig });
  await Runtime.evaluate({ expression: qunit });

  // TODO: Should return a Promise that resolves with the test run info
  const testResult = await Runtime.evaluate({
    expression: testScript,
    awaitPromise: true
  });

  const result = JSON.parse(testResult.result.value);

  devtools.close();
  chrome.kill();

  return result;
}

QUnit.test.inBrowser = function(description, url, test) {
  QUnit.test(description, async function(assert) {
    const result = await browserTest(url, test);
    assert.equal(result.status, 'passed');
  });
};
