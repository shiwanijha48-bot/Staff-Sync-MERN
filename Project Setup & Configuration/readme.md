# StaffSync – Modern Human Resource Management System

StaffSync is a MERN-stack-based Human Resource Management System designed to simplify employee management, attendance tracking, leave management, announcements, and training activities.

## 1. Project Folder Creation

Create a main project folder named `StaffSync`.

Inside the main folder, create two folders:

```text
StaffSync/
├── client/
└── server/
```

Open the `StaffSync` folder in Visual Studio Code.

## 2. Client Setup

Open the VS Code terminal and navigate to the client folder:

```bash
cd client
```

Create the React application using Vite:

```bash
npm create vite@latest . -- --template react
```

Select:
- Framework: React
- Variant: JavaScript

Install the required packages:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will generally run at:

`http://localhost:5173`

## 3. Server Setup

Open another VS Code terminal and navigate to the server folder:

```bash
cd server
```

Initialize the Node.js project:

```bash
npm init -y
```

Create the main server file:

```text
server.js
```

Create the following folders:

```text
server/
├── server.js
├── models/
├── controllers/
├── routes/
├── src/
│   └── config/
└── package.json
```

Install the required backend packages:

```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
```

Install Nodemon for development:

```bash
npm install --save-dev nodemon
```

Configure the start scripts in `package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Start the backend:

```bash
npm run dev
```

The backend will generally run at:

`http://localhost:8000`

## 4. Database Configuration

StaffSync uses MongoDB with Mongoose for database management.

For local development, MongoDB can run locally. For cloud deployment, MongoDB Atlas is used.

Create a `.env` file inside the `server` folder:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_private_random_secret
CLIENT_URL=http://localhost:5173
ROLE_SETUP_CODE=your_private_invitation_code
```

Replace the placeholder values with your own credentials.

**Important:** Never upload `.env` files or database credentials to GitHub.

## 5. Project Structure

```text
StaffSync/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api.js
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── controllers/
│   │   └── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

*The structure above represents the project's main organization; individual files may vary.*

## 6. Running the Complete Project

Open two terminals in VS Code.

**Terminal 1 – Backend**

```bash
cd server
npm run dev
```

**Terminal 2 – Frontend**

```bash
cd client
npm run dev
```

Open the frontend in your browser:

`http://localhost:5173`

## 7. Main Features

- User authentication using JWT.
- Role-based access for Employees, Managers, HR, and Admin.
- Employee management.
- Attendance check-in and check-out.
- Leave application and approval.
- Company announcements.
- Training and development management.
- Role-specific dashboards.

## 8. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Token (JWT) |
| API Communication | Axios |
| Deployment | Render |
| Database Hosting | MongoDB Atlas |

## 9. Deployment

The project can be deployed using Render:

- Frontend: Render Static Site.
- Backend: Render Web Service.
- Database: MongoDB Atlas.

Configure the frontend environment variable:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

Configure the backend environment variables in Render using the production database connection string and deployed frontend URL.

## 10. Author

**Shiwani Jha**

Project: StaffSync – Modern Human Resource Management System
