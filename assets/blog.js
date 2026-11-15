"use strict";
(() => {
  const $ = (selector) => document.querySelector(selector);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const theme = $("#theme");
  let stored;
  try { stored = localStorage.getItem("validation-theme"); } catch {}
  function setTheme(value) {
    document.documentElement.dataset.theme = value;
    theme.textContent = value === "dark" ? "Light mode" : "Dark mode";
    theme.setAttribute("aria-label", `Switch to ${value === "dark" ? "light" : "dark"} theme`);
  }
  setTheme(stored || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
  theme.addEventListener("click", () => {
    const value = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(value);
    try { localStorage.setItem("validation-theme", value); } catch {}
  });
  const progress = $(".reading-progress");
  function updateProgress() {
    const range = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${range > 0 ? Math.min(100, scrollY / range * 100) : 0}%`;
  }
  addEventListener("scroll", updateProgress, {passive: true});
  addEventListener("resize", updateProgress);
  updateProgress();
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    if (!visible.length) return;
    const id = visible[0].target.id;
    document.querySelectorAll(".toc nav a").forEach(link => {
      const current = link.hash === `#${id}`;
      link.classList.toggle("active", current);
      if (current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, {rootMargin: "-12% 0px -65% 0px"});
  document.querySelectorAll("main > section").forEach(section => observer.observe(section));

  // Progressive enhancement: code remains selectable if Clipboard API is unavailable.
  document.querySelectorAll("pre").forEach(pre => {
    if (pre.id === "trace-code") return;
    const wrapper = document.createElement("div");
    wrapper.className = "code-wrap";
    pre.before(wrapper); wrapper.append(pre);
    const label = document.createElement("span");
    label.className = "code-label"; label.textContent = "CODE EXAMPLE";
    const button = document.createElement("button");
    button.className = "copy-button"; button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code example");
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(pre.textContent);
        button.textContent = "Copied";
      } catch { button.textContent = "Select & copy"; }
      window.setTimeout(() => { button.textContent = "Copy"; }, 2000);
    });
    wrapper.append(label, button);
  });
  const descriptions = {
    "missing-expression": [
      "Extract only the inline script body. The HTML tags are context, not JavaScript input.",
      "This is a classic script. Set sourceType to \"script\" and ecmaVersion to 2025.",
      "After “=”, the grammar requires an expression. The next token is “;”. Both parsers detect this malformed structure.",
      "Return an invalid-syntax result with the original diagnostic. Ask for a repaired source unit, then validate it again."
    ],
    "duplicate-let": [
      "Two declarations arrive in the same inline script. Keep the block intact so scope relationships are preserved.",
      "Both declarations use the name x in the same scope. JavaScript does not allow two let declarations for the same name there.",
      "Tree-sitter returns a tree without a structural error. Acorn also checks declarations and rejects the duplicate name.",
      "A clean tree did not mean a valid program. This is a recorded Tree-sitter miss, not a rendering or runtime test."
    ],
    "optional-chain": [
      "The ?. operator accesses a property only if its receiver is not null or undefined. The ?? operator supplies a fallback for null or undefined. Both are valid modern JavaScript.",
      "Use the intended language version. An older parser may reject valid syntax before checking anything else.",
      "Acorn and Tree-sitter accept this source. Original Python Esprima 4.0.1 rejects it because its grammar predates these features.",
      "Valid syntax should not be sent back for repair just because a stale parser cannot recognize it. No DOM or runtime assumptions were tested."
    ],
    "script-await": [
      "The illustrative HTML has no type=\"module\" attribute. The extracted source is a classic script.",
      "Top-level await is valid in an ES2025 module, but not in an ordinary script. Select the mode from the HTML type attribute. Trying both and accepting either result would hide a context error.",
      "Acorn rejects this source in Script mode. Tree-sitter does not enforce the same Script/Module early-error distinction.",
      "The fix depends on intent: make the HTML a module or put await in an async function. Changing only the validator's mode would hide the mismatch."
    ],
    "scope-static-block-arrow-arguments": [
      "The complete class is read as source text. It contains an arrow function inside a static initialization block.",
      "JavaScript forbids this arguments reference in a static block. An arrow function has no arguments binding of its own; an ordinary function does.",
      "Acorn 8.19.0 accepts this invalid source. The modern Esprima fork rejects it. This is the one observed Acorn miss in the 607-case corpus.",
      "This is a known limitation of Acorn 8.19.0. Keep the example in your regression tests when changing parser versions."
    ]
  };
  let traces = null, stage = 0, timer = null;
  const stageNames = ["Extract the script body", "Choose the parse context", "Inspect structure and early errors", "Report the recorded outcome"];
  function pause() {
    clearInterval(timer); timer = null;
    $("#play").textContent = "Play walkthrough";
    $("#play").setAttribute("aria-pressed", "false");
  }
  function draw() {
    if (!traces) return;
    const id = $("#example").value, trace = traces[id];
    const code = $("#trace-code");
    code.replaceChildren();
    if (stage === 0) code.textContent = `<script>\n  ${trace.source}\n</script>`;
    else if (stage === 1) code.textContent = `sourceType: "${trace.mode}"\necmaVersion: 2025\n\n${trace.source}`;
    else if (stage === 2 && id === "missing-expression") {
      code.append(document.createTextNode(trace.source.slice(0, -1)));
      const mark = document.createElement("mark"); mark.textContent = ";";
      mark.setAttribute("aria-label", "Unexpected semicolon: missing initializer expression");
      code.append(mark);
    } else code.textContent = trace.source;
    $("#stage-title").textContent = `0${stage + 1} / ${stageNames[stage]}`;
    $("#stage-description").textContent = descriptions[id][stage];
    const verdict = $("#trace-verdict");
    verdict.className = "lab-verdict";
    if (stage < 2) verdict.textContent = "Source is data. No submitted statements are executed.";
    else {
      const acorn = trace.parsers["acorn-v8"], tree = trace.parsers["tree-sitter"];
      verdict.textContent = `Expected: ${trace.expected ? "valid" : "invalid"}\nAcorn: ${acorn.status} · Tree-sitter: ${tree.status}`;
      if (acorn.diagnostic) verdict.textContent += `\nAcorn diagnostic: ${acorn.diagnostic}`;
      if (id === "optional-chain") verdict.textContent += `\nOriginal Esprima: ${trace.parsers.esprima.status}`;
      if (id === "scope-static-block-arrow-arguments") verdict.textContent += `\nModern fork: ${trace.parsers["esprima-fork"].status}`;
      verdict.classList.add(trace.expected ? "valid" : "invalid");
    }
    $("#step-count").textContent = `STEP ${stage + 1} OF 4`;
    $("#step").disabled = stage === 3;
    document.querySelectorAll("[data-stage]").forEach(button => {
      if (+button.dataset.stage === stage) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    const body = $(".lab-body");
    body.classList.remove("stage-enter"); void body.offsetWidth; body.classList.add("stage-enter");
  }
  document.querySelectorAll("[data-stage]").forEach(button => button.addEventListener("click", () => {
    pause(); stage = +button.dataset.stage; draw();
  }));
  $("#example").addEventListener("change", () => { pause(); stage = 0; draw(); });
  $("#step").addEventListener("click", () => { pause(); stage = Math.min(3, stage + 1); draw(); });
  $("#reset").addEventListener("click", () => { pause(); stage = 0; draw(); });
  $("#play").addEventListener("click", () => {
    if (timer) { pause(); return; }
    if (!traces) return;
    if (stage === 3) stage = 0;
    draw();
    if (reduced.matches) { stage = Math.min(3, stage + 1); draw(); return; }
    $("#play").textContent = "Pause";
    $("#play").setAttribute("aria-pressed", "true");
    timer = setInterval(() => {
      stage = Math.min(3, stage + 1); draw();
      if (stage === 3) pause();
    }, 2400);
  });
  function motionPreference() {
    if (reduced.matches) pause();
    $("#motion-note").textContent = reduced.matches
      ? "Reduced motion is enabled. Play advances one stage; automatic playback and transitions are disabled."
      : "Animations start only when you press Play. Every stage is also available as a button.";
  }
  reduced.addEventListener("change", motionPreference); motionPreference();
  document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); });
  fetch("data/traces.json").then(response => {
    if (!response.ok) throw new Error("Trace download failed");
    return response.json();
  }).then(data => { traces = data; draw(); }).catch(() => {
    $("#stage-description").textContent = "The recorded trace could not load. Read the static examples or download the raw evidence below.";
    $("#play").disabled = true; $("#step").disabled = true;
  });

  let corpus = [], results = {}, page = 0;
  const size = 8;
  function outcome(row) {
    if (!["valid", "invalid"].includes(row.status)) return "inconclusive";
    if (row.expected && row.status === "invalid") return "false-reject";
    if (!row.expected && row.status === "valid") return "false-accept";
    return "correct";
  }
  function renderCases() {
    const parser = $("#parser-filter").value;
    if (!results[parser]) return;
    const verdicts = new Map(results[parser].cases.map(row => [row.id, row]));
    const filter = $("#outcome-filter").value, search = $("#case-search").value.trim().toLowerCase();
    const matching = corpus.filter(row => {
      const verdict = verdicts.get(row[0]);
      return verdict && (filter === "all" || outcome(verdict) === filter)
        && (!search || row[0].toLowerCase().includes(search) || row[4].toLowerCase().includes(search));
    });
    const pages = Math.max(1, Math.ceil(matching.length / size));
    page = Math.min(page, pages - 1);
    $("#explorer-status").textContent = `${matching.length} of ${corpus.length} samples match. Original recorded results; no live evaluation.`;
    const list = $("#case-list"); list.replaceChildren();
    for (const row of matching.slice(page * size, page * size + size)) {
      const verdict = verdicts.get(row[0]), category = outcome(verdict);
      const details = document.createElement("details"); details.className = "case-row";
      const summary = document.createElement("summary");
      const id = document.createElement("span"); id.className = "case-id"; id.textContent = `+ ${row[0]}`;
      const badge = document.createElement("span"); badge.className = `badge ${category === "false-reject" ? "false-alarm" : category === "false-accept" ? "miss" : ""}`;
      badge.textContent = {"correct":"Agrees", "false-reject":"False alarm", "false-accept":"Miss", "inconclusive":"Inconclusive"}[category];
      summary.append(id, badge);
      const meta = document.createElement("p"); meta.className = "case-meta";
      meta.textContent = `Goal: ${row[1]} · Expected: ${row[2] ? "valid" : "invalid"} · Recorded: ${verdict.status} · Group: ${row[3]}`;
      const pre = document.createElement("pre"); pre.textContent = row[4] || "// Empty source unit";
      const diagnostic = document.createElement("p"); diagnostic.className = "case-meta";
      diagnostic.textContent = verdict.diagnostic || "No textual diagnostic recorded for this outcome.";
      details.append(summary, meta, pre, diagnostic); list.append(details);
    }
    if (!matching.length) {
      const empty = document.createElement("p"); empty.textContent = "No matching cases. Try another parser, outcome or search."; list.append(empty);
    }
    $("#page-label").textContent = `Page ${page + 1} of ${pages}`;
    $("#previous").disabled = page === 0;
    $("#next").disabled = page >= pages - 1;
  }
  ["#parser-filter", "#outcome-filter", "#case-search"].forEach(selector => $(selector).addEventListener(selector === "#case-search" ? "input" : "change", () => { page = 0; renderCases(); }));
  $("#previous").addEventListener("click", () => { page--; renderCases(); });
  $("#next").addEventListener("click", () => { page++; renderCases(); });
  Promise.all(["data/corpus.json", "data/results.json"].map(url => fetch(url).then(response => {
    if (!response.ok) throw new Error("Evidence download failed"); return response.json();
  }))).then(([sources, recorded]) => { corpus = sources; results = recorded; renderCases(); })
    .catch(() => {
      $("#explorer-status").textContent = "Could not load the explorer. The raw downloads below remain available; retry by reloading the page.";
      $("#previous").disabled = true; $("#next").disabled = true;
    });
})();
