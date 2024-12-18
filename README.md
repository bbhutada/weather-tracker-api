# weather-tracker-api

This project provides a REST API designed to track daily rainfall data within a user-specific context.

## Features
- **Record daily rain data** via a POST endpoint.
- **Retrieve user-specific rain records** using a GET endpoint.
- **Containerized using Docker and Docker Compose** for seamless deployment.
- **Automated API documentation** generated with OpenAPI.

## Prerequisites
Before setting up and running the application, ensure the following tools are installed:
- Node.js & npm. Required for managing dependencies and running the application
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Setup and Running the Application

### 1. Clone the Repository
```
git clone <repository-url>
cd weather-tracker-api
npm install
```

### 2. Create a `.env` File
In the root directory of the project, create a .env file with the following environment variables (refer to the .env.example for additional details):
```env
# general
SERVER_PORT=3000
LOG_LEVEL=info
NODE_ENV=development
API_DOC_ENABLED=true

# database connection
PG_PORT=5432
PG_HOST=localhost
PG_USER=user
PG_PW=password
PG_DB=weather
DEBUG_ORM_SQL=true
```

### 3. Build and Run the Application
Use Docker Compose to build and run the application:
```
docker-compose up --build
```
Alternatively, you can use make commands for Docker-related operations:

* `make start-dev` – Build & Run the application in development mode.
* `make stop` – Stop all containers.
* `make start-prod` – Build & run in production mode.

#### The application will be accessible at `http://localhost:3000`. 
