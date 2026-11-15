# JavaScript validation in a Python-only container

An evidence-based article comparing seven Python-deployable approaches on 107
labeled JavaScript cases, with separate depth probes and HTML extraction checks.

**Read the article:** https://sandeshbagmare.github.io/python-javascript-validation/

For low false alarms with accepted misses, Tree-sitter is a reasonable structural
screen. It is not a complete ECMAScript validity gate. The article includes strict
alternatives, measured misses, popularity/maintenance evidence, and Python examples.

The repository contains the article and its reproducible Linux research workflow,
not an application. Full source cases, adapters and results are embedded in the
article. Submitted JavaScript is parsed, never executed.
