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

export default function () {
  // Test Grafana's official test API
  const res = http.get('https://test.k6.io');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body contains QuickPizza': (r) => r.body.includes('QuickPizza'),
  });

  sleep(1);
}
