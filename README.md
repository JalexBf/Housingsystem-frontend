# Property Rental Management System - Frontend

## Overview
This is the frontend service for a **Property Rental Management System** built in **React** with **Vite** and **Material-UI**. It allows users to **browse, search, list, and manage properties**, supporting **role-based access control (RBAC)** for **owners, tenants, and admins**.

---
## Log-in
- **Admin Panel**: Admin users log in through the **backend** at `http://localhost:8080`.
- **User Interface**: Owners and tenants log in through the **frontend** at `http://localhost:5173`.

**Password for Admin user is currently:** 'password123'

---

## Features

### Authentication & Authorization
- **JWT-based authentication** (stored in `localStorage`).
- **Role-based access control (RBAC)**:
  - **Admin**: Manage users & properties.
  - **Owner**: List & manage properties.
  - **Tenant**: Search, request viewings, and rent properties.
- **Protected Routes** to prevent unauthorized access.

### Property Listings & Management
- **Owners can:**
  - Add and delete properties.
  - Approve or reject rental/viewing requests.
- **Tenants can:**
  - Browse available properties.
  - Submit **rental requests**.
  - Book **viewing appointments**.

### Search & Filtering
- Filter properties based on:
  - **Area**
  - **Category (Apartment, House, Room, etc.)**
  - **Price Range**
  - **Number of Rooms**
  - **Size (m²)**

### Dashboards
- **Tenant Dashboard**: View rented properties & track requests.
- **Owner Dashboard**: Manage properties & rental/viewing requests.

### API & Security
- **Axios-based API handling**.
- **JWT authentication** for API requests.
- **Error handling** for authentication & authorization failures.

---

## Installation

### Clone the repositories:
#### Backend:
```sh
git clone https://github.com/JalexBf/Housingsystem
cd Housingsystem
mvn clean install
mvn spring-boot:run
```
#### Frontend:
```sh
git clone https://github.com/JalexBf/Housingsystem-frontend
cd Housingsystem-frontend
```


### Install dependencies:
```sh
npm install
```

### Start the development server:
```sh
npm run dev
```
- The app runs at **`http://localhost:5173`**.

---

## Project Structure
```
frontend/
│── public/                 # Static assets
│── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Application pages
│   ├── services/           # API handling (Axios)
│   ├── routes/             # Protected routes
│   ├── assets/             # Images and icons
│   ├── App.jsx             # Main application file
│   ├── main.jsx            # Entry point
│── package.json            # Project dependencies
│── vite.config.js          # Vite configuration
│── README.md               # Project documentation
```

---

## Environment Variables
Create a **`.env`** file in the root directory:
```sh
VITE_API_BASE_URL=http://localhost:5173
```

---

## Technologies Used
- **React** (with Vite)
- **Material-UI**
- **React Router**
- **Axios** (for API requests)
- **JWT authentication**
- **Node.js & Express** (backend, not included in this repo)

---


## License
This project is licensed under the **MIT License**.

---

## Authors
- Jason Karafotias
- George Levantinos
- Christos Papilidis
