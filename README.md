# k6 Load Testing Sample

A simple [Grafana k6](https://k6.io/) load test script demonstrating:
- A 30s ramp-up to 5 virtual users (VUs)
- A 30s steady load at 5 VUs
- A 30s ramp-down to 0 VUs
- Requests against Grafana's official public testing endpoint: `https://test.k6.io`

---

## Prerequisites

Install k6 if you haven't already:

### Linux (Debian/Ubuntu)
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### macOS (Homebrew)
```bash
brew install k6
```

### Docker
If you prefer not to install it locally:
```bash
docker run --rm -i grafana/k6 run - <simple-test.js
```

---

## Running the Test

Run the script locally using the `k6 run` command:

```bash
k6 run simple-test.js
```

### Optional Flags
- Run with custom duration / override stages:
  ```bash
  k6 run --vus 5 --duration 30s simple-test.js
  ```
- Output results to a JSON file:
  ```bash
  k6 run --out json=results.json simple-test.js
  ```
