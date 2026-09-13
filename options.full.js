export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp-up to 10 virtual users over 30s
    { duration: '30s', target: 10 }, // Stay at 10 virtual users for 30s
    { duration: '30s', target: 0 },  // Ramp-down to 0 virtual users over 30s
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2s
  },
};
