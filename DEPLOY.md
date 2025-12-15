# Deployment guide — Phezulu Cyber

This document contains quick deploy instructions and helper files for hosting the frontend on shared hosting (Afrihost ClientZone) and the backend on a Node-capable host (VPS / PaaS).

Summary
- Build the frontend: `cd client && npm ci && npm run build` -> `client/dist`
- Upload `client/dist` contents to your hosting `public_html` (or copy `.htaccess` below into the site root).
- Host the Node API on a VPS or PaaS; use `api.phezulu.group` for API DNS, and point `www.phezulu.group` to the shared hosting IP.

Files included in repo under `deploy/`:
- `deploy/public_html/.htaccess` — SPA rewrite rules for Apache (copy into site root).
- `deploy/nginx/phezulu` — sample Nginx server block to reverse-proxy Node app and serve uploads.
- `deploy/pm2/ecosystem.config.js` — sample PM2 ecosystem file to run the Node server.

Key notes
- Ensure `MONGO_URI`, `JWT_SECRET`, and `PORT` are set as environment variables on the server.
- Use MongoDB Atlas for production DB; whitelist server IP or follow Atlas connection docs.
- Remove server-side unconditional static-serving (already patched) so Express only serves static files when `NODE_ENV` is `production` or `preview`.

Deploy steps (VPS / Ubuntu example)
1. Provision server and set DNS `A` record for `api.phezulu.group` to server IP.
2. SSH and install Node, Nginx, Certbot, PM2.
3. Clone repo, install dependencies, build client, and move built files into server directory (or let Nginx serve `client/dist`).
4. Configure environment variables (use `.env` or systemd/pm2 environment options).
5. Start app with PM2 and enable Nginx site.
6. Obtain SSL with Certbot: `sudo certbot --nginx -d phezulu.group -d www.phezulu.group -d api.phezulu.group`.

See `deploy/*` files for sample configs.
