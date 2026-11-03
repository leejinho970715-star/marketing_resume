import { mkdir, readdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Package the growth portfolio alone; leave the GitHub Pages source intact.
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(repo, '.preview', 'vercel-growth-portfolio');
const origin = new URL(process.argv[2] || 'https://eungyu-growth-portfolio.vercel.app');
if (origin.protocol !== 'https:' || origin.pathname !== '/') {
  throw new Error('Provide an HTTPS site origin without a subdirectory.');
}
const site = origin.origin + '/';
const github = 'https://leejinho970715-star.github.io/marketing_resume/';
const oldPortfolio = github + 'growth-portfolio/';
const allowed = new Set(['.png', '.webp', '.svg', '.pdf', '.woff2', '.js', '.txt']);
let files = 0;
async function copyAssets(from, to) {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) await copyAssets(source, target);
    else if (allowed.has(path.extname(entry.name))) {
      await copyFile(source, target);
      files++;
    }
  }
}
await mkdir(output, { recursive: true });
await copyAssets(path.join(repo, 'growth-portfolio', 'assets'), path.join(output, 'assets'));
await copyAssets(path.join(repo, 'growth-pm', 'assets', 'clay'), path.join(output, 'shared', 'clay'));
await copyAssets(path.join(repo, 'growth-pm', 'assets', 'tools'), path.join(output, 'shared', 'tools'));
await copyAssets(path.join(repo, 'assets', 'fonts'), path.join(output, 'shared', 'fonts'));

let html = await readFile(path.join(repo, 'growth-portfolio', 'index.html'), 'utf8');
html = html.replaceAll(oldPortfolio, site)
  .replaceAll('../growth-pm/assets/clay/', 'shared/clay/')
  .replaceAll('../growth-pm/assets/tools/', 'shared/tools/')
  .replaceAll('../assets/fonts/', 'shared/fonts/');
await writeFile(path.join(output, 'index.html'), html);
let css = await readFile(path.join(repo, 'growth-portfolio', 'styles.css'), 'utf8');
css = css.replaceAll('../assets/fonts/', 'shared/fonts/');
await writeFile(path.join(output, 'styles.css'), css);
await copyFile(path.join(repo, 'growth-portfolio', 'script.js'), path.join(output, 'script.js'));
await writeFile(path.join(output, 'vercel.json'), JSON.stringify({
  $schema: 'https://openapi.vercel.sh/vercel.json',
  framework: null,
  cleanUrls: true,
  redirects: [{ source: '/growth-portfolio', destination: '/', permanent: false }],
}, null, 2) + '\n');
await writeFile(path.join(output, '.vercelignore'), '.git\nnode_modules\n');
await writeFile(path.join(output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site}sitemap.xml\n`);
await writeFile(path.join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site}</loc></url></urlset>\n`);
console.log(JSON.stringify({ output, site, assetFiles: files, status: 'ready' }));
