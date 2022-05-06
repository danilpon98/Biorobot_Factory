export default function (anchor) {
  const el = document.querySelector(anchor);
  if (!el) return false;
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: el.offsetTop,
  });
}
