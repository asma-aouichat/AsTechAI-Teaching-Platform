(function () {
  const script = document.currentScript;
  const root = new URL("../../", script.src);
  const componentUrl = new URL("components/navbar.html", root);

  function ensureBootstrap() {
    if (!document.querySelector('link[data-astechai-bootstrap]') &&
        !document.querySelector('link[href*="bootstrap"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
      link.dataset.astechaiBootstrap = "true";
      document.head.appendChild(link);
    }
    if (!window.bootstrap && !document.querySelector('script[data-astechai-bootstrap]')) {
      const bs = document.createElement("script");
      bs.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
      bs.dataset.astechaiBootstrap = "true";
      document.body.appendChild(bs);
    }
  }

  ensureBootstrap();

  fetch(componentUrl)
    .then(r => {
      if (!r.ok) throw new Error("Navbar component not found");
      return r.text();
    })
    .then(html => {
      const mount = document.getElementById("site-navbar");
      if (!mount) return;
      mount.innerHTML = html;

      mount.querySelectorAll("[data-root-href]").forEach(el => {
        const target = el.getAttribute("data-root-href");
        const parts = target.split("#");
        const u = new URL(parts[0], root);
        el.href = u.href + (parts[1] ? "#" + parts[1] : "");
      });
    })
    .catch(err => {
      console.error("AsTechAI navbar:", err);
      const mount = document.getElementById("site-navbar");
      if (mount) mount.innerHTML =
        '<div style="padding:14px 24px;background:#fff;border-bottom:1px solid #eee;font-family:Arial">AsTechAI</div>';
    });
})();