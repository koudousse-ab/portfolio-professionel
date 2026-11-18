/* Terminal interactif du hero.
   Commandes : tape "help". Flèches haut/bas = historique, Tab = complétion, Ctrl+L = effacer. */
(function () {
  "use strict";
  var D = window.PORTFOLIO, A = window.__app;
  if (!D || !A) return;

  var esc = A.esc;
  var screen = document.getElementById("term-screen");
  var out = document.getElementById("term-out");
  var form = document.getElementById("term-form");
  var input = document.getElementById("term-input");
  var quick = document.getElementById("term-quick");

  var history = [], hIdx = 0;
  var SECTIONS = { accueil: "#top", domaines: "#domaines", projets: "#projets", certifications: "#certifications", "a-propos": "#a-propos", apropos: "#a-propos", contact: "#contact" };
  var FILES = ["profil.txt", "contact.txt", "stack.txt"];
  var DIRS = ["projets", "certifications", "domaines"];

  function p(s) { return '<span class="p">' + s + '</span>'; }
  function k(s) { return '<span class="k">' + s + '</span>'; }
  function ok(s) { return '<span class="ok">' + s + '</span>'; }
  function pad(s, n) { s = String(s); while (s.length < n) s += " "; return s; }

  function print(html) {
    var d = document.createElement("div");
    d.className = "tl";
    d.innerHTML = html;
    out.appendChild(d);
  }
  function printLines(arr) { print(arr.join("\n")); }
  function toBottom() { screen.scrollTop = screen.scrollHeight; }

  var codeOf = function (id) { return id.toUpperCase(); };
  function domainCode(id) { for (var i = 0; i < D.domains.length; i++) if (D.domains[i].id === id) return D.domains[i].code; return id; }

  function findProject(q) {
    if (!q) return null;
    var n = parseInt(q, 10);
    if (!isNaN(n) && D.projects[n - 1]) return D.projects[n - 1];
    q = q.toLowerCase();
    for (var i = 0; i < D.projects.length; i++) if (D.projects[i].title.toLowerCase().indexOf(q) > -1) return D.projects[i];
    return null;
  }

  var C = {};

  C.help = { d: "affiche cette aide", run: function () {
    var rows = [
      ["whoami", "qui suis-je"],
      ["cat <fichier>", "profil.txt, contact.txt, stack.txt"],
      ["ls [dossier]", "projets, certifications, domaines"],
      ["projets [sec|net|dev|ml]", "liste (et filtre) les projets"],
      ["projet <n|nom>", "détail d'un projet"],
      ["certifs", "liste des certificats"],
      ["certif <n>", "ouvre l'aperçu d'un certificat"],
      ["skills [sec|net|dev|ml]", "technologies par domaine"],
      ["cd <section>", "aller à une section : projets, contact..."],
      ["contact", "e-mail, téléphone, liens"],
      ["cv", "ouvre mon CV"],
      ["theme [dark|light]", "change le thème"],
      ["neofetch", "résumé du système"],
      ["nmap", "scan (simulé) de ce site"],
      ["history · clear", "historique · effacer l'écran"]
    ];
    print(rows.map(function (r) { return ok(esc(pad(r[0], 26))) + esc(r[1]); }).join("\n"));
  } };

  C.whoami = { d: "", run: function () { print("tchedre-aboudoul-koudouse"); } };

  C.cat = { d: "", run: function (a) {
    var f = (a[0] || "").toLowerCase();
    if (!f) return print("cat : indique un fichier (" + FILES.join(", ") + ")");
    if (f === "profil.txt") {
      return printLines([
        k(pad("nom", 11)) + D.person.name,
        k(pad("formation", 11)) + "Licence Pro Sécurité Informatique & Cybersécurité",
        k(pad("université", 11)) + "Université de Kara, Togo",
        k(pad("domaines", 11)) + "sécurité · systèmes & réseaux · développement · ml",
        k(pad("certifs", 11)) + ok(D.certs.length) + k("   projets ") + ok(D.projects.length)
      ]);
    }
    if (f === "contact.txt") return C.contact.run([]);
    if (f === "stack.txt") return C.skills.run([]);
    if (DIRS.indexOf(f.replace(/\/$/, "")) > -1) return print("cat : " + esc(f) + " est un dossier (essaie ls " + esc(f) + ")");
    print("cat : " + esc(f) + " : fichier introuvable");
  } };

  C.ls = { d: "", run: function (a) {
    var t = (a[0] || "").replace(/\/$/, "").toLowerCase();
    if (!t) return print(DIRS.map(function (x) { return ok(x + "/"); }).concat(FILES).join("  "));
    if (t === "projets") return printLines(D.projects.map(function (x, i) { return k(pad(i + 1, 3)) + x.title; }));
    if (t === "certifications") return printLines(A.certs.map(function (x, i) { return k(pad(i + 1, 3)) + x.title; }));
    if (t === "domaines") return printLines(D.domains.map(function (x) { return k(pad(x.code, 4)) + x.name; }));
    print("ls : impossible d'accéder à '" + esc(t) + "' : aucun fichier ou dossier de ce type");
  } };

  C.projets = { d: "", run: function (a) {
    var f = (a[0] || "").toLowerCase();
    var valid = D.domains.some(function (x) { return x.id === f; });
    if (f && !valid) return print("projets : filtre inconnu. Utilise sec, net, dev ou ml.");
    var rows = [];
    D.projects.forEach(function (x, i) {
      if (!f || x.cats.indexOf(f) > -1) rows.push(k(pad(i + 1, 3)) + pad(x.title, 38) + k(x.cats.map(domainCode).join(" ")));
    });
    printLines(rows.concat([k("Tape « projet &lt;n&gt; » pour le détail.")]));
    A.setFilter(valid ? f : "all");
  } };

  C.projet = { d: "", run: function (a) {
    var x = findProject(a.join(" "));
    if (!x) return print("projet : introuvable. Tape « projets » pour la liste.");
    printLines([
      ok(esc(x.title)) + "  " + k(esc(x.kicker)),
      esc(x.text),
      k("stack ") + x.stack.map(esc).join(", ")
    ]);
  } };

  C.certifs = { d: "", run: function () {
    var rows = A.certs.map(function (x, i) { return k(pad(i + 1, 3)) + pad(x.title.length > 44 ? x.title.slice(0, 43) + "…" : x.title, 46) + k(x.date.slice(0, 7)); });
    printLines(rows.concat([k("Tape « certif &lt;n&gt; » pour l'ouvrir.")]));
  } };

  C.certif = { d: "", run: function (a) {
    var n = parseInt(a[0], 10);
    if (isNaN(n) || !A.certs[n - 1]) return print("certif : numéro invalide (1 à " + A.certs.length + ")");
    print("Ouverture : " + esc(A.certs[n - 1].title));
    A.openViewer(n - 1);
  } };

  C.skills = { d: "", run: function (a) {
    var f = (a[0] || "").toLowerCase();
    var list = D.domains.filter(function (x) { return !f || x.id === f; });
    if (!list.length) return print("skills : domaine inconnu. Utilise sec, net, dev ou ml.");
    printLines(list.map(function (x) { return ok(pad(x.code, 4)) + x.stack.map(esc).join(" · "); }));
  } };

  C.contact = { d: "", run: function () {
    var P = D.person;
    printLines([
      k(pad("e-mail", 10)) + '<a href="mailto:' + P.email + '">' + P.email + '</a>',
      k(pad("téléphone", 10)) + '<a href="tel:' + P.phoneHref + '">' + P.phone + '</a>',
      k(pad("linkedin", 10)) + '<a href="' + P.linkedin + '" target="_blank" rel="noopener">' + P.linkedin.replace("https://www.", "") + '</a>',
      k(pad("github", 10)) + '<a href="' + P.github + '" target="_blank" rel="noopener">' + P.github.replace("https://", "") + '</a>'
    ]);
  } };

  C.cv = { d: "", run: function () {
    print('CV : <a href="' + D.person.cv + '" target="_blank" rel="noopener">ouvrir le PDF</a>');
  } };

  C.cd = { d: "", run: function (a) {
    var t = (a[0] || "").replace(/^[#/]+|\/$/g, "").toLowerCase();
    if (!t || t === "~") t = "accueil";
    var target = SECTIONS[t];
    if (!target) return print("cd : " + esc(t) + " : section inconnue (" + Object.keys(SECTIONS).filter(function (s) { return s !== "apropos"; }).join(", ") + ")");
    var el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    print("→ " + esc(t));
  } };
  C.goto = C.cd;

  C.theme = { d: "", run: function (a) {
    var root = document.documentElement;
    var current = root.getAttribute("data-theme") || (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    var next = a[0] === "dark" || a[0] === "light" ? a[0] : (current === "dark" ? "light" : "dark");
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    print("thème : " + next);
  } };

  C.neofetch = { d: "", run: function () {
    printLines([
      ok("koudousse") + "@" + ok("kara"),
      k(pad("OS", 10)) + "Ubuntu + VM Kali (VirtualBox)",
      k(pad("Shell", 10)) + "bash",
      k(pad("Langages", 10)) + "Python, Java, JavaScript, SQL",
      k(pad("Réseau", 10)) + "Cisco, VLAN, GNS3, Windows Server",
      k(pad("Certifs", 10)) + D.certs.length,
      k(pad("Projets", 10)) + D.projects.length,
      k(pad("Lieu", 10)) + D.person.city
    ]);
  } };

  C.nmap = { d: "", run: function () {
    printLines([
      k("Scan simulé de ce site (aucun réseau n'est touché)"),
      k("PORT      STATE   SERVICE"),
      "22/tcp    " + pad("closed", 8) + "ssh",
      "80/tcp    " + ok(pad("open", 8)) + "http",
      "443/tcp   " + ok(pad("open", 8)) + "https",
      "Site statique : pas de base de données, pas de formulaire, pas de cookie."
    ]);
  } };

  C.sudo = { d: "", run: function () { print("koudousse n'est pas dans le fichier sudoers. Cet incident sera signalé."); } };
  C.rm = { d: "", run: function () { print("rm : opération refusée, ce portfolio est en lecture seule."); } };
  C.date = { d: "", run: function () { print(new Date().toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "medium" })); } };
  C.echo = { d: "", run: function (a) { print(esc(a.join(" "))); } };
  C.history = { d: "", run: function () { printLines(history.map(function (h, i) { return k(pad(i + 1, 4)) + esc(h); })); } };
  C.clear = { d: "", run: function () { out.innerHTML = ""; } };
  C.exit = { d: "", run: function () { print("Impossible de quitter : la session reste ouverte."); } };

  function run(line, silent) {
    var raw = line.trim();
    if (!silent) print(p("$") + " " + esc(line));
    if (!raw) return;
    var parts = raw.split(/\s+/);
    var name = parts[0].toLowerCase();
    var cmd = C[name];
    if (name === "ll") cmd = C.ls;
    if (cmd) cmd.run(parts.slice(1));
    else print("commande introuvable : " + esc(parts[0]) + ". Tape " + ok("help") + ".");
  }

  function submit(line) {
    if (line.trim() && history[history.length - 1] !== line) history.push(line);
    hIdx = history.length;
    run(line);
    toBottom();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value;
    input.value = "";
    submit(v);
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") {
      if (history.length) { e.preventDefault(); hIdx = Math.max(0, hIdx - 1); input.value = history[hIdx] || ""; }
    } else if (e.key === "ArrowDown") {
      e.preventDefault(); hIdx = Math.min(history.length, hIdx + 1); input.value = history[hIdx] || "";
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault(); C.clear.run();
    } else if (e.key === "Tab") {
      e.preventDefault();
      var parts = input.value.split(/\s+/);
      var pool = parts.length === 1 ? Object.keys(C) : parts[0] === "cd" || parts[0] === "goto" ? Object.keys(SECTIONS) : parts[0] === "cat" ? FILES : parts[0] === "ls" ? DIRS : [];
      var cur = parts[parts.length - 1].toLowerCase();
      var m = pool.filter(function (x) { return x.indexOf(cur) === 0; });
      if (m.length === 1) { parts[parts.length - 1] = m[0]; input.value = parts.join(" ") + (parts.length === 1 ? " " : ""); }
      else if (m.length > 1) print(p("$") + " " + esc(input.value) + "\n" + m.join("  "));
      toBottom();
    }
  });

  screen.addEventListener("click", function (e) {
    if (window.getSelection && String(window.getSelection())) return;
    if (e.target.closest("a")) return;
    input.focus({ preventScroll: true });
  });

  quick.innerHTML = ["help", "projets", "certifs", "skills", "contact"].map(function (c) {
    return '<button type="button" data-cmd="' + c + '">' + c + '</button>';
  }).join("");
  quick.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-cmd]");
    if (b) { submit(b.getAttribute("data-cmd")); }
  });

  /* démarrage : deux commandes déjà exécutées, sans voler le focus */
  run("whoami");
  run("cat profil.txt");
  print(k("Tape ") + ok("help") + k(" pour voir les commandes, ou clique sur un raccourci."));
  screen.scrollTop = 0;
})();
