function DOMObject(properties) {
  const proto = Object.assign({}, properties);

  return function DOMObjectConstructor(assert, root=document) {
    Object.keys(proto).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          const element = root.querySelector(proto[key]);
          assert.ok(element, `found element for "${key}" with selector "${proto[key]}"`);
          return element;
        }
      })
    });
  };
}
