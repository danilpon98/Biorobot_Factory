let supportsPassive = false;

if (
  window &&
  typeof window.addEventListener === "function" &&
  typeof Object.defineProperty === "function"
) {
  let options = Object.defineProperty({}, "passive", {
    get: function () {
      supportsPassive = true;
      return true;
    },
  });

  window.addEventListener("_", null, options);
}

export default {
  on(element, events, handler, opts = { passive: false }) {
    if (!(events instanceof Array)) {
      events = [events];
    }
    for (let i = 0; i < events.length; i++) {
      element.addEventListener(
        events[i],
        handler,
        supportsPassive ? opts : false
      );
    }
  },
  off(element, events, handler) {
    if (!(events instanceof Array)) {
      events = [events];
    }
    for (let i = 0; i < events.length; i++) {
      element.removeEventListener(events[i], handler);
    }
  },
};
