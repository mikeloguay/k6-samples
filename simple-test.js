import http from 'k6/http';
import { check, sleep } from 'k6';

import { options as defaultOptions } from './options.default.js';
import { options as fullOptions } from './options.full.js';

const profiles = {
  default: defaultOptions,
  full: fullOptions,
};

const profileName = (__ENV.PROFILE || 'default').toLowerCase();
export const options = profiles[profileName] || defaultOptions;

import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { generateMarkdownReport } from './reporter.js';

export default function () {
  // Test Grafana's official test API
  const res = http.get('https://test.k6.io');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body contains QuickPizza': (r) => r.body.includes('QuickPizza'),
  });

  sleep(1);
}

export function handleSummary(data) {
  const reportFilename = `reports/report-${profileName}.md`;
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
    'reports/report.md': generateMarkdownReport(data, profileName),
    [reportFilename]: generateMarkdownReport(data, profileName),
  };
}
