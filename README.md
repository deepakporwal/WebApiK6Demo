# WebApiK6Demo 🚀

A modern ASP.NET Core 8 Web API demo showcasing automated performance and load testing using **Grafana k6**, **Taurus (`bzt`)**, **BlazeMeter**, and **GitHub Actions CI/CD** pipelines.

---

## 📌 Features

- **ASP.NET Core 8 Web API**: Lightweight and fast REST API with Swagger/OpenAPI support.
- **k6 Performance Testing**: JavaScript-based performance scripts simulating virtual users (VUs), assertions, and response checks.
- **BlazeMeter & Taurus (`bzt`) Integration**: Multi-executor performance testing with automated cloud reporting.
- **Automated GitHub Actions CI/CD**: Workflows that build, publish, launch the API, and run performance benchmarks automatically on push or workflow dispatch.

---

## 🏗️ Project Architecture & Structure

```text
WebApiK6Demo/
├── .github/
│   └── workflows/
│       ├── main.yml             # Builds API, starts service, and runs k6 tests
│       ├── performance.yml      # Runs Taurus (bzt) performance pipeline
│       └── test.yml             # Executes BlazeMeter cloud tests via GitHub Action
├── WebApiK6Demo/
│   ├── Controllers/
│   │   └── WeatherForecastController.cs   # Sample weather forecast controller
│   ├── perfomance/
│   │   ├── loadtest.js          # k6 load testing script
│   │   └── test.yml             # Taurus (bzt) configuration for BlazeMeter
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── Program.cs               # Application bootstrap & minimal API routes
│   ├── WeatherForecast.cs       # Data model
│   ├── appsettings.json         # Configuration
│   ├── WebApiK6Demo.csproj      # .NET 8 project file
│   └── WebApiK6Demo.http        # HTTP request file for testing
├── WebApiK6Demo.slnx            # Solution file
└── README.md
```

---

## 🌐 API Endpoints

| Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Root endpoint returning `"App is running!"` |
| `GET` | `/health` | Health check endpoint returning `"Healthy!"` |
| `GET` | `/hello` | Greeting endpoint returning `"Hello from banking api!"` |
| `GET` | `/WeatherForecast` | Returns a 5-day random weather forecast array |
| `GET` | `/swagger` | Interactive Swagger UI (*Development environment only*) |

---

## 🚀 Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Grafana k6](https://k6.io/docs/get-started/installation/)
- [Python 3.x](https://www.python.org/) (optional, required if using Taurus `bzt`)

### 1. Clone the Repository

```bash
git clone https://github.com/deepakporwal/WebApiK6Demo.git
cd WebApiK6Demo
```

### 2. Build & Run the API

```bash
# Restore dependencies
dotnet restore

# Build project
dotnet build

# Run the Web API
dotnet run --project WebApiK6Demo
```

The API will start and listen on configured HTTP/HTTPS ports (e.g., `https://localhost:7000` / `http://localhost:5000`).

---

## ⚡ Performance Testing

### Running k6 Tests Locally

Execute the k6 script directly against your running application or target endpoint:

```bash
k6 run WebApiK6Demo/perfomance/loadtest.js
```

Sample test configuration (`loadtest.js`):
```javascript
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 2,          // Virtual Users
    duration: '30s', // Test Duration
};

export default function () {
    let response = http.get('https://localhost:7000/health');

    check(response, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);
}
```

### Running with Taurus (`bzt`) & BlazeMeter

```bash
pip install bzt
bzt WebApiK6Demo/perfomance/test.yml
```

---

## 🔄 CI/CD Workflows

This repository contains three GitHub Actions workflows in `.github/workflows/`:

1. **`main.yml` (Performance Test)**:
   - Sets up .NET 8.
   - Restores, builds, and publishes the API in Release mode.
   - Starts the API as a background process.
   - Installs k6 and executes `loadtest.js`.

2. **`performance.yml` (Taurus Pipeline)**:
   - Sets up Python, installs `bzt` and `k6`.
   - Runs `bzt test.yml` for automated test orchestrations.

3. **`test.yml` (BlazeMeter Test)**:
   - Integrates with BlazeMeter using `BlazeRunner-BZR/Github-Action@v8.1`.
   - Requires the following GitHub Repository Secrets:
     - `BLAZEMETER_API_KEY`
     - `BLAZEMETER_API_SECRET`
     - `BLAZEMETER_TEST_ID`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
