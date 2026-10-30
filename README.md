# StaffSync – HR Management System

A full-stack Human Resource Management System built using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. StaffSync simplifies employee management, attendance tracking, leave management, announcements, and training activities through role-based dashboards.
---

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://staff-sync-k4e7.onrender.com/)

## Live Demo

[Click here to view StaffSync](https://staff-sync-k4e7.onrender.com/)

----

## 🚀 Project Overview

StaffSync is designed to centralize HR operations and improve communication between employees, managers, and HR personnel.

The application provides dedicated dashboards and permissions based on user roles, making everyday workforce management easier and more organized.

## ✨ Key Features

### 1. Role-Based Access Control
- **HR:** Manage employees, monitor attendance, review leave requests, and publish announcements.
- **Manager:** Review team leave requests and manage training and development.
- **Employee:** Manage personal information, apply for leave, mark attendance, and view announcements.

### 2. Employee Management
- Add, view, update, and delete employee records.
- Maintain employee details and department information.
- Manage employee information from the HR dashboard.

### 3. Attendance Management
- Employee check-in and check-out.
- Track daily attendance records.
- View attendance history.
- HR attendance monitoring.

### 4. Leave Management
- Submit leave applications.
- Track leave request status.
- Approve or reject leave requests.
- Manager and HR leave management.

### 5. Announcements
- Publish organizational announcements.
- Share important updates with employees.
- View company announcements.

### 6. Training & Development
- Manage training programs.
- Support employee learning and development.
- Provide training-related information to relevant users.

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, JavaScript, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JSON Web Token (JWT) |
| API | REST API |
| Version Control | Git and GitHub |

## 📂 Project Structure

```text
StaffSync/
│
├── client/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── src/
│   ├── server.js
│   └── package.json
│
├── docs/
│   ├── 01_Technical_Architecture.docx
│   ├── 02_ER_Diagram.docx
│   ├── 03_Project_Description.docx
│   ├── 04_Roles_and_Responsibilities.docx
│   ├── 05_User_Flow.docx
│   └── 06_MVC_Architecture.docx
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following:
- Node.js
- npm
- MongoDB (local installation or MongoDB Atlas)
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/shiwanijha48-bot/Staff-Sync--MERN.git
```

### Step 2: Navigate to the Project

```bash
cd Staff-Sync--MERN
```

### Step 3: Configure the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
CLIENT_URL=http://localhost:5173
ROLE_SETUP_CODE=your_private_invitation_code
```

**Important:** Replace the placeholder values with your own credentials. Never upload `.env` to GitHub.

### Step 4: Start the Backend

```bash
npm run dev
```

### Step 5: Configure the Frontend

Open another terminal:

```bash
cd client
npm install
```

Configure the frontend API URL according to your application's environment variable setup.

For a Vite deployment, the variable may be:

```env
VITE_API_URL=http://localhost:8000
```

### Step 6: Start the Frontend

```bash
npm run dev
```

Open the application in your browser:

**http://localhost:5173**

## 🔐 Security

- JWT-based authentication.
- Role-based authorization.
- Secure password handling.
- Environment variables for sensitive configuration.
- Protected backend API routes.

## 📚 Project Documentation

The `docs/` folder contains separate project documents:

1. Technical Architecture
2. Entity Relationship Diagram (ERD)
3. Project Description
4. Roles and Responsibilities
5. User Flow
6. MVC Architecture

## 🌐 Deployment

The application can be deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

Deployment requires configuring production environment variables, database network access, and frontend/backend CORS settings.

## 🔮 Future Enhancements

- Automated email notifications.
- Advanced attendance reports.
- Payroll management integration.
- Leave policy configuration.
- Employee performance analytics.
- Enhanced training reports.

## 👩‍💻 Developer

**Shiwani Jha**

GitHub: [@shiwanijha48-bot](https://github.com/shiwanijha48-bot)

---

⭐ If you find this project useful, consider giving the repository a star!

**StaffSync – Making Work Feel More in Sync.**
