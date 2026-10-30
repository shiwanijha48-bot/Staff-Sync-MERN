# StaffSync — Modern HR Management Solution

A MERN application with a bright, light-mode interface and role-aware workspaces for Employee, Manager, HR and Admin. The public landing page introduces the product and lets visitors choose a role before login or registration.

## Features
- Responsive landing page, login and registration pages; light pastel palette, bright accent colors, responsive mobile layout.
- Employee: dashboard, announcements, leave applications/history, attendance/check-in history and profile.
- Manager: employee directory, team leave review, attendance overview, announcements and training/development.
- HR: employee management, leave review, attendance administration, announcements and training.
- Admin: organization overview, employee/account management, leave review, attendance administration, announcements and training.
- JWT authentication, password hashing, protected API routes and role checks on the backend.
- MongoDB models and APIs for users, attendance, leaves, announcements and training.

## Run locally
1. Install Node.js 20+ and ensure MongoDB Atlas is accessible.
2. In `server`, copy `.env.example` to `.env`, then set `MONGO_URI`, a fresh `JWT_SECRET`, `CLIENT_URL=http://localhost:5173`, and a private `ROLE_SETUP_CODE` if needed.
3. In a terminal: `cd server`, `npm install`, `npm run dev`.
4. In another terminal: `cd client`, `npm install`, `npm run dev`.
5. Open the URL Vite prints (normally `http://localhost:5173`). API health: `http://localhost:8000/api/health`.

## Roles and security
- Public registration defaults to Employee. Choosing Manager, HR or Admin requires the private `ROLE_SETUP_CODE` configured in `server/.env`; do not share this code publicly.
- Existing accounts can sign in only when the selected role matches the role assigned to that account.
- To create or promote an initial administrator, run from `server`: `npm run create-admin -- --name "StaffSync Admin" --email admin@yourcompany.com --password "UseAUniqueStrongPassword"`. Change the password after first sign-in. Keep credentials out of source control.
- Never commit `.env`. Use a unique, rotated database password and JWT secret; URL-encode reserved characters in MongoDB credentials.

## Main navigation
Dashboard · Employees · Attendance · Leave management · Announcements · Training · My profile. Items and actions are guarded by role permissions on the API as well as the interface.

## Updates in this maintenance build
- Employee directory uses a single Role field; the duplicate Designation field has been removed from the UI and API profile payloads.
- HR sees the navigation item as **Employee Management** and can add/deactivate employee accounts from that page.
- On startup, the backend removes the obsolete `user_1_date_1` attendance index left by older builds and synchronizes the current `employee_1_date_1` index. This fixes duplicate-key failures caused by legacy attendance rows with `user: null`.
- Attendance check-in records are created against the authenticated account ID and duplicate submissions return a readable conflict message.

After replacing your project files, keep your own `server/.env` (do not overwrite it with an example file), then restart the backend. Back up your MongoDB database before applying schema/index migrations in production.
