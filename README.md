# JavaScript validation in a Python-only container

An evidence-based article comparing seven Python-deployable approaches on **607
labeled JavaScript cases**, including 500 distinct official Test262 files.
Separate checks cover depth, input size, startup, worker memory and HTML boundaries.

**Read the article:** https://sandeshbagmare.github.io/python-javascript-validation/

The developer blog includes light/dark themes, recorded animated walkthroughs,
a searchable 607-case explorer, exact parser diagnostics, copyable Python code,
and a [downloadable PDF report](https://sandeshbagmare.github.io/python-javascript-validation/downloads/javascript-validation-report.pdf).
The full static research record remains in `evidence.html`.

The expanded study favors **Acorn hosted through Python** for the overall balance
of low false alarms, useful invalid detection and established parser adoption.
The modern Esprima fork leads this corpus's strict accuracy but has limited
adoption. Tree-sitter remains an advisory structural screen.

The repository contains the article, supporting evidence files under `data/`,
and its reproducible Linux research workflow—not an application.
Test262 provenance and license are retained. Submitted JavaScript is parsed,
never executed. No production false-positive rate or full conformance is claimed.
