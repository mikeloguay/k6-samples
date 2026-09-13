# k6 Load Testing Sample

A simple [Grafana k6](https://k6.io/) load test script with modular configuration profiles targeting Grafana's test API (`https://test.k6.io`).

---

## Profiles

- **`default`** ([options.default.js](file:///home/mikelus/github/k6-samples/options.default.js)):
  - Ramp-up to **5 VUs** in 30s
  - Stay at **5 VUs** for 30s
  - Ramp-down to **0 VUs** in 30s
- **`full`** ([options.full.js](file:///home/mikelus/github/k6-samples/options.full.js)):
  - Ramp-up to **10 VUs** in 30s
  - Stay at **10 VUs** for 30s
  - Ramp-down to **0 VUs** in 30s

---

## Running the Test

### 1. Default Profile (5 users)
Run without extra environment flags (defaults to `default`):
```bash
k6 run simple-test.js
```
Or explicitly:
```bash
k6 run -e PROFILE=default simple-test.js
```

### 2. Full Profile (10 users)
Run with `-e PROFILE=full`:
```bash
k6 run -e PROFILE=full simple-test.js
```

---

## Inspecting Options

You can verify the configuration without running the full test:

```bash
# Inspect default profile (target: 5)
k6 inspect simple-test.js

# Inspect full profile (target: 10)
k6 inspect -e PROFILE=full simple-test.js
```

---

## Docker Usage

```bash
# Default profile
docker run --rm -i -v "$PWD:/work" -w /work grafana/k6 run simple-test.js

# Full profile
docker run --rm -i -v "$PWD:/work" -w /work -e PROFILE=full grafana/k6 run simple-test.js
```

---

## 📊 Automated Reports & Graphics

After every run, k6's `handleSummary` automatically outputs Markdown reports with tables and an embedded **Mermaid latency chart** into the `reports/` folder (ignored by git):

- `reports/report.md` (latest run)
- `reports/report-default.md` or `reports/report-full.md` (profile-specific archive)

### Viewing & Exporting

1. **Confluence / Wikis**:
   - In Confluence, use **Insert > Markdown** (or paste directly).
   - Mermaid diagrams render via the Confluence Mermaid plugin or native Markdown viewer.
2. **GitHub / GitLab / Bitbucket**:
   - Renders directly in pull requests, issues, and wikis with interactive Mermaid charts.

