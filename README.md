# 🏨 Hotel Management API

A backend API built with **Node.js** for managing hotels, rooms, and users. Designed with scalability, automation, and clean modular code.

---

## 🚀 Features
- **Authentication & Role-based Access Control**  
  - Admins, staff, and users with different permissions  
- **User Management (Admin only)**  
  - Full CRUD operations for users  
- **Room Management (Admin & Staff)**  
  - Create, update, delete, and list rooms  
- **Hotel Management (Admin only)**  
  - Manage hotel details and availability  
- **Booking Management (in progress)**  
  - Create, update, cancel bookings  
  - Automated cron jobs for check-in/check-out status transitions  
- **Notifications**  
  - Email alerts for booking confirmations, cancellations, and status changes  
- **Audit Trails**  
  - Track changes to bookings and user actions  

---

## 📂 Project Structure

Hotel-Management-API/ 

│── config/ # Environment & DB setup 

│── controllers/ # Route logic 

│── models/ # Database schemas 

│── routes/ # API endpoints 

│── services/ # Business logic & helpers 

│── utils/ # Notification templates, validations, helpers 

│── server.js # Entry point 

│── package.json # Dependencies & scripts

---

## ⚙️ Installation
```bash
# Clone the repo
git clone https://github.com/3bdinho/Hotel-Management-API.git

# Navigate into the project
cd Hotel-Management-API

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

▶️ Usage
# Start the server
npm start

# Run in development mode
npm run dev


📊API Documentation
Endpoints are tested and documented using Postman collections.

Import the provided Postman collection to explore and test all routes.

📊 Example Endpoints
Method	Endpoint	Description
POST  /auth/register	Register new user
POST  /auth/login	Login user
GET   /users	List all users (Admin only)
POST  /rooms	Create a room (Admin/Staff)
GET	  /hotels	List all hotels (Admin only)

📈 Roadmap
[ ] Add booking analytics endpoints

[ ] Expand Postman documentation with examples

[ ] Integrate CI/CD pipeline

[ ] Add unit & integration tests

👨‍💻 Author
Abdulrahman Backend Developer | Node.js, Automation, Scalable APIs
