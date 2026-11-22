# Voranitha Changduong — Lead Frontend & Full-Stack AI Portfolio

Interactive engineering portfolio showcasing high-traffic media platforms (Nation Group), production AI workflows (n8n + Google Gemini 2.5 Flash, Cross-Domain Auth0 SSO → BigQuery/Power BI → LINE OA), travel-tech booking systems (TravisGo), and enterprise full-stack works.

## Live Deployment Targets

- **GitHub Pages**: `https://voranitha-dev.github.io/portfolio/`
- **Repository**: `https://github.com/voranitha-dev/portfolio.git`
- **Vercel**: Zero-config static SPA via `vercel.json`

## Local Development

```bash
npm install
npm run dev
```

## Production Builds

```bash
# Root path build (Vercel / custom domain)
npm run build

# GitHub Pages subpath build (/portfolio/)
npm run build:gh-pages
```

## Deploy to GitHub Pages (Automatic via GitHub Actions)

1. Push the `main` branch to `https://github.com/voranitha-dev/portfolio.git`:
   ```bash
   git push -u origin main
   ```
2. Open your repository on GitHub → **Settings** → **Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. The workflow `.github/workflows/deploy.yml` will automatically build with `GITHUB_PAGES=true` and publish your site to `https://voranitha-dev.github.io/portfolio/`.
