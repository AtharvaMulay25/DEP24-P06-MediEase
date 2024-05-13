# MediEase

## Project Description

Comprehensive solution designed to streamline the operations of medical centers. It simplify medical center operations by modernizing management systems, digitizing record-keeping, enhancing user experiences for medical staff and professionals, and improving patient care and management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [System Requirements and Setup](#system-requirements-and-setup)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Frontend](#frontend)
- [Backend](#backend)
- [Database](#database)

## Features

- **Inventory Management**: Automated tracking for stock levels, expirations, and purchase.
  
- **Patient History Access**: Access to patient records with enhanced security and privacy controls.

- **Prescription Management**: Tracking of prescriptions integrated with patient records and inventory.

- **Analytics Dashboard**: Real-time data visualization for various statistics of the data.

## Technologies Used

- Express.js
- PostgreSQL
- Node.js
- Prisma ORM
- JsonWebToken (JWT)
- Material Tailwind and Material UI

## System Requirements and Setup

### Operating System

- **Windows 11**: The project is developed and tested on Windows 11.

### Software Requirements

While developing the project, the following softwares were used:

- **Node.js**: Version 20.10.0.   
[Download Node.js](https://nodejs.org/)
- **PostgreSQL**: psql (PostgreSQL) 15.1   
[Download PostgreSQL](https://www.postgresql.org/download/)
- **Git**: git version 2.37.3.windows.1  
[Download Git](https://git-scm.com/downloads)

### Browser

- **Google Chrome**: Version 124.0.6367.158 (64-bit). The application has been tested on this browser version for compatibility and performance. [Download Chrome](https://www.google.com/chrome/)

### Additional Software

- **Visual Studio Code** (recommended): As an Integrated Development Environment (IDE) for code editing, debugging, and running tasks. VS Code is optimized for JavaScript and React development. [Download VS Code](https://code.visualstudio.com/)

### Environment Setup

> NOTE: Before running the application, ensure the environment variables are correctly initialized


## Prerequisites

- Node.js [Installation Guide](https://nodejs.org/)
- PostgreSQL [Installation Guide](https://www.postgresql.org/download/)

## Installation

1. Clone the repository:

```
git clone <REPO_URL> Mediease
```

2. Navigate to the project directory (Mediease):

```
cd Mediease
```

3. Go to server and Install dependencies for the _server_:

```
npm install
```

4. Set up environment variables (a .env file is needed for this expressJS server, instructions provided in `Configuration`).

5. Start the server (using Nodemon):

```
npm run dev
```

6. Go to the client directory:

```
cd client
```

9. Install dependencies for the client:

```
npm install
```

10. Start the client:

```
npm run dev
```

11. Go to the following URL:

    **http://localhost:5173**

## Configuration

### Server
- Create a `.env` file in the server directory of the project with the content mentioned in the **.env.example** file:
- Fill the environment variables values

```bash
# Database URL
DATABASE_URL=postgres://user:password@localhost:5432/dbname

# JWT secret key
SECRET_KEY=

# Email Credentials (for sending OTP)
USER_EMAIL=
USER_PASSWORD=

# SMTP host 
HOST=

# Frontend/Client URL
CLIENT_URL=
```

### Client
- Create a `.env` file in the client directory of the project with the content mentioned in the **.env.example** file:
- Fill the environment variables values

```bash
# Backend/Server URL
VITE_API_URL=
```

> IMP NOTE: The **USER_EMAIL** should be allowed to send email (App passwords should be allowed in the coresspoding google account setting, as Google has changed some setting regarding the App password)

## Frontend

- **React.js** - for component-based architecture.
- **Vite** - for fast development and hot module replacement.
- **Material-Tailwind** - for styled components and responsive design.
- **React Router** - for navigation management.
- **Apexcharts** - for data visualization in form of various charts. 
- **Sonner** - for elegant notifications of any action 

## Backend

- **Node.js** and **Express.js** for robust API services.
- **JWT** for secure authentication and authorization.
- **Prisma** ORM for streamlined PostgreSQL interactions.
- **Joi** for input data validation and sanitation.
- **Nodemailer** for sending emails to users for various actions.

## Database

- **PostgreSQL** is used as a primary database for this project along with **Prisma** as an ORM.  
- **Neon** is used currently for the database services.