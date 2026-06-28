# Deployment — Smile Island Dental Clinic (VPS + PM2 + Nginx)

This is a **Next.js (App Router) Node app** — run with `next start`, **not** a static
export. Sanity CMS is read at runtime, so the server needs the env vars below.

- Node: **20 LTS** (or 22). Next 16 requires ≥ 18.18.
- Process manager: **PM2**
- Reverse proxy: **Nginx** → `http://127.0.0.1:3000`
- TLS: **Certbot (Let's Encrypt)**
- App port: **3000** (default for `next start`)

Replace the placeholders before running:
`<SERVER_IP>`, `<SSH_USER>`, `<DOMAIN>` (e.g. smileislandclinic.com),
`<REPO_URL>` (e.g. https://github.com/Ahmedelshafei2361/Smile-Island-Clinic.git).

---

## 0. Connect

```bash
ssh <SSH_USER>@<SERVER_IP>
```

## 1. Update the server

```bash
sudo apt update && sudo apt upgrade -y
```

## 2. Install Node 20 LTS + build tools + git

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git
node -v && npm -v          # expect v20.x
```

## 3. Install PM2 (global)

```bash
sudo npm install -g pm2
```

## 4. Clone the repo

```bash
cd /var/www            # create if needed: sudo mkdir -p /var/www && sudo chown $USER /var/www
git clone <REPO_URL> smile-island
cd smile-island
git checkout master    # or the branch you push
```

## 5. Create the production env file

`.env` (or `.env.local`) is git-ignored — create it on the server. See
`.env.local.example` for the full list. Minimum for production:

```bash
cat > .env.local <<'EOF'
# PUBLIC
NEXT_PUBLIC_SANITY_PROJECT_ID=umdsp1eh
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
NEXT_PUBLIC_SITE_URL=https://<DOMAIN>
NEXT_PUBLIC_GTM_ID=GTM-KK964XMZ
# SECRET (server-only)
SANITY_API_READ_TOKEN=<sanity_viewer_token>
EOF
chmod 600 .env.local
```

> `SANITY_API_READ_TOKEN` is **required** — without it the site falls back to
> local data for all services. `SANITY_API_WRITE_TOKEN` is only needed if you run
> `npm run seed:services`; do not keep it on the running server otherwise.

## 6. Install dependencies + build

```bash
npm ci            # installs dev+prod deps (build needs them)
npm run build
```

## 7. Start with PM2

```bash
pm2 start npm --name smile-island -- run start
pm2 save
pm2 startup       # run the command it prints, to start on reboot
pm2 status
```

The app now listens on `http://127.0.0.1:3000`.

## 8. Nginx reverse proxy

```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/smile-island
```

Paste:

```nginx
server {
    listen 80;
    server_name <DOMAIN> www.<DOMAIN>;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable + reload:

```bash
sudo ln -s /etc/nginx/sites-available/smile-island /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 9. SSL (Certbot)

> Only after DNS points to the VPS (step 10), or use the `--staging` flag to test.

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d <DOMAIN> -d www.<DOMAIN>
sudo certbot renew --dry-run
```

## 10. DNS switch checklist (currently on Netlify)

1. Lower the DNS TTL a few hours **before** the switch (e.g. 300s) for fast rollback.
2. Verify the VPS works first via the IP / a temporary hostname (steps 7–9 green).
3. At your DNS provider, point records at the VPS:
   - `A` `@` → `<SERVER_IP>`
   - `A` `www` → `<SERVER_IP>` (or `CNAME www → <DOMAIN>`)
4. Wait for propagation: `dig <DOMAIN> +short` returns `<SERVER_IP>`.
5. Run Certbot (step 9) once DNS resolves to the VPS.
6. In Sanity → API → CORS origins, add `https://<DOMAIN>` (keep `http://localhost:3000`). No wildcards.
7. Keep Netlify up until the VPS is confirmed, then disable its custom domain.

## 11. Post-deploy test checklist

```bash
curl -I https://<DOMAIN>/en          # 200
curl -I https://<DOMAIN>/ar          # 200
curl -I https://<DOMAIN>/            # 307/308 → /en or /ar
curl -s https://<DOMAIN>/robots.txt  # Sitemap + Host show https://<DOMAIN>
curl -s https://<DOMAIN>/sitemap.xml | head
```

Then in a browser:
- `/en`, `/ar`, a service page (e.g. `/en/services/dental-implants`), `/studio`.
- Service pages show **CMS** data (confirms `SANITY_API_READ_TOKEN` works).
- Canonical/OG URLs use `https://<DOMAIN>` (confirms `NEXT_PUBLIC_SITE_URL`).
- Cookie banner: **Reject** → no `gtm.js` request; **Accept** → `gtm.js?id=GTM-KK964XMZ` loads.
- No `mailto:`, no console/hydration errors.

## 12. Update workflow (after future Git pushes)

```bash
cd /var/www/smile-island
git pull
npm ci             # only if dependencies changed (otherwise skip)
npm run build
pm2 reload smile-island
```

`pm2 reload` does a zero-downtime restart. Use `pm2 logs smile-island` to debug.

---

## Notes
- Changing any `NEXT_PUBLIC_*` value requires a **rebuild** (`npm run build`) — these
  are inlined at build time, not read at runtime.
- Open firewall ports if using `ufw`: `sudo ufw allow 'Nginx Full' && sudo ufw allow OpenSSH`.
- Future analytics (GA4, Meta Pixel, Microsoft Clarity) go **inside GTM**, never in code.
