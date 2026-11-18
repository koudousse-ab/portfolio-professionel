(function () {
  "use strict";
  var D = window.PORTFOLIO;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var plural = function (n, one, many) { return n + " " + (n > 1 ? many : one); };
  var domainById = {};
  D.domains.forEach(function (d) { domainById[d.id] = d; });

  var countProjects = function (id) { return D.projects.filter(function (p) { return p.cats.indexOf(id) > -1; }).length; };
  var countCerts = function (id) { return D.certs.filter(function (c) { return c.cats.indexOf(id) > -1; }).length; };

  /* ---------- Thème ---------- */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}
  $("#theme-toggle").addEventListener("click", function () {
    var current = root.getAttribute("data-theme") ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    var next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 1800);
  }
  function copy(text) {
    var fallback = function () {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); toast("Copié"); } catch (e) { toast("Sélectionne le texte pour le copier"); }
      document.body.removeChild(ta);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast("Copié"); }, fallback);
    } else { fallback(); }
  }

  /* ---------- Hero ---------- */
  $("#cv-link").href = D.person.cv;
  $("#year").textContent = new Date().getFullYear();

  $("#port-row").innerHTML = D.domains.map(function (d) {
    return '<a class="port" href="#projets" data-cat="' + d.id + '">' +
      '<span class="port-top"><span class="led" aria-hidden="true"></span>' + d.code + '</span>' +
      '<span class="port-name">' + esc(d.name) + '</span>' +
      '<span class="port-meta">' + plural(countProjects(d.id), "projet", "projets") + ' · ' + plural(countCerts(d.id), "certificat", "certificats") + '</span>' +
      '</a>';
  }).join("");

  /* ---------- Domaines ---------- */
  $("#domains-meta").textContent = D.domains.map(function (d) { return d.code; }).join(" · ");
  $("#domain-grid").innerHTML = D.domains.map(function (d) {
    return '<article class="domain">' +
      '<div class="domain-top"><span class="tag">' + d.code + '</span>' +
      '<span class="domain-count">' + countProjects(d.id) + ' projets · ' + countCerts(d.id) + ' certificats</span></div>' +
      '<h3>' + esc(d.name) + '</h3>' +
      '<p>' + esc(d.text) + '</p>' +
      '<ul class="chips">' + d.stack.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join("") + '</ul>' +
      '</article>';
  }).join("");

  /* ---------- Projets + filtres ---------- */
  var active = "all";
  function renderFilters() {
    var pills = [{ id: "all", label: "Tous", n: D.projects.length }].concat(
      D.domains.map(function (d) { return { id: d.id, label: d.name, n: countProjects(d.id) }; })
    );
    $("#filters").innerHTML = pills.map(function (p) {
      return '<button type="button" class="pill" data-cat="' + p.id + '" aria-pressed="' + (p.id === active) + '">' +
        esc(p.label) + '<span class="n">' + p.n + '</span></button>';
    }).join("");
  }
  function renderProjects() {
    var list = D.projects.filter(function (p) { return active === "all" || p.cats.indexOf(active) > -1; });
    $("#projects-meta").textContent = plural(list.length, "réalisation", "réalisations");
    $("#project-grid").innerHTML = list.map(function (p) {
      return '<article class="project">' +
        '<div class="project-top"><span class="kicker">' + esc(p.kicker) + '</span>' +
        '<span class="project-tags">' + p.cats.map(function (c) { return '<span class="tag">' + domainById[c].code + '</span>'; }).join("") + '</span></div>' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p>' + esc(p.text) + '</p>' +
        '<ul class="chips">' + p.stack.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join("") + '</ul>' +
        '</article>';
    }).join("");
  }
  function setFilter(id) { active = id; renderFilters(); renderProjects(); }
  $("#filters").addEventListener("click", function (e) {
    var b = e.target.closest(".pill");
    if (b) setFilter(b.getAttribute("data-cat"));
  });
  $("#port-row").addEventListener("click", function (e) {
    var a = e.target.closest(".port");
    if (a) setFilter(a.getAttribute("data-cat"));
  });
  renderFilters();
  renderProjects();

  /* ---------- Certifications ---------- */
  var fmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  var certs = D.certs.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  $("#certs-meta").textContent = plural(certs.length, "document", "documents") + " · PDF d'origine disponibles";
  $("#cert-grid").innerHTML = certs.map(function (c, i) {
    var when = c.dateLabel || fmt.format(new Date(c.date + "T00:00:00Z"));
    return '<article class="cert">' +
      '<button class="cert-thumb" type="button" data-i="' + i + '" aria-label="Agrandir : ' + esc(c.title) + '">' +
      '<img src="' + c.thumb + '" alt="Aperçu du certificat ' + esc(c.title) + '"></button>' +
      '<div class="cert-body">' +
      '<span class="cert-issuer">' + esc(c.issuer) + '</span>' +
      '<h3>' + esc(c.title) + '</h3>' +
      '<span class="cert-meta">' + esc(when) + ' · ' + esc(c.detail) + '</span>' +
      '<div class="cert-actions"><button type="button" data-i="' + i + '">Agrandir</button>' +
      '<a href="' + c.pdf + '" target="_blank" rel="noopener">Ouvrir le PDF</a></div>' +
      '</div></article>';
  }).join("");

  var viewer = $("#viewer");
  function openViewer(i) {
    var c = certs[i];
    $("#viewer-title").textContent = c.title;
    $("#viewer-img").src = c.full;
    $("#viewer-img").alt = "Certificat : " + c.title;
    $("#viewer-pdf").href = c.pdf;
    if (viewer.showModal) viewer.showModal(); else viewer.setAttribute("open", "");
  }
  $("#cert-grid").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-i]");
    if (b) openViewer(+b.getAttribute("data-i"));
  });
  $("#viewer-close").addEventListener("click", function () { viewer.close ? viewer.close() : viewer.removeAttribute("open"); });
  viewer.addEventListener("click", function (e) { if (e.target === viewer) viewer.close(); });

  /* ---------- Contact ---------- */
  var P = D.person;
  var cards = [
    { label: "E-mail", value: P.email, href: "mailto:" + P.email, copy: P.email, cta: "Écrire" },
    { label: "Téléphone", value: P.phone, href: "tel:" + P.phoneHref, copy: P.phone, cta: "Appeler" },
    { label: "LinkedIn", value: "koudousse-tchedre", href: P.linkedin, cta: "Ouvrir" },
    { label: "GitHub", value: "koudousse-ab", href: P.github, cta: "Ouvrir" }
  ];
  $("#contact-grid").innerHTML = cards.map(function (c, i) {
    var ext = /^https?:/.test(c.href) ? ' target="_blank" rel="noopener"' : "";
    return '<div class="contact-card"><span class="label">' + c.label + '</span>' +
      '<span class="value">' + esc(c.value) + '</span>' +
      '<span class="row"><a class="small-btn" href="' + c.href + '"' + ext + '>' + c.cta + '</a>' +
      (c.copy ? '<button class="small-btn" type="button" data-copy="' + esc(c.copy) + '">Copier</button>' : "") +
      '</span></div>';
  }).join("");
  $("#contact-grid").addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]");
    if (b) copy(b.getAttribute("data-copy"));
  });
  window.__app = { setFilter: setFilter, openViewer: openViewer, certs: certs, toast: toast, copy: copy, esc: esc };
})();
