/* Code partagé par toutes les pages : thème, en-tête, pied de page, cartes, visionneuse. */
(function () {
  "use strict";
  var D = window.PORTFOLIO;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) {
    return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  };
  var plural = function (n, one, many) { return n + " " + (n > 1 ? many : one); };

  var domainById = {};
  D.domains.forEach(function (d) { domainById[d.id] = d; });
  var projectBySlug = {};
  D.projects.forEach(function (p) { projectBySlug[p.slug] = p; });
  var certs = D.certs.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });

  var countProjects = function (id) { return D.projects.filter(function (p) { return p.cats.indexOf(id) > -1; }).length; };
  var countCerts = function (id) { return D.certs.filter(function (c) { return c.cats.indexOf(id) > -1; }).length; };
  var fmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  var fmtMonth = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" });
  var dateOf = function (c) { return c.dateLabel || fmt.format(new Date(c.date + "T00:00:00Z")); };

  /* ---------- Thème ---------- */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}
  function currentTheme() {
    return root.getAttribute("data-theme") ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  }
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch (e) {}
  }

  /* ---------- Toast + copie ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("#toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false;
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
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { toast("Copié"); }, fallback);
    else fallback();
  }

  /* ---------- En-tête et pied de page ---------- */
  var NAV = [
    ["index.html", "Accueil", "accueil"],
    ["a-propos.html", "À propos", "a-propos"],
    ["competences.html", "Compétences", "competences"],
    ["projets.html", "Projets", "projets"],
    ["certifications.html", "Certifications", "certifications"],
    ["services.html", "Services", "services"],
    ["contact.html", "Contact", "contact"]
  ];
  var page = (document.body && document.body.getAttribute("data-page")) || window.__PAGE || "accueil";
  var activeNav = page === "projet" ? "projets" : page;

  var header = $("#site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="wrap header-in">' +
      '<a class="brand" href="index.html" aria-label="Accueil"><span class="leds" aria-hidden="true"><span class="led bad"></span><span class="led warn"></span><span class="led"></span></span><span>koudousse@kara</span></a>' +
      '<nav class="nav" id="nav" aria-label="Navigation principale">' +
      NAV.map(function (n) { return '<a href="' + n[0] + '"' + (n[2] === activeNav ? ' aria-current="page"' : "") + ">" + n[1] + "</a>"; }).join("") +
      "</nav>" +
      '<button class="icon-btn" id="theme-toggle" type="button" aria-label="Changer de thème" title="Changer de thème"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>' +
      '<button class="icon-btn burger" id="burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
      "</div>";
    $("#theme-toggle").addEventListener("click", function () { setTheme(currentTheme() === "dark" ? "light" : "dark"); });
    var burger = $("#burger"), nav = $("#nav");
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });
  }

  var footer = $("#site-footer");
  if (footer) {
    var P = D.person;
    footer.innerHTML =
      '<div class="wrap foot-grid">' +
      '<div><div class="brand-foot">koudousse@kara</div><p>Cybersécurité, systèmes et réseaux, développement et machine learning. Étudiant en Licence Pro à l\'Université de Kara, Togo.</p></div>' +
      '<div><div class="foot-h">Pages</div><ul>' + NAV.map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + "</a></li>"; }).join("") + "</ul></div>" +
      '<div><div class="foot-h">Contact</div><ul>' +
      '<li><a href="mailto:' + P.email + '">' + P.email + "</a></li>" +
      '<li><a href="tel:' + P.phoneHref + '">' + P.phone + "</a></li>" +
      '<li><a href="' + P.linkedin + '" target="_blank" rel="noopener">LinkedIn</a></li>' +
      '<li><a href="' + P.github + '" target="_blank" rel="noopener">GitHub</a></li></ul></div>' +
      "</div>" +
      '<div class="wrap foot-bottom"><span>© ' + new Date().getFullYear() + " " + P.name + '</span><span class="mono">Fait à la main : HTML, CSS, JavaScript</span></div>';
  }

  /* ---------- Cartes ---------- */
  function cover(p) {
    if (p.image) return '<div class="cover has-img"><img src="' + p.image + '" alt="Capture du projet ' + esc(p.title) + '"></div>';
    return '<div class="cover" aria-hidden="true">' +
      '<span class="cover-codes">' + p.cats.map(function (c) { return domainById[c].code; }).join(" · ") + "</span>" +
      '<span class="cover-type">' + esc(p.type) + "</span>" +
      '<span class="leds"><span class="led bad"></span><span class="led warn"></span><span class="led"></span></span>' +
      "</div>";
  }
  function projectCard(p) {
    return '<a class="project" href="projet.html#' + p.slug + '">' + cover(p) +
      '<div class="project-body">' +
      '<span class="kicker">' + esc(p.kicker) + "</span>" +
      "<h3>" + esc(p.title) + "</h3>" +
      "<p>" + esc(p.summary) + "</p>" +
      '<ul class="chips">' + p.stack.slice(0, 5).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
      '<span class="more">Voir le projet →</span>' +
      "</div></a>";
  }
  function certCard(c) {
    return '<article class="cert" id="' + c.id + '">' +
      '<button class="cert-thumb" type="button" data-cert="' + c.id + '" aria-label="Agrandir : ' + esc(c.title) + '"><img src="' + c.thumb + '" alt="Aperçu du certificat ' + esc(c.title) + '"></button>' +
      '<div class="cert-body"><span class="cert-issuer">' + esc(c.issuer) + "</span>" +
      "<h3>" + esc(c.title) + "</h3>" +
      '<span class="cert-meta">' + esc(dateOf(c)) + " · " + esc(c.detail) + "</span>" +
      '<div class="cert-actions"><button type="button" data-cert="' + c.id + '">Agrandir</button>' +
      '<a href="' + c.pdf + '" target="_blank" rel="noopener">Ouvrir le PDF</a>' +
      (c.verify ? '<a href="' + c.verify + '" target="_blank" rel="noopener">Vérifier en ligne</a>' : "") +
      "</div></div></article>";
  }

  /* ---------- Visionneuse de certificat ---------- */
  var viewer;
  function ensureViewer() {
    if (viewer) return viewer;
    viewer = document.createElement("dialog");
    viewer.className = "viewer";
    viewer.setAttribute("aria-label", "Aperçu du certificat");
    viewer.innerHTML = '<div class="viewer-bar"><strong id="viewer-title"></strong><span class="viewer-actions"><a class="small-btn" id="viewer-pdf" href="#" target="_blank" rel="noopener">Ouvrir le PDF</a><button class="small-btn" id="viewer-close" type="button">Fermer</button></span></div><div class="viewer-img"><img id="viewer-img" alt=""></div>';
    document.body.appendChild(viewer);
    $("#viewer-close").addEventListener("click", function () { viewer.close(); });
    viewer.addEventListener("click", function (e) { if (e.target === viewer) viewer.close(); });
    return viewer;
  }
  function openViewer(id) {
    var c = D.certs.filter(function (x) { return x.id === id; })[0];
    if (!c) return;
    var v = ensureViewer();
    $("#viewer-title").textContent = c.title;
    $("#viewer-img").src = c.full;
    $("#viewer-img").alt = "Certificat : " + c.title;
    $("#viewer-pdf").href = c.pdf;
    if (v.showModal) v.showModal(); else v.setAttribute("open", "");
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-cert]");
    if (b) openViewer(b.getAttribute("data-cert"));
    var cp = e.target.closest("[data-copy]");
    if (cp) copy(cp.getAttribute("data-copy"));
  });

  window.APP = {
    D: D, $: $, $$: $$, esc: esc, plural: plural, domainById: domainById, projectBySlug: projectBySlug,
    certs: certs, countProjects: countProjects, countCerts: countCerts, dateOf: dateOf, fmt: fmt, fmtMonth: fmtMonth,
    toast: toast, copy: copy, setTheme: setTheme, currentTheme: currentTheme,
    projectCard: projectCard, certCard: certCard, cover: cover, openViewer: openViewer
  };
})();
