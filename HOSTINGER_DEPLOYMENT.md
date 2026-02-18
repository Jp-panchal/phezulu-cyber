# Hostinger Business Plan Deployment Guide

## Overview
This guide explains how to deploy Phezulu Cyber to Hostinger's Business plan using a **split architecture**:
- **Frontend (React)**: Static files served from `public_html/` on `yourdomain.com`
- **Backend (Node.js)**: Managed Node.js app on subdomain `api.yourdomain.com`
- **Database**: Hostinger's managed MySQL

---

## Prerequisites
1. Hostinger Business plan (or AI Business) with Node.js Web App feature
2. Domain name purchased and added to Hostinger account
3. Project files ready for deployment
4. Git repository or local copy of the project

---

## Step 1: Create Backend Subdomain

1. Log into **hPanel** (Hostinger control panel)
2. Go to **Domains** → Click your domain
3. Click **Create a new subdomain**
4. Name it: `api`
5. Point it to a folder: `/public_html/api` or leave default
6. Save and wait ~5-10 minutes for DNS propagation

✅ Result: `https://api.yourdomain.com` is now active

---

## Step 2: Set Up Managed MySQL Database

1. In hPanel, go to **Databases** → **MySQL Databases**
2. Click **Create New Database**
3. Fill in:
   - **Database Name**: `phezulu_db` (or your choice)
   - **Username**: `phezulu_user` (or your choice)
   - **Password**: Generate a strong password
4. Click **Create Database**

✅ Save these credentials — you'll need them for environment variables

---

## Step 3: Prepare Frontend Build

1. On your local machine, navigate to the client folder:
   ```bash
   cd c:\reactpro\phezulu-cyber\client
   ```

2. Run the production build:
   ```bash
   npm run build
   ```

3. This creates a `dist/` folder with optimized static files

4. Upload the contents of `dist/` to your hosting:
   - Connect via FTP (or File Manager in hPanel)
   - Upload all files from `dist/` to `/public_html/`
   - **Do NOT** upload the `dist` folder itself — upload the **contents**

✅ Result: Frontend accessible at `https://yourdomain.com`

---

## Step 4: Deploy Node.js Backend

### Option A: Using GitHub Integration (Recommended)

1. Push your project to GitHub:
   ```bash
   git add .
   git commit -m "Prepare for Hostinger deployment"
   git push origin main
   ```

2. In hPanel, go to **Websites** → **Node.js Web Apps** → **Create New App**

3. Select **GitHub** as source

4. Authorize Hostinger to access your GitHub account

5. Select your repository and branch (main/master)

6. Set the **Entry Point** to: `server/index.js`

7. Set **Build Command** (optional):
   ```bash
   npm install
   ```

8. Click **Create and Deploy**

### Option B: Using File Upload

1. Compress your backend files:
   ```bash
   # On Windows, zip the server folder
   # On Mac/Linux:
   cd c:\reactpro\phezulu-cyber
   zip -r phezulu-backend.zip server/ -x "node_modules/*" ".env"
   ```

2. In hPanel, go to **Websites** → **Node.js Web Apps**

3. Click **Upload Project**

4. Select the `.zip` file

5. Set **Entry Point** to: `server/index.js`

6. Click **Deploy**

✅ Result: Backend running at `https://api.yourdomain.com`

---

## Step 5: Configure Environment Variables

1. In hPanel, go to **Websites** → **Node.js Web Apps** → Select your app

2. Click **Environment Variables**

3. Add the following variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `DB_HOST` | `localhost` | Hostinger MySQL is local to the app |
| `DB_PORT` | `3306` | Default MySQL port |
| `DB_NAME` | `phezulu_db` | Database name from Step 2 |
| `DB_USER` | `phezulu_user` | Database user from Step 2 |
| `DB_PASSWORD` | `[your_password]` | Database password from Step 2 |
| `JWT_SECRET` | `[generate_random_string]` | Use a strong random value, e.g., `openssl rand -base64 32` |
| `FRONTEND_URL` | `https://yourdomain.com` | Your frontend domain |
| `NODE_ENV` | `production` | Production environment |
| `PORT` | Leave empty or `5000` | Hostinger assigns a port automatically |

