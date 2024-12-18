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

#### The Swagger API documentation is available at `http://localhost:3000/documentation`.

### 4. Run Database Migrations (Optional for Production)
Migration scripts are located in src/migrations. If you need to make changes to the database schema, generate new migration files using the following command:

```
npm run migration:generate -- ./src/migrations/{filename}` 
```
Replace {filename} with an appropriate name for your migration file.

As `migrationRun` is set to `true`, these newly created migration scripts will be executed upon restarting docker-compose.

Alternatively, to apply migrations manually you can use following commads:
* `migration:up` – Apply pending migrations.
* `migration:down` – Rollback migrations if necessary.

For production, it is recommended to use migrations instead of synchronize: true.

## Endpoints

### POST `/api/data`
Records rain data for the user.

#### Request Headers
- `x-userid`: (String) Unique identifier for the user.

#### Request Body
```json
{
  "rain": true
}
```

#### Response
- Status: `201 Created`

### GET `/api/data`
Retrieves all rain records for the user.

#### Request Headers
- `x-userid`: (String) Unique identifier for the user.

#### Response
- Status: `200`

```json
{
  "data": [
    {
      "timestamp": "2024-11-05T19:51:33.294Z",
      "rain": true
    },
    {
      "timestamp": "2024-11-04T17:15:23.891Z",
      "rain": false
    }
  ]
}
```

## Development Commands
To manage development workflow:

- **npm install** – Installs dependencies.
- **npm run build** – Compiles the application.
- **npm run start** – Starts the server using ts-node without automatic restart.
- **npm run start:dev** – Starts the server with automatic restart on code changes.
- **npm run lint** – Runs linting checks.
- **npm run format** – Formats code as per the coding standards.

## Project Structure
- **src/index.ts**: Application entry point.
- **src/Database.ts**: Configuration and data source for connecting to the database.
- **src/config**: Server & Database env config.
- **src/controllers**: API controllers.
- **src/entities**: Database entities.
- **src/entities**: Middleware operations.
- **src/migrations**: Handles database schema migrations.
- **src/repositories/RainData.ts**: Repositories for rain data-related database operations.
- **src/server**: API server & documentation setup and configuration.
- **docker-compose.yml**: Docker Compose configuration for development.
- **docker-compose.prod.yml**: Docker Compose configuration for production.
- **.env:** Environment configuration file for Docker services.
- **Makefile**: Automation for Docker-related tasks.

### Remaining Todo's
- Write unit tests or integration tests for the API.
- Implement logging (Pino or winston) for incoming requests and errors.
- Add rate-limiting middleware for POST requests.

## License
