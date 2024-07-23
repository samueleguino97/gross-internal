const body = document.querySelector("body");

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {});
  console.log(mutations);
});
observer.observe(body, { childList: true, subtree: true, attributes: true });
