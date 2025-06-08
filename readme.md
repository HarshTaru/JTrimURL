# 🚀 JTrimURL - URL Shortener

A full-stack modern URL shortener web application with built-in analytics, user authentication, and a responsive dashboard interface.

---

## 🌟 Features

* 🔗 **Shorten URLs** – Instantly generate custom short links.
* 👤 **User Authentication** – Secure registration & login using JWT.
* 📊 **Dashboard Analytics** – Track click metrics over time with charts.
* 🛠️ **Manage Links** – Edit, delete, and view all your URLs in one place.
* 📱 **Responsive UI** – Sleek design using Tailwind CSS and Framer Motion.
* 🔒 **Security First** – Backend protected with JWT, CSRF disabled, and role-based access control.

---

## 🧰 Tech Stack

### Frontend

* [React 19](https://react.dev)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com)
* [Chart.js](https://www.chartjs.org/) – analytics visualization
* [Framer Motion](https://www.framer.com/motion/) – animations

### Backend

* [Spring Boot (Java 17+)](https://spring.io/projects/spring-boot)
* JWT Authentication
* Spring Security
* JPA/Hibernate
* RESTful APIs

### Database

* 💾 MySQL (or any JDBC-compatible DB: PostgreSQL/H2)

---

## 🚀 Getting Started

### ✅ Prerequisites

* Node.js (v18+ recommended)
* Java 17+
* npm or yarn
* MySQL/PostgreSQL/H2 running locally

---

### 📦 Backend Setup (Spring Boot)

```bash
cd urlshortenersb
```

1. **Configure the database**
   Edit `src/main/resources/application.properties` with your DB credentials.

2. **Build & Run**
   Run the Spring Boot app:

   ```bash
   ./mvnw spring-boot:run
   ```

   The backend will be live at: [http://localhost:8080](http://localhost:8080)

---

### 🎨 Frontend Setup (React)

```bash
cd url_shortener_react
```

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set environment variables:**

   Create a `.env` file and set:

   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```

3. **Start the dev server:**

   ```bash
   npm run dev
   ```

   The frontend will be available at: [http://localhost:5173](http://localhost:5173)

---

## 🗂️ Project Structure

```
url-shortener/
├── urlshortenersb/             # Spring Boot backend
│   ├── controller/             # API endpoints
│   ├── service/                # Business logic
│   ├── models/                 # Entity classes
│   ├── repository/             # JPA Repos
│   └── security/               # JWT + Auth config
├── url_shortener_react/        # React frontend
│   ├── Components/             # UI Components
│   ├── utils/                  # Helper functions
│   └── App.jsx                 # Main app
├── .env                        # Frontend environment config
└── README.md
```

---

## 📈 Example Features in Action

* **Analytics Dashboard:** Line chart showing click trends over date range
* **Link Management:** Delete, open, and view analytics in real-time
* **Responsive Design:** Fully optimized for desktop and mobile
