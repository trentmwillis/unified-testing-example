function DOMAssert(assert) {
  this.click = function(element) {
    const event = new CustomEvent('click', {
      bubbles: true,
      compose: true
    });
    element.dispatchEvent(event);
  };
}