4. Save environment variables

5. Restart the Node.js app

✅ Result: Backend can now connect to MySQL and communicate with frontend

---

## Step 6: Verify Deployment

### Test Frontend
- Open `https://yourdomain.com` in browser
- Should load your React app

### Test Backend API
- Open developer tools (F12) → Console
- Open `https://yourdomain.com` and check network tab
- API requests should go to `https://api.yourdomain.com/api/...`
- Should receive valid responses (no CORS errors)

### Test Database Connection
- Upload a file to test upload routes
- Submit a contact form to test contact route
- Check that data is saved in the database

If you see CORS errors:
- Verify `FRONTEND_URL` is set correctly in environment variables
- Verify frontend domain matches exactly (including protocol and trailing slashes)

---

## Step 7: Set Up SSL Certificate (HTTPS)

Hostinger usually provides free SSL certificates:

1. In hPanel, go to **Websites** → **SSL/TLS**

2. Select your domain

3. Click **Auto-configure Issuer**

4. Hostinger will automatically configure Let's Encrypt SSL

5. Wait 5-10 minutes for activation

✅ Result: Both `yourdomain.com` and `api.yourdomain.com` have HTTPS

---

## Step 8: Create Admin User (Optional)

If you need to initialize admin users or tables:

1. SSH into your Hostinger VPS (if available) or use File Manager

2. Navigate to `server/` directory

3. Run:
   ```bash
   node createAdmin.js
   ```

4. Or, via API request (once backend is running):
   - Make a POST request to `https://api.yourdomain.com/api/admin/initialize`

---

## Troubleshooting

### Backend Not Starting
- Check **Environment Variables** — missing `DB_*` values?
- Check **Node.js logs** in hPanel dashboard
- Verify **Entry Point** is correct: `server/index.js`
- Ensure `package.json` has `"start": "node index.js"` script

### CORS Errors
- Add your exact frontend domain to `FRONTEND_URL` environment variable
- Verify no typos in domain URL
- Ensure frontend domain has protocol (`https://`) and no trailing slash

### Database Connection Failed
- Test with Hostinger's phpMyAdmin tool
- Verify `DB_HOST=localhost` (not an external server)
- Verify `DB_NAME`, `DB_USER`, `DB_PASSWORD` are correct
- Check Hostinger MySQL service is running

### Frontend Shows "Backend Not Found"
- Verify `FRONTEND_URL` in backend environment variables
- Verify API calls in React use correct domain: `https://api.yourdomain.com`
- Check browser console for actual API endpoint being called

---

## Important Notes

### File Uploads
- By default, uploaded files are stored in `server/uploads/`
- On shared hosting, this directory might have storage limits
- Consider upgrading to a higher plan or using cloud storage (AWS S3, Azure Blob) if uploads exceed limits

### Performance
- Hostinger's shared hosting has resource limits (CPU, RAM, connections)
- If traffic is high, consider upgrading to a **VPS** plan

### Backups
- Always backup your MySQL database through hPanel
- Set up automatic backups (Hostinger offers daily backups)

### Database Credentials
- Never commit `.env` files to version control
- Use `.env.example` to show required variables
- Rotate credentials periodically

---

## Quick Reference

| Component | URL | Type |
|-----------|-----|------|
| Frontend | `https://yourdomain.com` | Static React app in `public_html/` |
| Backend API | `https://api.yourdomain.com` | Node.js app on subdomain |
| Admin Panel | `https://api.yourdomain.com/api/admin` | Backend routes |
| Database | `localhost:3306` | Managed MySQL in Hostinger |

---

## Next Steps

1. **Monitor**: Check hPanel dashboard for app health, error logs, and traffic
2. **Update**: Keep dependencies updated with `npm update`
3. **Scale**: If needed, upgrade to higher plan or migrate to VPS
4. **Optimize**: Consider adding caching, CDN for static files, etc.

For support, contact Hostinger support team or consult their documentation.
