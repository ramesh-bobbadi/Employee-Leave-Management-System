# Employee Leave Management System

Full stack web app for managing employee leave requests. Built from scratch,duration: 2 weeks.

chack the screen shots in the screenshots folder for a better understanding of the app.


## What it does

Employees can log in and apply for leave, and check the status of their requests. Admins can log in, see all leave requests, and approve or reject them. Admins can also add, edit and remove employees.

## Features

- Login for employees and admins, JWT based
- Admins can add, edit and deactivate employees
- When an employee is "deleted" it just gets deactivated instead of actually removed, so old leave history doesn't get lost
- If an admin deactivates someone while they're still logged in, they get kicked out on their very next request, not just their next login
- Employees can submit leave requests and track status
- Admins can view all requests and change the status
- Click a request card to expand it and see the full reason, click again to close it
- Responsive UI, built with Tailwind

## Tech stack

**Frontend:** React, Tailwind CSS, Axios, React Router, React Icons
**Backend:** Node.js, Express
**Database:** PostgreSQL
**Auth:** JWT for now 

## How to run it

### Requirements
- Node.js installed
- PostgreSQL running locally

### Backend
```
cd backend
npm install
```
Create a `.env` file inside the backend folder:
```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=yoursecret
```
Run the schema file against your Postgres db, then:
```
npm start
```

### Frontend
```
cd frontend
npm install
npm run dev
```
Open whatever localhost port Vite gives you, backend runs on 5000.

## still working on

-need to implement the search functionality
-need to implement the admin updates functionality

## Author

Ramesh — software engineering intern, Tech HUB 