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

🔐 **User Authentication & Authorization**  
- User registration, login, and password reset (via email)  
- JWT-based access with roles (admin, staff, user)  
- Authorization middleware for route protection  

👤 **User Management (Admin only)**  
- Full CRUD operations for users  
- Role assignment and access control  
- Audit logging for user actions  

🚪 **Room Management (Admin & Staff)**  
- Create, update, delete, and list rooms  
- Validation rules for room availability and pricing  
- Secure access control for staff operations  

🏨 **Hotel Management (Admin only)**  
- Manage hotel details and availability  
- CRUD operations for hotel records  
- Validation logic to ensure data consistency  

📅 **Booking Management **  

- 📝 **Create Booking** — validates dates, checks room/hotel availability, prevents overlaps, calculates price, sends email  
- 🔄 **Update Status** — role-based access, supports Pending/Confirmed/Cancelled, prevents conflicts, updates room status, audit trail  
- ✏️ **Update Booking** — allows safe edits before confirmation, validates new dates/room, tracks changes, sends notification  
- 📖 **View Bookings** — admins see all, staff see hotel-specific, supports filters & pagination  
- 🔍 **Get Booking by ID** — role-based access (admin, staff, user) with populated room/hotel details  
- ❌ **Cancel Booking** — users cancel their own before check-in, updates status & room availability, audit trail  


📧 **Notifications**  
- Email alerts for booking confirmations, cancellations, and status changes  
- Modular notification templates for scalability  

📝 **Audit Trails**  
- Track changes to bookings, rooms, and user actions  
- Ensure accountability and transparency in operations  


---

## 🛠 Tech Stack

| Layer              | Technology |
|--------------------|------------|
| **Runtime**        | Node.js    |
| **Framework**      | Express.js |
| **Database**       | MongoDB / Mongoose |
| **Validation**     | express-validator (custom validations in `utils/`) |
| **Authentication** | JWT |
| **Automation**     | Cron jobs |
| **Testing**        | Postman collections |
| **Version Control**| Git & GitHub |
