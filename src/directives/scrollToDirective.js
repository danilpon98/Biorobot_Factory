import event from "@/utils/event";
import scrollTo from "@/utils/scrollTo";

let bindings = [];

function deleteBinding(el) {
  bindings = bindings.filter((binding) => binding.el !== el);
}

function findBinding(el) {
  return bindings.find((binding) => binding.el === el);
}

function getBinding(el) {
  let binding = findBinding(el);

  if (binding) return binding;

  binding = {
    el: el,
    binding: {},
  };

  bindings.push(binding);
  return binding;
}

function handleClick() {
  const ctx = getBinding(this).binding;
  if (!ctx.value && typeof ctx.value !== "string") return false;
  scrollTo(ctx.value, "easeInQuad");
}

const directiveHooks = {
  bind(el, binding) {
    getBinding(el).binding = binding;
    event.on(el, "click", handleClick);
  },
  unbind(el) {
    deleteBinding(el);
    event.off(el, "click", handleClick);
  },
  update(el, binding) {
    getBinding(el).binding = binding;
  },
};

export default {
  bind: directiveHooks.bind,
  unbind: directiveHooks.unbind,
  update: directiveHooks.update,
  beforeMount: directiveHooks.bind,
  unmounted: directiveHooks.unbind,
  updated: directiveHooks.update,
};
