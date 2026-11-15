> Publication note: maintenance statistics below are the refreshed source snapshot. Its historical 107-case performance section predates the expanded study; use [results.json](results.json) and the article for the final 607-case results.

# Expanded maintenance and popularity evidence

**Independently refreshed 2026-11-15, 11:55:48–11:56:35 UTC.** Every API request cited in the tables returned HTTP 200. This report supplements the expanded comparison; it does not claim that a >500-case run has finished. At inspection, the available `research/linux-results/results-*.json` files still described **107 cases**, timestamped 2026-11-15T11:19:45–11:19:56 UTC.

**Decision principle: minimize false rejects first.** Maintenance and adoption help choose among candidates meeting that requirement; they cannot override measured rejection of valid JavaScript. Core popularity is not wrapper popularity, and wrapper downloads are not parser correctness.

## 1. Primary repository evidence

Each repository link is the exact GitHub API queried. Counts are raw `stargazers_count`, `forks_count`, and `open_issues_count`. The latter **includes pull requests**; it is not an issue-response-time measure. `pushed_at` may include non-code changes. All repositories returned `archived: false`; this is not a promise of continuing maintenance.

| Component / primary API | Stars | Forks | Open issues + PRs | Archived | `pushed_at` UTC |
|---|---:|---:|---:|---|---|
| [Tree-sitter core](https://api.github.com/repos/tree-sitter/tree-sitter) | 27,465 | 3,038 | 117 | false | 2026-11-15T05:18:59Z |
| [Python bindings](https://api.github.com/repos/tree-sitter/py-tree-sitter) | 1,522 | 206 | 8 | false | 2026-11-13T12:23:26Z |
| [JavaScript grammar](https://api.github.com/repos/tree-sitter/tree-sitter-javascript) | 498 | 207 | 30 | false | 2026-09-17T19:46:10Z |
| [Original Python Esprima](https://api.github.com/repos/Kronuz/esprima-python) | 265 | 47 | 7 | false | 2023-03-01T17:25:45Z |
| [`esprima-fork`](https://api.github.com/repos/0o120/esprima-python) | 0 | 0 | 0 | false | 2026-10-14T18:35:05Z |
| [`esprima2`](https://api.github.com/repos/s0md3v/esprima2) | 73 | 14 | 0 | false | 2026-08-27T13:03:34Z |
| [Acorn](https://api.github.com/repos/acornjs/acorn) | 11,476 | 1,063 | 16 | false | 2026-11-09T08:44:11Z |
| [Oxc core](https://api.github.com/repos/oxc-project/oxc) | 23,454 | 1,466 | 1,279 | false | 2026-11-15T11:08:00Z |
| [`oxc-python` wrapper](https://api.github.com/repos/tylersatre/oxc-python) | 0 | 0 | 0 | false | 2025-11-23T17:21:24Z |
| [QuickJS-NG engine](https://api.github.com/repos/quickjs-ng/quickjs) | 4,152 | 447 | 231 | false | 2026-11-13T20:33:18Z |
| [`quickjs-ng` Python wrapper](https://api.github.com/repos/genotrance/quickjs-ng) | 10 | 5 | 1 | false | 2026-11-05T01:10:29Z |
| [`mini-racer` wrapper](https://api.github.com/repos/bpcreech/PyMiniRacer) | 219 | 16 | 14 | false | 2026-02-02T02:49:52Z |

Repository retrieval timestamps ranged from `2026-11-15T11:55:48.736Z` to `2026-11-15T11:55:49.085Z`. GitHub HTTP `Date` was `Sun, 15 Nov 2026 11:55:49 GMT`, except the cached Acorn response (`11:55:30 GMT`). The independently refreshed numeric values agree with `popularity.md`; agreement is observed, not assumed.

### Releases and cadence

These links are the exact `/releases?per_page=5` calls, also refreshed at 11:55:48–49 UTC. They are five-record samples, **not complete release histories**. Empty GitHub release lists do not mean a package has never released.

| Component | Observed GitHub releases / source | Interpretation |
|---|---|---|
| Tree-sitter core | [v0.27.2: 2026-11-07T11:03:47Z; v0.27.1: October 8; v0.27.0: August 30](https://api.github.com/repos/tree-sitter/tree-sitter/releases?per_page=5) | Active stable releases; `nightly` on November 15 is explicitly prerelease and excluded from stable-version claims. |
| Python bindings | [v0.26.1: 2026-11-09T15:18:11Z; v0.26.0: June 30; v0.25.2: September 25, 2025](https://api.github.com/repos/tree-sitter/py-tree-sitter/releases?per_page=5) | Active, but not lockstep with core numbering. |
| JS grammar | [v0.25.0: 2025-09-01T07:12:00Z; v0.23.1: November 10, 2024](https://api.github.com/repos/tree-sitter/tree-sitter-javascript/releases?per_page=5) | Shipped grammar is older than the repository push. |
| Original Esprima | [Empty list](https://api.github.com/repos/Kronuz/esprima-python/releases?per_page=5) | Use PyPI history below. |
| esprima-fork | [Empty list](https://api.github.com/repos/0o120/esprima-python/releases?per_page=5) | PyPI 5.0.0 follows 4.0.4 (2022-10-25), almost a four-year gap. |
| esprima2 | [v6.0.0: 2026-04-22T01:08:43Z; v5.0.2: April 21; v5.0.1: August 17, 2025](https://api.github.com/repos/s0md3v/esprima2/releases?per_page=5) | Recent development, intermittent release cadence. |
| Acorn | [Empty list](https://api.github.com/repos/acornjs/acorn/releases?per_page=5) | npm publishes 8.16.0 on February 19, 8.17.0 June 11, 8.18.0 July 28, 8.19.0 October 5, 2026. |
| Oxc core | [crates_v0.158.0: 2026-11-09T11:13:17Z; oxlint/oxfmt releases on November 6 and 9](https://api.github.com/repos/oxc-project/oxc/releases?per_page=5) | Very active monorepo. Linter/formatter version numbers are not parser or Python-wrapper versions. |
| oxc-python | [v0.1.1: 2025-11-23T17:21:24Z; v0.1.0: November 22](https://api.github.com/repos/tylersatre/oxc-python/releases?per_page=5) | Two releases on adjacent days, no subsequent release observed. |
| QuickJS-NG engine | [v0.18.0: 2026-11-01T09:53:09Z; v0.17.0: September 18; v0.16.2: August 20](https://api.github.com/repos/quickjs-ng/quickjs/releases?per_page=5) | Continuing engine releases. |
| quickjs-ng wrapper | [Empty list](https://api.github.com/repos/genotrance/quickjs-ng/releases?per_page=5) | PyPI releases July 1, August 1, September 1, October 1/22, November 5, 2026 demonstrate recent wrapper maintenance. |
| mini-racer | [v0.14.1: 2026-02-01T05:52:35Z; v0.14.0: January 5; v0.13.2: December 26, 2025](https://api.github.com/repos/bpcreech/PyMiniRacer/releases?per_page=5) | Release burst followed by roughly nine months without a new published version. |

No issue response-time or maintainer-count estimate was measured. A zero backlog on a tiny repository is not evidence of superior support, nor is Oxc's larger backlog evidence of inferior support.

## 2. Exact distribution releases and monthly downloads

PyPI links establish distribution identity and repository mapping via `info.project_urls`. Version is `info.version`; upload time below is the first artifact for that version. All PyPI and PyPI Stats responses were retrieved between `2026-11-15T11:56:13.434Z` and `2026-11-15T11:56:13.895Z`.

| Distribution / primary release API | Latest version | First artifact upload, UTC | Monthly downloads / statistics API |
|---|---|---|---:|
| [tree-sitter](https://pypi.org/pypi/tree-sitter/json) | 0.26.1 | 2026-11-09T15:17:17.299753Z | [48,642,917](https://pypistats.org/api/packages/tree-sitter/recent) |
| [tree-sitter-javascript](https://pypi.org/pypi/tree-sitter-javascript/json) | 0.25.0 | 2025-09-01T07:13:36.865602Z | [16,220,142](https://pypistats.org/api/packages/tree-sitter-javascript/recent) |
| [esprima](https://pypi.org/pypi/esprima/json) | 4.0.1 | 2018-08-24T13:59:11.374013Z | [1,514,617](https://pypistats.org/api/packages/esprima/recent) |
| [esprima-fork](https://pypi.org/pypi/esprima-fork/json) | **5.0.0** | 2026-10-13T20:19:45.569704Z | [129](https://pypistats.org/api/packages/esprima-fork/recent) |
| [esprima2](https://pypi.org/pypi/esprima2/json) | 6.0.0 | 2026-04-22T01:09:17.918697Z | [21,741](https://pypistats.org/api/packages/esprima2/recent) |
| [oxc-python](https://pypi.org/pypi/oxc-python/json) | 0.1.1 | 2025-11-23T17:23:39.968144Z | [49](https://pypistats.org/api/packages/oxc-python/recent) |
| [quickjs-ng](https://pypi.org/pypi/quickjs-ng/json) | 0.18.0.1 | 2026-11-05T01:07:32.996521Z | [553,556](https://pypistats.org/api/packages/quickjs-ng/recent) |
| [mini-racer](https://pypi.org/pypi/mini-racer/json) | 0.14.1 | 2026-02-01T05:53:03.998844Z | [2,293,645](https://pypistats.org/api/packages/mini-racer/recent) |
| [Acorn, npm](https://registry.npmjs.org/acorn) | **8.19.0** | 2026-10-05T12:51:20.979Z | [1,297,676,177](https://api.npmjs.org/downloads/point/last-month/acorn) |

**Source quality and windows:** GitHub/PyPI/npm metadata are primary registry/repository APIs. npm's download endpoint is primary npm evidence. **PyPI Stats is a third-party aggregation service, not a primary PyPI download API**; retain this distinction when citing the table. Its `data.last_month` label has no explicit start/end in these responses. npm explicitly returns **2026-10-16 through 2026-11-14**; do not present the two services as identically defined calendar-month windows. Downloads cover all versions and include automation/transitive installation; they do not count unique users, latest-version adoption, or validation workloads. No separate core-engine download total was measured: do not assign wrapper totals to Tree-sitter core, Oxc core, QuickJS-NG core, or V8.

### Raw download response provenance

These are the exact JSON response bodies (whitespace normalized only); endpoints are the linked statistics URLs above. npm retrieved at `2026-11-15T11:56:29.236Z`; registry metadata retrieved at `2026-11-15T11:56:35.630Z`.

```json
{"data":{"last_day":1299179,"last_month":48642917,"last_week":11877684},"package":"tree-sitter","type":"recent_downloads"}
{"data":{"last_day":426530,"last_month":16220142,"last_week":4296385},"package":"tree-sitter-javascript","type":"recent_downloads"}
{"data":{"last_day":36688,"last_month":1514617,"last_week":409967},"package":"esprima","type":"recent_downloads"}
{"data":{"last_day":24,"last_month":129,"last_week":43},"package":"esprima-fork","type":"recent_downloads"}
{"data":{"last_day":120,"last_month":21741,"last_week":6460},"package":"esprima2","type":"recent_downloads"}
{"data":{"last_day":0,"last_month":49,"last_week":9},"package":"oxc-python","type":"recent_downloads"}
{"data":{"last_day":18663,"last_month":553556,"last_week":172136},"package":"quickjs-ng","type":"recent_downloads"}
{"data":{"last_day":60253,"last_month":2293645,"last_week":620197},"package":"mini-racer","type":"recent_downloads"}
{"downloads":1297676177,"start":"2026-10-16","end":"2026-11-14","package":"acorn"}
```

The Acorn registry returned `dist-tags.latest: "8.19.0"`, license `MIT`, tarball `https://registry.npmjs.org/acorn/-/acorn-8.19.0.tgz`, and `dist.integrity`:

```text
sha512-oJlA3XiRm7Cyk6qFD2Jn8ak9B7jSy0qy00ADO3+8dpT0LSjFihQYv4C02LFCSYJV3Q37xYwwRy5m+IpIiUzqWw==
```

This is provenance for the registry artifact, not a claim that the local `research/acorn.js` was independently rehashed in this task.

## 3. Platform, integration and supply-chain assessment

Wheel coverage below is inferred from the **actual latest-release `urls[].filename` lists**, not merely project classifiers. Availability is not proof that a native binary imports under the user's OS security policy. All latest-version artifacts inspected returned `yanked: false`. No packages were installed for this research.

| Candidate | Packaging/platform evidence | Maintenance and integration consequence |
|---|---|---|
| Tree-sitter | Bindings require Python >=3.10; CPython 3.10–3.14 wheels include Windows x64/ARM64, macOS Intel/ARM64, Linux x64/ARM64/RISC-V and musl x64. Grammar has `cp310-abi3` wheels for Windows x64/ARM64, macOS Intel/ARM64, Linux/musl x64/ARM64. | Three versioned components: core, Python bindings, grammar. Latest core version must not be assumed to be the bundled bindings' core. Grammar's older release may lag repo fixes. Native build/ABI compatibility matters. |
| Original Esprima | Latest PyPI release supplies only an sdist; empty `requires_python`. | Python parser avoids a native JS runtime, but an sdist requires a build/install path. Empty Python constraint is not proof of support for every Python. Stale syntax support matters more than its substantial legacy traffic. |
| esprima-fork 5.0.0 | Python >=3.11; `py3-none-any` wheel and sdist. Runtime dependency list has only optional development extras. | Easy pure-Python deployment, but minimal observed adoption and the four-year release gap raise continuity/regression-discovery uncertainty. Recently released is not the same as long-tested. |
| esprima2 6.0.0 | Python >=3.10; `py3-none-any` wheel and sdist; `requires_dist: null`. | Pure-Python portability with more adoption than the fork, but a comparatively small ecosystem. It and the other Esprima distributions use the `esprima` import namespace in the current experiment: isolate them to avoid testing the wrong installed distribution. |
| Acorn 8.19.0 | JavaScript/npm artifact, not a Python distribution. | Track/hash the vendored parser independently of its runtime host. Parser upgrades and QuickJS/V8 wrapper upgrades are separate maintenance operations. Using an embedded engine does not require a Node executable, but does add a native engine dependency. |
| oxc-python 0.1.1 | Python >=3.10; `cp310-abi3` wheels for macOS universal2, Linux x64/ARM64, Windows x64; no musl or Windows ARM64 wheel listed. | Native Rust wrapper; fallback source builds need the native toolchain. Tiny wrapper adoption and almost a year without release outweigh the reassuring core stars when assessing wrapper continuity. No claim that this wrapper embeds current Oxc 0.158.0. |
| quickjs-ng 0.18.0.1 | Python >=3.10,<4; CPython `abi3` wheels for Windows x86/x64, macOS ARM64, Linux and musl x86/x64/ARM64; additional PyPy wheels. No macOS Intel or Windows ARM64 wheel listed. | Regular 2026 wrapper releases and meaningful downloads despite only 10 stars. Native engine supply chain and target-platform gaps still matter. Version resemblance to engine 0.18.0 is not an independent source audit of the bundled engine. |
| mini-racer 0.14.1 | Python >=3.10; `py3-none-<platform>` wheels for Windows x64/ARM64, macOS Intel/ARM64, Linux/musl x64/ARM64. | `py3-none` does **not** mean platform-independent: wheels bundle native V8. Larger wrapper traffic than quickjs-ng, but less recent updates. V8's upstream activity cannot establish the age/security status of the bundled V8 build. |

Licenses: GitHub detects MIT for Tree-sitter's three repos, Oxc core/wrapper and QuickJS-NG engine/wrapper; ISC for mini-racer; `NOASSERTION` for the three Esprima repos; null for Acorn. PyPI declares BSD License for original Esprima, `BSD-2-Clause AND Unicode-3.0` for esprima-fork, BSD-2-Clause for esprima2, and ISC for mini-racer. npm declares Acorn MIT. Missing classification is not absence of a license, and these declarations do not audit bundled dependencies' notices.

**Supply-chain interpretation:** pin distributions and parser assets separately; retain registry hashes and licenses; verify the exact wheel on the deployment platform. Small adoption is uncertainty, not evidence of maliciousness. No maintainer compromise, vulnerability absence, artifact reproducibility, signing-chain validation, or trusted-publisher attestation was established here. Do not turn popularity into any of those claims.

**Validator integration:** Tree-sitter is error-recovering and needs explicit error/missing-node inspection; even a clean tree does not prove ECMAScript early-error validity. An Oxc parser wrapper may expose less checking than Oxc's broader semantic toolchain. For Acorn hosted by QuickJS or MiniRacer, execute the trusted parser and pass the candidate source as data; evaluating the candidate itself is not a syntax-only check. Runtime-host popularity therefore concerns deployment and maintenance, not a second independent parsing algorithm.

## 4. Outcomes available at review time and false-reject-first rubric

The refreshed maintenance evidence must accompany, not replace, the final expanded results. The currently available Linux files cover **52 valid and 55 invalid labels (107 total)**:

| Measured route | False rejects (valid rejected) | False accepts (invalid accepted) |
|---|---:|---:|
| Tree-sitter 0.26.1 + JS grammar 0.25.0 | 0 | 49 |
| Original Esprima 4.0.1 | 18 | 12 |
| esprima-fork 5.0.0 | 0 | 0 |
| esprima2 6.0.0 | 0 | 14 |
| oxc-python 0.1.1 | 0 | 37 |
| Acorn 8.19.0 + quickjs-ng 0.18.0.1 | 0 | 1 |
| Acorn 8.19.0 + mini-racer 0.14.1 | 0 | 1 |

Source: respective `research/linux-results/results-*.json`, rather than stale Windows files or the earlier 82-case summary. The Acorn miss is `scope-static-block-arrow-arguments` on both hosts. These are curated-case counts, not production probabilities; the expanded run may change them. No >500-sample figures are invented here.

Use this **ordered rubric**, not an additive stars score:

1. **Define the contract and classify outcomes correctly.** Match ECMAScript edition, script/module mode, HTML script extraction, and supported syntax. Import failures, crashes, resource limits and unavailable platforms are separate from syntax rejections. For the user's low-false-alarm policy, an infrastructure failure should not become “invalid JavaScript.”
2. **Minimize false rejects first on the expanded valid cases.** Report count/denominator, affected feature families and representative failures. Separate unique semantic cases from generated variants; >500 related samples are not 500 independent conformance claims. A high-star package that rejects required valid syntax fails this priority.
3. **Among similarly low-false-reject routes, prefer useful invalid detection.** Some misses are acceptable to this user, but accepting everything would trivially yield zero false rejects. Zero false rejects alone does not distinguish Tree-sitter from the other five zero-reject routes in the present corpus.
4. **Then assess actual deployment and reliability:** target OS/architecture/Python support, native import policy, crash behavior, bounds on processing, diagnostics, and measured cold/warm latency and memory. This research does not supply new performance measurements.
5. **Then use maintenance/adoption as risk tie-breakers:** exact wrapper release cadence, shipped parser/grammar age, sustainable upstream, dependency layers, license obligations, and observed community scrutiny. Stars, forks and downloads are corroborating evidence, never validity evidence.

**Conditional recommendation for the final comparison:** If the expanded run preserves similarly low false rejects, Acorn offers a strong maintenance/adoption case while retaining substantially more invalid detection than the current Tree-sitter route. Choose its host on verified platform availability and measured operational behavior: QuickJS-NG has fresher wrapper releases; MiniRacer has broader listed macOS/Windows ARM coverage and higher wrapper downloads. Neither host makes Acorn an independent second parser.

Tree-sitter remains reasonable as an advisory structural screen when permissive handling and its parsing ecosystem are desired, but this evidence does not establish a unique false-reject advantage. The fork is a serious pure-Python candidate if its expanded results remain strong; its observed correctness deserves credit despite zero stars, with maintenance uncertainty disclosed. esprima2 is a portable compromise whose misses need explicit acceptance. Current original Esprima outcomes conflict with the user's modern-JavaScript false-reject priority. Oxc core deserves attention, but the measured Python wrapper's release staleness and exposed checking must be judged on their own.
