# 🏛️ Human Capital — Price Index API

A full-stack web application that provides a RESTful API for exploring and analyzing **Human Capital Price Index** data across countries, years, and economic indicators.

---

## 👩‍💻 Developer

**Rutvi Parakhiya**
B.E. Computer Engineering — Swaminarayan University, Ahmedabad
GitHub: [@rutviiparakhiya](https://github.com/rutviiparakhiya)

---

## 🚀 Tech Stack

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs, dotenv, cors, morgan
- express-rate-limit

### Frontend
- React.js + Vite
- Tailwind CSS
- Redux Toolkit
- Axios

---

## 📁 Folder Structure

```
human_capital_project_rutvi_prakhaiya/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route handler logic
│   ├── middlewares/     # Auth, error, rate limiter
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   ├── services/        # Business logic layer
│   ├── .env             # Environment variables
│   ├── server.js        # Express app setup
│   └── index.js         # Server entry point
├── frontend/
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── features/    # Feature modules
│       ├── hooks/       # Custom React hooks
│       ├── pages/       # Application pages
│       ├── services/    # API service layer
│       └── store/       # Redux state management
└── README.md
```

---

## ⚙️ Backend Setup

```bash
# 1. Go to backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Start server
node index.js
```

---

## 🌐 API Base URL

```
http://localhost:5000/api
```

---

## 📡 API Routes Overview

### 🔐 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/change-password` | Change password |
| POST | `/api/auth/forgot-password` | Forgot password |
| POST | `/api/auth/reset-password` | Reset password |
| POST | `/api/auth/send-otp` | Send OTP |
| POST | `/api/auth/verify-otp` | Verify OTP |
| POST | `/api/auth/refresh-token` | Refresh token |

### 💰 Prices — Basic CRUD
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/prices` | Get all prices |
| GET | `/api/prices/:id` | Get price by ID |
| POST | `/api/prices` | Create price |
| PUT | `/api/prices/:id` | Replace price |
| PATCH | `/api/prices/:id` | Update price fields |
| DELETE | `/api/prices/:id` | Delete price |

### 💰 Prices — Filters & Params
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/prices/country/:countryCode` | By country |
| GET | `/api/prices/year/:year` | By year |
| GET | `/api/prices/month/:month` | By month |
| GET | `/api/prices/indicator/:indicator` | By indicator |
| GET | `/api/prices/frequency/:freq` | By frequency |
| GET | `/api/prices/range/:startYear/:endYear` | By year range |
| GET | `/api/prices/country/:countryCode/latest` | Latest by country |
| GET | `/api/prices/country/:countryCode/history` | History by country |
| GET | `/api/prices/year/:year/highest` | Highest in year |
| GET | `/api/prices/year/:year/lowest` | Lowest in year |
| GET | `/api/prices/random` | Random prices |
| GET | `/api/prices/trending` | Trending prices |
| GET | `/api/prices/recent` | Recent prices |
| GET | `/api/prices/latest` | Latest prices |
| GET | `/api/prices/high-value` | High value prices |
| GET | `/api/prices/low-value` | Low value prices |

### 💰 Prices — Query Params
| Param | Example | Description |
|-------|---------|-------------|
| `year` | `?year=2020` | Filter by year |
| `month` | `?month=5` | Filter by month |
| `country` | `?country=IND` | Filter by country |
| `indicator` | `?indicator=FAO_CP_23012` | Filter by indicator |
| `freq` | `?freq=M` | Filter by frequency |
| `minValue` | `?minValue=50` | Min value filter |
| `maxValue` | `?maxValue=100` | Max value filter |
| `search` | `?search=consumer` | Search keyword |
| `page` | `?page=1&limit=10` | Pagination |
| `sort` | `?sort=-value` | Sort (- = desc) |

### 🌍 Countries
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/countries` | Get all countries |
| POST | `/api/countries` | Create country |

### 📈 Indicators
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/indicators` | Get all indicators |
| POST | `/api/indicators` | Create indicator |

### 📅 Months & Years
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/months` | Get all months |
| GET | `/api/years` | Get all years |

### 📊 Statistics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats/prices` | Price statistics |
| GET | `/api/stats/highest-value` | Highest value |
| GET | `/api/stats/lowest-value` | Lowest value |
| GET | `/api/stats/monthly-average` | Monthly averages |
| GET | `/api/stats/yearly-average` | Yearly averages |
| GET | `/api/stats/top-countries` | Top countries |
| GET | `/api/stats/top-indicators` | Top indicators |
| GET | `/api/stats/value-distribution` | Value distribution |
| GET | `/api/stats/records-count` | Total records |
| GET | `/api/stats/trending` | Trending stats |
| GET | `/api/stats/country/:countryCode` | Stats by country |
| GET | `/api/stats/year/:year` | Stats by year |
| GET | `/api/stats/month/:month` | Stats by month |

### 🔍 Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search/country?name=India` | Search by country name |
| GET | `/api/search/indicator?text=Consumer` | Search by indicator |
| GET | `/api/search/value?value=68` | Search by value |
| GET | `/api/search/month?month=1` | Search by month |
| GET | `/api/search/year?year=2020` | Search by year |
| GET | `/api/search/frequency?freq=M` | Search by frequency |
| GET | `/api/search/prices?q=inflation` | General search |

### 🔀 Compare
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/compare?country1=IND&country2=USA` | Compare countries |
| GET | `/api/compare/year?year1=2000&year2=2020` | Compare years |

### 🛡️ Admin (JWT + Admin Role Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/prices` | Admin get prices |
| POST | `/api/admin/prices` | Admin create price |
| PATCH | `/api/admin/prices/:id` | Admin update price |
| DELETE | `/api/admin/prices/:id` | Admin delete price |
| GET | `/api/admin/dashboard` | Admin dashboard |
| GET | `/api/admin/stats` | Admin statistics |

### 🔒 Protected (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/protected/prices` | Protected prices |
| POST | `/api/protected/prices` | Protected create |
| PATCH | `/api/protected/prices/:id` | Protected update |
| DELETE | `/api/protected/prices/:id` | Protected delete |

### 🔑 JWT Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jwt/profile` | JWT profile |
| GET | `/api/jwt/dashboard` | JWT dashboard |
| POST | `/api/jwt/generate-token` | Generate token |
| POST | `/api/jwt/verify-token` | Verify token |
| POST | `/api/jwt/refresh-token` | Refresh token |
| GET | `/api/jwt/admin` | Admin only route |
| GET | `/api/jwt/user` | User only route |
| GET | `/api/jwt/check-role/admin` | Check admin role |
| GET | `/api/jwt/check-role/user` | Check user role |

### 💊 Health & Utility
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |
| GET | `/version` | API version |
| GET | `/metrics` | Server metrics |
| GET | `/server-status` | Server status |

---

## 🔑 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/human_capital
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

---

## 📦 Dependencies

```json
{
  "express": "^4.x",
  "mongoose": "^7.x",
  "jsonwebtoken": "^9.x",
  "bcryptjs": "^2.x",
  "dotenv": "^16.x",
  "cors": "^2.x",
  "morgan": "^1.x",
  "express-rate-limit": "^6.x"
}
```

---

## 🗃️ Dataset

Human Capital Price Index dataset sourced from FAO (Food and Agriculture Organization).

[📥 Download Dataset](https://drive.google.com/file/d/11qaP8A5QpJF7s-wBF0tpAt9GG5rsj35-/view?usp=drive_link)

---
