# Task Tracker AI

A modern, full-stack Task Management application built with the MERN stack (MongoDB, Express, React, Node.js). It features a robust Role-Based Access Control (RBAC) system, an Admin Dashboard, comprehensive activity logging, and a highly responsive glassmorphic UI powered by Tailwind CSS.

---

## 🌟 Features

### 👤 Standard User Features
* **Personal Task Management:** Create, view, update, and delete personal tasks.
* **Task Completion Notes:** Add comprehensive notes when marking a task as completed for better record keeping.
* **Secure Authentication:** JWT-based secure login and registration with password encryption.
* **Isolated Data:** Users can only view and manage their own tasks.

### 🛡️ Admin Features
* **User Management Dashboard:** View all registered users, their roles, and their statuses.
* **Status Toggling:** Instantly activate or deactivate any user account, preventing unauthorized access.
* **Global Task Monitoring:** View every task created across the platform with expanding details.
* **Activity Logs:** Track platform events in real-time including user logins, task creations, updates, and deletions.
* **Platform Analytics:** Overview of total users, total tasks, and completion metrics.
* **God Mode:** Ability to delete any user or task on the platform.

### 🎨 UI/UX Highlights
* **Glassmorphic Design:** Premium, modern interface with frosted glass effects and subtle gradient animations.
* **Responsive Layouts:** Fully functional and beautiful on both mobile and desktop screens.
* **Explicit Interactions:** Persistent action buttons and explicit confirmation modals for all destructive actions to prevent accidental data loss.
* **Automated Session Handling:** Seamlessly kicks out deactivated users and handles expired sessions.

---

## 💻 Tech Stack

**Frontend:**
* React.js (Vite)
* React Router DOM
* Tailwind CSS v4
* Axios (with global interceptors)
* React Icons

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose
* JSON Web Tokens (JWT)
* Bcrypt.js (Password Hashing)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v16 or higher)
* [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
* Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/MJuneja29/Task-Tracker.git
cd Task-Tracker
```

**2. Setup the Backend**
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
npm run dev
```

**3. Setup the Frontend**
Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application should now be running on `http://localhost:5173` (or the port specified by Vite).

---

## 🔑 Accessing the Admin Panel

By default, the system grants **Admin privileges** to the *very first user* who registers on the platform. 

To become an admin:
1. Ensure your MongoDB database is completely empty (no users).
2. Go to the registration page and create a new account.
3. You will automatically be assigned the `Admin` role.
4. Any subsequent users who register will automatically be assigned the standard `User` role.

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
