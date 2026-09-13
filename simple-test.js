import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 5 }, // Ramp-up to 5 virtual users over 30s
    { duration: '30s', target: 5 }, // Stay at 5 virtual users for 30s
    { duration: '30s', target: 0 }, // Ramp-down to 0 virtual users over 30s
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2s
  },
};

export default function () {
  // Test Grafana's official test API
  const res = http.get('https://test.k6.io');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body contains QuickPizza': (r) => r.body.includes('QuickPizza'),
  });

  sleep(1);
}
