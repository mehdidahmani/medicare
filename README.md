﻿# Medical Center Management System
   
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A web application for managing medical center Appointments, built with React.js, Tailwind CSS, Express.js, and SQL using WAMP and phpMyAdmin.

## Features
- User authentication 
- Patient management
- Appointment scheduling
- Dashboard and analytics

## Technology Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MySQL (via WAMP and phpMyAdmin)

## Installation
1. Clone the repository:
    `ash
    git clone https://github.com/mehdidahmani/medicare.git
    cd medicare
    `

2. Install dependencies for the server:
    `ash
    cd server
    npm install
    # If there are missing dependencies, use npm install <dependency-name>
    `

3. Install dependencies for the client:
    `ash
    cd ../client
    npm install
    # If there are missing dependencies, use npm install <dependency-name>
    `

4. Start the WAMP server and create a new database named medicare0.0 using phpMyAdmin.
    # OR modify the server/config/config.json to include your databse 

5. Start the backend server:
    `ash
    cd server
    npm start
    `

6. Start the frontend development server:
    `ash
    cd ../client
    npm start
    `

7. Open http://localhost:3000 in your browser.

