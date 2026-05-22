# Full-Stack Authentication System

Node.js + TypeScript + MySQL backend with Angular 21 frontend.


## Live Links

- Frontend: https://final-intprog-frontend-s55p.onrender.com
- Backend API: https://the-final-intprogs.onrender.com
- Swagger Docs: https://the-final-intprogs.onrender.com/api-docs

---

## Local Setup

### Backend
1. cd backend
2. npm install
3. Copy .env.example to .env and fill in your values
4. npm run start:dev

API runs at localhost:4000
Swagger docs at localhost:4000/api-docs

### Frontend
1. cd frontend
2. npm install
3. ng serve

App runs at localhost:4200

---

## Environment Variables (Backend)

Copy .env.example to .env — never commit this file.

| Variable | Description |
|----------|-------------|
| DB_HOST | MySQL host |
| DB_PORT | MySQL port |
| DB_USER | MySQL username |
| DB_PASSWORD | MySQL password |
| DB_NAME | Database name |
| JWT_SECRET | Long random string for signing JWTs |
| EMAIL_FROM | Sender email address |
| SMTP_HOST | SMTP server host |
| SMTP_PORT | SMTP port |
| SMTP_USER | SMTP username |
| SMTP_PASS | SMTP password |
| CORS_ORIGIN | Your deployed Angular frontend URL |
| COOKIE_SECURE | Set to true in production |
| PORT | Server port (default 4000) |
| NODE_ENV | Set to production when deploying |

---

## Stage A - Fake Backend Testing

1. Open src/app/app.module.ts
2. Confirm fakeBackendProvider is in the providers array
3. Run: ng serve
4. Test the full flow:
   - Register and check for the mock verification email alert on screen
   - Click the verification link in the alert
   - Login with verified credentials
   - First account gets Admin role and can access /admin
   - Second account gets User role and is blocked from /admin
   - Test forgot password and reset password flow

---

## Stage B - Real Backend Integration

1. Comment out fakeBackendProvider in app.module.ts
2. Update src/environments/environment.prod.ts with your backend URL
3. Build for production: npm ci && npm run build
4. Deploy the dist/angular-auth-boilerplate folder to Render as a Static Site
5. Add the SPA Rewrite Rule on Render:
   - Source: /*
   - Destination: /index.html
   - Action: Rewrite (NOT Redirect)
6. Verify:
   - Register a real user and check Ethereal or Mailtrap for the verification email
   - Click the link and confirm the account is verified in MySQL
   - Login and check the browser Application tab for the refreshToken cookie (HttpOnly, Secure)
   - Confirm the jwtToken is attached to API requests in the Network tab
   - Test Admin and User role restrictions

---

## Backend Deployment (Render - Web Service)

1. Connect your GitHub repository
2. Build Command: npm install && npm run build
3. Start Command: node dist/server.js
4. Set these environment variables in the Render dashboard:
   - JWT_SECRET
   - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
   - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM
   - CORS_ORIGIN (set to your frontend URL)
   - COOKIE_SECURE=true
   - NODE_ENV=production

---

## Frontend Deployment (Render - Static Site)

1. Connect your GitHub repository
2. Build Command: npm ci && npm run build
3. Publish Directory: dist/angular-auth-boilerplate
4. Add Rewrite Rule: Source /* to Destination /index.html (Action: Rewrite)
5. Update environment.prod.ts with the backend URL before building

---

## Common Pitfalls

1. Verification links returning 404 - Make sure the Render Rewrite rule uses Rewrite not Redirect
2. CORS errors - Set the exact frontend URL in CORS_ORIGIN on the backend
3. Cookies not sending - Angular calls use withCredentials: true (already configured)
4. Fake backend running in production - Comment out fakeBackendProvider before building
5. Hardcoded secrets - Never commit .env to GitHub

---

## Tech Stack

- Frontend: Angular 21, TypeScript, Bootstrap 5, RxJS
- Backend: Node.js, Express, TypeScript
- Database: MySQL with Sequelize ORM
- Auth: JWT + HttpOnly Secure refresh token cookie
- Email: Nodemailer with Ethereal (dev) or real SMTP (prod)
- Docs: Swagger UI (OpenAPI 3.0)
- Security: bcryptjs, express-jwt, CORS
