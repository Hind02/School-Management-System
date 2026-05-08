# EduNode - School Management System

Full stack school management app with a Node.js/Express REST API and a React client.

## Run locally

```bash
npm install
npm run install:all
npm run dev
```

Backend: http://localhost:3000

Frontend: http://localhost:3001

Default admin API key:

```text
edunode-admin-key
```

## Main API routes

- `GET /students`
- `GET /students?filiere=GI`
- `GET /students/:id`
- `POST /students`
- `PUT /students/:id`
- `DELETE /students/:id`
- `GET /students/stats`
- `GET /students/export`

Admin mutations require the `x-api-key` header.
