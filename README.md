# Human Capital

A full-stack Price Index Dataset Dashboard for exploring, filtering, comparing, and analyzing global price index records.

![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat&logo=react&logoColor=111111)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## Overview

Human Capital is a college full-stack web application built to make a large price index dataset easier to explore and understand. The app provides authenticated access to 190,332+ seeded price records across countries, years, months, and economic indicators. Users can browse and filter records, view summary statistics, compare countries or years, and analyze trends through responsive chart visualizations. The project is designed as a complete MERN-style dashboard with a secure REST API and a polished light-mode user interface.

## Key Features

### Authentication

- User registration and login with JWT-based authentication
- Protected frontend routes for authenticated users
- Profile menu with logout confirmation
- Role-aware access for admin functionality

### Dashboard & Analytics

- Summary stat cards for total records, average value, minimum value, and maximum value
- Interactive charts for top countries and yearly averages
- Detailed statistics page with yearly, monthly, country, and distribution visualizations
- Compact number formatting for large values and readable chart labels

### Data Management

- Browse price records with pagination
- Filter records by country, year, month, and indicator
- Search price data by keyword, country, indicator, value, year, or month
- Compare countries or years side-by-side

### Admin Tools

- Admin dashboard for high-level dataset overview
- Admin routes for managing price data
- API support for create, update, and delete operations

### Backend Quality

- Centralized error handling
- Input validation middleware
- Security hardening with Helmet, rate limiting, sanitization, and CORS
- Swagger API documentation
- Postman collection included for API testing

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, Redux Toolkit, React Router, Axios, Recharts, Lucide React |
| Backend | Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs |
| API & Tooling | Swagger, Postman, dotenv, Helmet, express-rate-limit, express-validator |

## Screenshots

Add screenshots to a `screenshots/` folder and update the image paths if needed.

![Dashboard](./screenshots/dashboard.png)

![Prices and Compare Pages](./screenshots/prices-compare.png)

## Project Structure

```text
human_capital_project_rutvi_prakhaiya/
|-- backend/
|   |-- config/          # Database and Swagger configuration
|   |-- controllers/     # Request handlers
|   |-- middlewares/     # Auth, validation, and error handling
|   |-- models/          # Mongoose schemas
|   |-- routes/          # Express route definitions
|   |-- services/        # Business logic and service helpers
|   |-- data.json        # Source dataset used for seeding
|   |-- seed.js          # Database seeding script
|   `-- index.js         # Backend entry point
|-- frontend/
|   |-- public/          # Static frontend assets
|   |-- src/
|   |   |-- components/  # Reusable UI components
|   |   |-- hooks/       # Custom React hooks
|   |   |-- pages/       # Application pages
|   |   |-- services/    # API service layer
|   |   |-- store/       # Redux Toolkit store and slices
|   |   `-- utils/       # Formatting and chart helpers
|   `-- vite.config.js
`-- README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd human_capital_project_rutvi_prakhaiya
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Create the backend environment file

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/human_capital
JWT_SECRET=replace_with_a_secure_secret
NODE_ENV=development
```

### 4. Seed the database

Make sure MongoDB is running locally, then seed the dataset:

```bash
npm run seed
```

### 5. Run the backend server

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000/api
```

### 6. Install frontend dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 7. Run the frontend

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:5173
```

## API Documentation

Swagger documentation is available after starting the backend server:

```text
http://localhost:5000/api-docs
```

A Postman collection is also included in the backend folder for quick API testing: `backend/postman_collection.json`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate a user and return a JWT |
| `GET` | `/api/prices` | Get paginated and filterable price records |
| `GET` | `/api/stats/prices` | Get overall price statistics |
| `GET` | `/api/stats/top-countries` | Get countries with the highest average values |
| `GET` | `/api/compare?country1=IND&country2=USA` | Compare two countries side-by-side |

## Environment Variables

| Variable | Example Value | Description |
| --- | --- | --- |
| `PORT` | `5000` | Backend server port |
| `MONGODB_URI` | `mongodb://localhost:27017/human_capital` | MongoDB connection string |
| `JWT_SECRET` | `replace_with_a_secure_secret` | Secret key used to sign JWT tokens |
| `NODE_ENV` | `development` | Application environment |

## Available Scripts

### Backend

```bash
npm run dev      # Start backend with nodemon
npm start        # Start backend with Node
npm run seed     # Seed MongoDB with dataset records
```

### Frontend

```bash
npm run dev      # Start Vite development server
npm run build    # Build frontend for production
npm run preview  # Preview production build locally
```

## Roadmap / Future Improvements

- Deploy the frontend and backend to a cloud hosting platform
- Add CSV export for filtered price records
- Add automated unit and integration tests
- Expand comparison tools with more chart types and multi-country selection
- Add saved filters or bookmarked dashboard views for repeated analysis

## Author

**Rutvi Parakhiya**  
B.E. Computer Engineering  
Swaminarayan University  

GitHub: [@your-github-username](https://github.com/your-github-username)

## License

This project was developed as an academic full-stack web application for learning and demonstration purposes.
