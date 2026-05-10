# Sample Azure SQL Node + React

A minimal sample app demonstrating a Node.js/Express backend connecting to Azure SQL and a Vite + React frontend.

**Prerequisites**
- **Node.js**: Install Node.js 18+ and `npm`.
- **Azure SQL**: An Azure SQL instance (or any SQL Server) and credentials.

**Quick Start**
- **Install root deps**: `npm install`
- **Install frontend deps**: `cd frontend && npm install`
- **Run (dev)**: From project root run `npm start` — this uses `concurrently` to start the backend and the Vite dev server.
- **Run frontend only**: `cd frontend && npm run dev`
- **Run backend only (dev)**: `nodemon index-module.js` (or `node index-module.js`)

**Configuration**
- Create a `.env` file in the project root (or set environment variables) with your Azure SQL connection values. See [db.js](db.js) to match the expected configuration keys. Example variables:

```
AZURE_SQL_SERVER=your-server.database.windows.net
AZURE_SQL_DATABASE=your-database
AZURE_SQL_USER=your-username
AZURE_SQL_PASSWORD=your-password
```

**Project Structure**
- **`db.js`**: Database connection helper and configuration. ([db.js](db.js))
- **`index-module.js`**: App entry (Express server) used by the root `start` script. ([index-module.js](index-module.js))
- **`index-common.js`**: Shared/index helper (alternative entry). ([index-common.js](index-common.js))
- **`controller/index.js`**: API route handlers. ([controller/index.js](controller/index.js))
- **`service/index.js`**: Business logic and DB calls. ([service/index.js](service/index.js))
- **`routes/index.js`**: Express route wiring. ([routes/index.js](routes/index.js))
- **`frontend/`**: Vite + React app (dev with `npm run dev`). See `frontend/package.json` for scripts. ([frontend](frontend))

**Scripts**
- `npm start` — runs the backend (with `nodemon`) and the frontend dev server concurrently.
- `npm test` — placeholder test script.
- Frontend scripts: `dev`, `build`, `preview` (see `frontend/package.json`).

**Notes & Troubleshooting**
- If the backend cannot connect to the DB, verify your env vars and firewall/connection string for Azure SQL.
- If ports conflict, adjust the frontend Vite dev server or the Express port in `index-module.js`.

**Contributing**
- Open an issue or PR for improvements.

**License**
- ISC
