# ReferFlow - Candidate Referral Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://mern.io/)
[![Vite](https://img.shields.io/badge/Client-Vite-purple.svg)](https://vitejs.dev/)

ReferFlow is a modern web application designed to streamline the process of managing candidate referrals within an organization. Built with the **MERN (MongoDB, Express, React, Node.js)** stack, it provides a seamless experience for recruiters and employees to track and update referral statuses.

## 🚀 Key Features

*   **User Authentication**: Secure JWT-based login and registration system.
*   **Referral Management**: 
    *   Create new candidate referrals with details (Name, Email, Resume).
    *   View all submitted referrals in a clean list format.
*   **Status Updates**: Simple dropdown interface to update candidate status (New, Reviewed, Hired, Rejected).
*   **Responsive Design**: Optimized for various screen sizes with a clean, modern UI.
*   **Real-time Feedback**: Instant visual feedback for actions like updates and deletions.

## 🛠 Tech Stack

### Frontend
*   **Framework**: React (v19) with Vite
*   **Routing**: React Router DOM (v7)
*   **Styling**: Vanilla CSS with modern practices (Flexbox, Grid, Glassmorphism)
*   **State Management**: React Hooks (useState, useEffect)

### Backend
*   **Server**: Node.js & Express.js
*   **Database**: MongoDB with Mongoose ODM
*   **Authentication**: JWT (JSON Web Tokens) & bcryptjs
*   **File Handling**: Multer for resume uploads

## 📦 Installation & Setup

Follow these steps to get the project up and running on your local machine.

### Prerequisites
*   Node.js (v18 or higher recommended)
*   MongoDB (Local instance or Atlas URI)
*   Git

### 1. Clone the Repository
```bash
git clone https://github.com/yashpss01/ReferFlow.git
cd ReferFlow
```

### 2. Configure Environment Variables
Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Install Dependencies
We've included a helper script to install dependencies for both the client and server.
```bash
npm run install-all
```

Alternatively, you can install them manually:
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

## 🏃‍♂️ Running the Application

To run both the frontend and backend concurrently in development mode:

```bash
npm start
```

*   **Frontend**: Opens at `http://localhost:5173`
*   **Backend Server**: Runs on `http://localhost:5001`

To run them separately:
*   **Server**: `npm run server` (from root) or `npm run dev` (inside `server/`)
*   **Client**: `npm run client` (from root) or `npm run dev` (inside `client/`)

## 🔗 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login user & get token | ❌ |
| `GET` | `/api/referrals` | Get all referrals | ✅ |
| `POST` | `/api/referrals` | Create a new referral | ✅ |
| `PUT` | `/api/referrals/:id/status` | Update referral status | ✅ |

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yashpss01/ReferFlow/issues).

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with ❤️ by [Yash Pratap Singh Solanki](https://github.com/yashpss01)*
