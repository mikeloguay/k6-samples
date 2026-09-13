# 🚀 k6 Load Test Report - Profile: `DEFAULT`

> **Run Timestamp:** `2026-09-13T20:34:59.664Z`  
> **Target Environment:** `https://test.k6.io`

---

## 📊 Summary Overview

| Metric | Value |
| :--- | :--- |
| **Profile** | `default` |
| **Max VUs** | **1** |
| **Total HTTP Requests** | **4** (1.36 req/s) |
| **HTTP Error Rate** | **0.00%** |
| **Checks Passed** | **4** |
| **Checks Failed** | **0** |

---

## 📈 Latency Distribution (ms)

| Avg | Min | Median | p(90) | p(95) | Max |
| :---: | :---: | :---: | :---: | :---: | :---: |
| `92.33 ms` | `16.63 ms` | `75.91 ms` | `179.49 ms` | `190.18 ms` | `200.88 ms` |

### Latency Percentiles Chart
```mermaid
xychart-beta
    title "HTTP Request Duration Percentiles (ms)"
    x-axis ["Min", "Median", "p(90)", "p(95)", "Max"]
    y-axis "Duration (ms)" 0 --> 242
    bar [16.63, 75.91, 179.49, 190.18, 200.88]
```

---

## 🎯 Checks & Assertions

- ✅ **status is 200**: 2 passed, 0 failed
- ✅ **body contains QuickPizza**: 2 passed, 0 failed


---

## 📋 Confluence / Wiki Note
This markdown document can be:
1. Rendered directly in **GitHub / GitLab / Bitbucket / Azure DevOps PRs or Wikis** (Mermaid charts render natively).
2. Imported into **Confluence** via **Insert > Markdown** or using Atlassian's Mermaid macro / Confluence REST API automation.
