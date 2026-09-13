/**
 * Generate a Markdown report with tables and Mermaid charts from k6 summary data.
 * @param {object} data - The data object passed into handleSummary(data)
 * @param {string} profile - The name of the profile run (e.g. 'default' or 'full')
 * @returns {string} Markdown document
 */
export function generateMarkdownReport(data, profile = 'default') {
  const date = new Date().toISOString();
  const metrics = data.metrics || {};

  const reqDuration = metrics.http_req_duration ? metrics.http_req_duration.values : {};
  const reqTotal = metrics.http_reqs ? metrics.http_reqs.values.count : 0;
  const reqRate = metrics.http_reqs ? metrics.http_reqs.values.rate.toFixed(2) : '0';
  const failedRate = metrics.http_req_failed ? (metrics.http_req_failed.values.rate * 100).toFixed(2) : '0';
  const vusMax = metrics.vus_max ? metrics.vus_max.values.value : 0;

  const avgDur = (reqDuration.avg || 0).toFixed(2);
  const minDur = (reqDuration.min || 0).toFixed(2);
  const medDur = (reqDuration.med || 0).toFixed(2);
  const maxDur = (reqDuration.max || 0).toFixed(2);
  const p90Dur = (reqDuration['p(90)'] || 0).toFixed(2);
  const p95Dur = (reqDuration['p(95)'] || 0).toFixed(2);

  // Status check results
  let checksPassed = 0;
  let checksFailed = 0;
  let checksList = '';
  
  if (data.root_group && data.root_group.checks) {
    for (const check of data.root_group.checks) {
      checksPassed += check.passes;
      checksFailed += check.fails;
      const icon = check.fails === 0 ? '✅' : '❌';
      checksList += `- ${icon} **${check.name}**: ${check.passes} passed, ${check.fails} failed\n`;
    }
  }

  return `# 🚀 k6 Load Test Report - Profile: \`${profile.toUpperCase()}\`

> **Run Timestamp:** \`${date}\`  
> **Target Environment:** \`https://test.k6.io\`

---

## 📊 Summary Overview

| Metric | Value |
| :--- | :--- |
| **Profile** | \`${profile}\` |
| **Max VUs** | **${vusMax}** |
| **Total HTTP Requests** | **${reqTotal}** (${reqRate} req/s) |
| **HTTP Error Rate** | **${failedRate}%** |
| **Checks Passed** | **${checksPassed}** |
| **Checks Failed** | **${checksFailed}** |

---

## 📈 Latency Distribution (ms)

| Avg | Min | Median | p(90) | p(95) | Max |
| :---: | :---: | :---: | :---: | :---: | :---: |
| \`${avgDur} ms\` | \`${minDur} ms\` | \`${medDur} ms\` | \`${p90Dur} ms\` | \`${p95Dur} ms\` | \`${maxDur} ms\` |

### Latency Percentiles Chart
\`\`\`mermaid
xychart-beta
    title "HTTP Request Duration Percentiles (ms)"
    x-axis ["Min", "Median", "p(90)", "p(95)", "Max"]
    y-axis "Duration (ms)" 0 --> ${Math.max(Math.ceil(Number(maxDur) * 1.2), 100)}
    bar [${minDur}, ${medDur}, ${p90Dur}, ${p95Dur}, ${maxDur}]
\`\`\`

---

## 🎯 Checks & Assertions

${checksList || '_No checks recorded._'}

---

## 📋 Confluence / Wiki Note
This markdown document can be:
1. Rendered directly in **GitHub / GitLab / Bitbucket / Azure DevOps PRs or Wikis** (Mermaid charts render natively).
2. Imported into **Confluence** via **Insert > Markdown** or using Atlassian's Mermaid macro / Confluence REST API automation.
`;
}
