# Flight Authentication Service

This is a backend authentication service for a flight management application. It handles user authentication, including signup and signin, and provides endpoints for checking user authentication status and role-based authorization.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Database Configuration](#Database-Configuration)
- [API Endpoints](#api-endpoints)

## Getting Started

These instructions will help you set up and run the Flight Authentication Service on your local machine or a server.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- npm (Node Package Manager) installed
- A running database server (e.g., PostgreSQL, MySQL) and the necessary connection details (configured in `.env`).

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/yourusername/flight-authentication-service.git
   cd flight-authentication-service
   ```

2. Install dependencies:

   ```shell
   npm install
   ```

3. Create a `.env` file in the project root and configure your environment variables, including database connection details and secret keys:

   ``env
PORT=3001
JWT_KEY=<xyz>
DB_SYNC=true
   ```

### Usage

To start the server, run:

```shell
npm start
```
## Database Configuration 

Inside the `src/config` folder, create a new file named `config.json`. Add the following JSON configuration to the `config.json` file:

   ```json
   {
     "development": {
       "username": "<YOUR_DB_LOGIN_NAME>",
       "password": "<YOUR_DB_PASSWORD>",
       "database": "Flights_Search_DB_DEV",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }
   ```

Replace `<YOUR_DB_LOGIN_NAME>` and `<YOUR_DB_PASSWORD>` with your actual database login credentials.


## API Endpoints

The Flight Authentication Service exposes the following API endpoints:

- `POST /api/signup`: Create a new user account.
- `POST /api/signin`: Sign in with an existing user account.
- `GET /api/isAuthenticated`: Check if a user is authenticated.
- `GET /api/isAdmin`: Check if a user has admin privileges.

