# 🏨 Hotel Management API

A backend API built with **Node.js** for managing hotels, rooms, and users.  
Built with scalability, automation, and clean modular code in mind.

---

## 📖 Overview
This project provides a RESTful API for hotel management.  
It supports **role-based access control** for admins and staff, with endpoints for managing users, rooms, and hotels.  
Bookings and notifications are in progress, with automation planned via cron jobs.

---

## 🚀 Key Features
- 🔐 **Authentication & Role-based Access Control** (Admin, Staff, User)
- 👤 **User Management (Admin only)** — Full CRUD operations
- 🏨 **Hotel Management (Admin only)** — Manage hotel details and availability
- 🚪 **Room Management (Admin & Staff)** — Create, update, delete, and list rooms
- 📅 **Booking Management (in progress)** — Status transitions with cron jobs
- 📧 **Notifications** — Email alerts for booking confirmations and cancellations
- 📝 **Audit Trails** — Track changes to bookings and user actions

---

## 🛠 Tech Stack

| Layer              | Technology |
|--------------------|------------|
| **Runtime**        | Node.js    |
| **Framework**      | Express.js |
| **Database**       | MongoDB / Mongoose |
| **Validation**     | express-validator (custom validations in `utils/`) |
| **Automation**     | Cron jobs |
| **Testing**        | Postman collections |
| **Version Control**| Git & GitHub |
# Setup environment variables
cp .env.example .env
