/* Code propre à chaque page. La page est choisie par <body data-page="...">. */
(function () {
  "use strict";
  var A = window.APP, D = A.D, $ = A.$, esc = A.esc, plural = A.plural;
  var page = (document.body && document.body.getAttribute("data-page")) || window.__PAGE || "accueil";
  var codeOf = function (id) { return A.domainById[id].code; };
  var chips = function (arr) { return '<ul class="chips">' + arr.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>"; };
  var list = function (arr) { return '<ul class="bullets">' + arr.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>"; };

  var R = {};

  /* ============ Accueil ============ */
  R.accueil = function () {
    $("#cv-link").href = D.person.cv;
    $("#port-row").innerHTML = D.domains.map(function (d) {
      return '<a class="port" href="competences.html#' + d.id + '">' +
        '<span class="port-top"><span class="led" aria-hidden="true"></span>' + d.code + "</span>" +
        '<span class="port-name">' + esc(d.name) + "</span>" +
        '<span class="port-meta">' + plural(A.countProjects(d.id), "projet", "projets") + " · " + plural(A.countCerts(d.id), "certificat", "certificats") + "</span></a>";
    }).join("");
    $("#featured-grid").innerHTML = D.projects.filter(function (p) { return p.featured; }).map(A.projectCard).join("");
    $("#recent-certs").innerHTML = A.certs.slice(0, 3).map(A.certCard).join("");
  };

  /* ============ À propos ============ */
  R["a-propos"] = function () {
    var items = [{ when: "En cours", title: "Licence Pro Sécurité Informatique & Cybersécurité", text: "Université de Kara, Togo. Systèmes, réseaux, sécurité et développement." }];
    A.certs.slice().reverse().forEach(function (c) {
      items.push({ when: A.dateOf(c), title: c.title, text: c.issuer });
    });
    $("#timeline").innerHTML = items.map(function (it) {
      return '<li><span class="tl-when">' + esc(it.when) + '</span><div><strong>' + esc(it.title) + "</strong><span>" + esc(it.text) + "</span></div></li>";
    }).join("");
  };

  /* ============ Compétences ============ */
  R.competences = function () {
    $("#skills-body").innerHTML = D.domains.map(function (d) {
      var ps = D.projects.filter(function (p) { return p.cats.indexOf(d.id) > -1; });
      var cs = A.certs.filter(function (c) { return c.cats.indexOf(d.id) > -1; });
      return '<section id="' + d.id + '" class="skill">' +
        '<div class="wrap"><div class="skill-head"><span class="tag">' + d.code + "</span><h2>" + esc(d.name) + "</h2></div>" +
        '<p class="skill-text">' + esc(d.text) + "</p>" +
        '<div class="skill-groups">' + d.groups.map(function (g) {
          return '<div class="group"><h3>' + esc(g.label) + "</h3>" + chips(g.items) + "</div>";
        }).join("") + "</div>" +
        '<div class="skill-links"><div><h3>Projets liés</h3><ul class="plain">' +
        ps.map(function (p) { return '<li><a href="projet.html#' + p.slug + '">' + esc(p.title) + "</a></li>"; }).join("") + "</ul></div>" +
        "<div><h3>Certifications liées</h3>" + (cs.length ? '<ul class="plain">' + cs.map(function (c) { return '<li><a href="certifications.html#' + c.id + '">' + esc(c.title) + "</a></li>"; }).join("") + "</ul>" : '<p class="muted">Aucune pour le moment : ce domaine s\'appuie sur les projets.</p>') + "</div></div>" +
        "</div></section>";
    }).join("");
  };

  /* ============ Projets ============ */
  R.projets = function () {
    var filters = $("#filters"), grid = $("#project-grid");
    function active() { var h = location.hash.replace("#", ""); return A.domainById[h] ? h : "all"; }
    function render() {
      var f = active();
      var pills = [{ id: "all", label: "Tous", n: D.projects.length }].concat(D.domains.map(function (d) { return { id: d.id, label: d.name, n: A.countProjects(d.id) }; }));
      filters.innerHTML = pills.map(function (p) {
        return '<a class="pill" href="#' + p.id + '" aria-pressed="' + (p.id === f) + '">' + esc(p.label) + '<span class="n">' + p.n + "</span></a>";
      }).join("");
      var shown = D.projects.filter(function (p) { return f === "all" || p.cats.indexOf(f) > -1; });
      $("#projects-meta").textContent = plural(shown.length, "réalisation", "réalisations");
      grid.innerHTML = shown.map(A.projectCard).join("");
    }
    window.addEventListener("hashchange", render);
    render();
  };

  /* ============ Détail d'un projet ============ */
  R.projet = function () {
    var body = $("#project-body");
    function render() {
      var slug = location.hash.replace("#", "");
      var idx = -1;
      D.projects.forEach(function (p, i) { if (p.slug === slug) idx = i; });
      if (idx < 0) {
        document.title = "Projet introuvable · " + D.person.name;
        body.innerHTML = '<div class="wrap"><div class="page-hero"><h1>Projet introuvable</h1><p class="lede">Choisis un projet dans la liste.</p><a class="btn primary" href="projets.html">Tous les projets</a></div></div>';
        return;
      }
      var p = D.projects[idx], prev = D.projects[idx - 1], next = D.projects[idx + 1];
      document.title = p.title + " · " + D.person.name;
      var related = A.certs.filter(function (c) { return c.cats.some(function (x) { return p.cats.indexOf(x) > -1; }); }).slice(0, 3);
      var gallery = (p.gallery || []).map(function (src) { return '<img src="' + src + '" alt="Capture du projet ' + esc(p.title) + '">'; }).join("");
      body.innerHTML =
        '<div class="wrap">' +
        '<nav class="crumbs" aria-label="Fil d\'Ariane"><a href="projets.html">Projets</a><span>/</span><span>' + esc(p.title) + "</span></nav>" +
        '<header class="detail-head"><div class="detail-tags">' + p.cats.map(function (c) { return '<span class="tag">' + codeOf(c) + "</span>"; }).join("") + '<span class="kicker">' + esc(p.type) + "</span></div>" +
        "<h1>" + esc(p.title) + '</h1><p class="lede">' + esc(p.kicker) + "</p></header>" +
        '<div class="detail-cover">' + A.cover(p) + "</div>" +
        '<div class="detail-grid"><div class="detail-main">' +
        "<h2>Contexte</h2><p>" + esc(p.context) + "</p>" +
        "<h2>Ce que j'ai réalisé</h2>" + list(p.done) +
        "<h2>Points techniques</h2>" + list(p.tech) +
        (gallery ? '<h2>Captures</h2><div class="gallery">' + gallery + "</div>" : "") +
        '</div><aside class="detail-side">' +
        '<div class="side-card"><h3>Technologies</h3>' + chips(p.stack) + "</div>" +
        (related.length ? '<div class="side-card"><h3>Certifications liées</h3><ul class="plain">' + related.map(function (c) { return '<li><a href="certifications.html#' + c.id + '">' + esc(c.title) + "</a></li>"; }).join("") + "</ul></div>" :
          '<div class="side-card"><h3>Domaine</h3><ul class="plain">' + p.cats.map(function (c) { return '<li><a href="competences.html#' + c + '">' + esc(A.domainById[c].name) + "</a></li>"; }).join("") + "</ul></div>") +
        '<div class="side-card"><h3>Une question sur ce projet ?</h3><p class="muted">Écris-moi, je réponds par e-mail ou par téléphone.</p><a class="btn primary" href="contact.html">Me contacter</a></div>' +
        "</aside></div>" +
        '<nav class="pager" aria-label="Autres projets">' +
        (prev ? '<a href="projet.html#' + prev.slug + '"><span>← Précédent</span><strong>' + esc(prev.title) + "</strong></a>" : "<span></span>") +
        (next ? '<a class="r" href="projet.html#' + next.slug + '"><span>Suivant →</span><strong>' + esc(next.title) + "</strong></a>" : "<span></span>") +
        "</nav></div>";
      window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", render);
    render();
  };

  /* ============ Certifications ============ */
  R.certifications = function () {
    var filters = $("#filters"), grid = $("#cert-grid"), f = "all";
    function render() {
      var pills = [{ id: "all", label: "Toutes", n: D.certs.length }].concat(D.domains.filter(function (d) { return A.countCerts(d.id) > 0; }).map(function (d) { return { id: d.id, label: d.name, n: A.countCerts(d.id) }; }));
      filters.innerHTML = pills.map(function (p) {
        return '<button type="button" class="pill" data-f="' + p.id + '" aria-pressed="' + (p.id === f) + '">' + esc(p.label) + '<span class="n">' + p.n + "</span></button>";
      }).join("");
      var shown = A.certs.filter(function (c) { return f === "all" || c.cats.indexOf(f) > -1; });
      $("#certs-meta").textContent = plural(shown.length, "document", "documents");
      grid.innerHTML = shown.map(A.certCard).join("");
    }
    filters.addEventListener("click", function (e) { var b = e.target.closest(".pill"); if (b) { f = b.getAttribute("data-f"); render(); } });
    render();
    var id = location.hash.replace("#", "");
    if (id && A.certs.some(function (c) { return c.id === id; })) { var el = document.getElementById(id); if (el) el.scrollIntoView({ block: "center" }); }
  };

  /* ============ Services ============ */
  R.services = function () {
    $("#service-grid").innerHTML = D.services.map(function (s) {
      return '<article class="service"><span class="tag">' + s.code + "</span><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p>" + list(s.items) +
        '<div class="refs"><span class="mono">Exemples :</span> ' + s.refs.map(function (r) { return '<a href="projet.html#' + r + '">' + esc(A.projectBySlug[r].title) + "</a>"; }).join(", ") + "</div></article>";
    }).join("");
    $("#steps").innerHTML = D.steps.map(function (st, i) {
      return "<li><span class=\"step-n\">" + (i + 1) + "</span><div><strong>" + esc(st.t) + "</strong><span>" + esc(st.d) + "</span></div></li>";
    }).join("");
  };

  /* ============ Contact ============ */
  R.contact = function () {
    var P = D.person;
    var cards = [
      { label: "E-mail", value: P.email, href: "mailto:" + P.email, copy: P.email, cta: "Écrire" },
      { label: "Téléphone", value: P.phone, href: "tel:" + P.phoneHref, copy: P.phone, cta: "Appeler" },
      { label: "LinkedIn", value: "koudousse-tchedre", href: P.linkedin, cta: "Ouvrir" },
      { label: "GitHub", value: "koudousse-ab", href: P.github, cta: "Ouvrir" }
    ];
    $("#contact-grid").innerHTML = cards.map(function (c) {
      var ext = /^https?:/.test(c.href) ? ' target="_blank" rel="noopener"' : "";
      return '<div class="contact-card"><span class="label">' + c.label + '</span><span class="value">' + esc(c.value) + "</span>" +
        '<span class="row"><a class="small-btn" href="' + c.href + '"' + ext + ">" + c.cta + "</a>" +
        (c.copy ? '<button class="small-btn" type="button" data-copy="' + esc(c.copy) + '">Copier</button>' : "") + "</span></div>";
    }).join("");

    var form = $("#msg-form");
    function build() {
      var n = $("#f-name").value.trim(), s = $("#f-subject").value, m = $("#f-msg").value.trim();
      var body = m + (n ? "\n\n" + n : "");
      return { subject: s + (n ? " · " + n : ""), body: body };
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var b = build();
      if (!$("#f-msg").value.trim()) { A.toast("Écris d'abord ton message"); return; }
      window.location.href = "mailto:" + D.person.email + "?subject=" + encodeURIComponent(b.subject) + "&body=" + encodeURIComponent(b.body);
    });
    $("#f-copy").addEventListener("click", function () {
      var b = build();
      A.copy("À : " + D.person.email + "\nObjet : " + b.subject + "\n\n" + b.body);
    });
  };

  if (R[page]) R[page]();
})();
