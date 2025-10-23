# 🔐 MERN Authentication with Two-Factor Authentication (2FA)

A secure authentication system with login, signup, JWT-based session management, and optional Two-Factor Authentication using OTP.

---

## 💡 Overview
- This project implements a **complete authentication system** using the **MERN stack**.  
- It includes features like:
  - User **registration** and **login**  
  - Password **hashing using bcrypt**  
  - **JWT-based authentication** for protected routes  
  - **Two-Factor Authentication (2FA)** using OTP for added security  
  - User data stored in **MongoDB**  
- The frontend is built using **React** for managing authentication state.

---

## 🧠 Key Features
- 🔐 Secure login & signup system  
- 🔑 Two-Factor Authentication via OTP (email or app-based)  
- 🧾 JWT-based authorization  
- 💾 MongoDB for storing user credentials  
- ⚙️ Protected routes using middleware  
- 🌙 Clean UI with modern design (Tailwind CSS)  
- ⚡ Real-time feedback using React state management  

---

## 🏗️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React, Tailwind CSS|
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | JWT, bcrypt |
| 2FA / OTP | nodemailer  |

---

## ⚙️ Installation & Setup

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/mern-auth-2fa.git

# 2️⃣ Install dependencies
cd mern-auth-2fa
npm install
cd client
npm install

# 3️⃣ Create environment file
touch .env
