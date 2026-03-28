# Accessibility Analyzer (SmartAnalyzer)

A comprehensive full-stack MERN application designed to automatically scan web pages for accessibility violations and provide actionable, AI-powered fix suggestions to developers.

## 🚀 Features

- **Automated Accessibility Scanning**: Uses `puppeteer` and `axe-core` to analyze any provided URL for WCAG compliance issues.
- **Detailed Violation Reports**: View in-depth details of each accessibility issue found on the target webpage.
- **AI-Powered Fix Suggestions**: Integrates with Google Generative AI (Gemini) to provide tailored code examples and explanations on how to fix specific violations.
- **Persistent Scan History**: Saves scan results in a MongoDB database so you can revisit past scans using a unique scan ID.

## 🛠️ Tech Stack

### Frontend (smartAnalyzer)
- **Framework**: React 19 + Vite
- **Routing**: React Router DOM
- **Markdown Rendering**: `react-markdown` for displaying AI-generated suggestions and code snippets.
- **Styling**: Standard CSS (with potential Tailwind/Bootstrap based on user preferences).

### Backend (Backend)
- **Environment**: Node.js & Express.js
- **Database**: MongoDB (Mongoose)
- **Accessibility Engine**: `axe-core` & `puppeteer` (headless browser testing)
- **AI Integration**: `@google/generative-ai` (Gemini API)
- **Security & Utils**: `bcryptjs`, `jsonwebtoken`, `cors`, `validator`, `express-rate-limit`

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js**: v18 or higher recommended
- **MongoDB**: Local instance or MongoDB Atlas URI
- **Google Gemini API Key**: Acquired from Google AI Studio

---

## 💻 Installation & Local Setup

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd MyFirstResumeProject
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory and define the following variables:
```env
port=1104
mongo_url=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
```
*(If the backend requires `JWT_SECRET` or other credentials based on the `package.json`, include those as well)*

Start the backend server (Development mode):
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window.
```bash
cd smartAnalyzer
npm install
```

Start the frontend Vite server:
```bash
npm run dev
```

By default, the Vite application will run on `http://localhost:5173`. Make sure the frontend is configured to communicate with the backend running on `http://localhost:1104`.

---

## 📡 API Endpoints

### Scan & Analysis
- **`POST /api/analyse`**: Initiates a new accessibility scan for a given URL.
- **`GET /api/analyse/:scanId`**: Retrieves the stored results of a previous scan.

### AI Assistance
- **`POST /api/ai/example/:scanId/:index`**: Generates AI recommendations and code examples for a specific violation (by index) within a scan report.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📝 License

This project is licensed under the ISC License.
