'use strict';

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = __dirname;
const SNIPPETS_DIR = path.join(ROOT, 'snippets');

function slugToTitle(slug) {
  return slug
    .replace(/-_|_-/g, '\x00')
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\x00/g, ' - ');
}

function walkCategories() {
  const categories = {};

  for (const entry of fs.readdirSync(SNIPPETS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const catPath = path.join(SNIPPETS_DIR, entry.name);
    const directSnippets = [];
    const subcategories = {};

    for (const item of fs.readdirSync(catPath, { withFileTypes: true })) {
      if (item.isDirectory()) {
        const subPath = path.join(catPath, item.name);
        const subFiles = fs.readdirSync(subPath).filter(f => f.endsWith('.md'));
        if (subFiles.length > 0) {
          subcategories[item.name] = subFiles.map(file => ({
            title: slugToTitle(path.basename(file, '.md')),
            mdPath: path.join(subPath, file),
            htmlFile: path.basename(file, '.md') + '.html',
            relHref: `snippets/${entry.name}/${item.name}/${path.basename(file, '.md')}.html`,
            category: entry.name,
            subcategory: item.name,
          }));
        }
      } else if (item.name.endsWith('.md')) {
        directSnippets.push({
          title: slugToTitle(path.basename(item.name, '.md')),
          mdPath: path.join(catPath, item.name),
          htmlFile: path.basename(item.name, '.md') + '.html',
          relHref: `snippets/${entry.name}/${path.basename(item.name, '.md')}.html`,
          category: entry.name,
        });
      }
    }

    if (directSnippets.length > 0 || Object.keys(subcategories).length > 0) {
      categories[entry.name] = { snippets: directSnippets, subcategories };
    }
  }

  return categories;
}

const SNIPPET_STYLE = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0d1117;
    color: #e6edf3;
    padding: 40px 48px;
    max-width: 900px;
    margin: 0 auto;
  }
  nav {
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
  }
  nav a { color: #58a6ff; text-decoration: none; }
  nav a:hover { text-decoration: underline; }
  nav .sep { color: #484f58; }
  nav .current { color: #8b949e; }
  h1 {
    font-size: 24px;
    font-weight: 700;
    color: #f0f6fc;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #21262d;
  }
  h2 { font-size: 18px; font-weight: 600; color: #f0f6fc; margin: 28px 0 12px; }
  h3 { font-size: 15px; font-weight: 600; color: #e6edf3; margin: 20px 0 8px; }
  p { color: #e6edf3; font-size: 14px; line-height: 1.7; margin-bottom: 16px; }
  pre {
    margin: 16px 0;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #30363d;
  }
  pre code.hljs {
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace !important;
    font-size: 13px !important;
    padding: 20px !important;
    display: block;
    line-height: 1.6;
  }
  code:not(pre code) {
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 12px;
    font-family: monospace;
    color: #e6edf3;
  }
  ul, ol { padding-left: 24px; margin-bottom: 16px; }
  li { font-size: 14px; line-height: 1.7; margin-bottom: 4px; }
  strong { color: #f0f6fc; }
  hr { border: none; border-top: 1px solid #21262d; margin: 24px 0; }
`;

function buildSnippetPage(snippet) {
  const md = fs.readFileSync(snippet.mdPath, 'utf-8');
  const body = marked.parse(md);

  const backLevels = snippet.subcategory ? '../../../' : '../../';

  const crumbs = [
    `<a href="${backLevels}index.html">Chelobotix Snippets</a>`,
    `<span class="sep">/</span>`,
    `<span class="current">${snippet.category}</span>`,
  ];
  if (snippet.subcategory) {
    crumbs.push(`<span class="sep">/</span>`, `<span class="current">${snippet.subcategory}</span>`);
  }
  crumbs.push(`<span class="sep">/</span>`, `<span class="current">${snippet.title}</span>`);

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${snippet.title} · ${snippet.category} · Chelobotix Snippets</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
  <style>${SNIPPET_STYLE}</style>
</head>
<body>
  <nav>${crumbs.join('\n    ')}</nav>
  <main>${body}</main>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script>hljs.highlightAll();</script>
</body>
</html>`;

  fs.writeFileSync(
    path.join(path.dirname(snippet.mdPath), snippet.htmlFile),
    html,
    'utf-8'
  );
}

function buildIndex(categories) {
  const allSnippets = [];
  for (const [cat, catData] of Object.entries(categories)) {
    for (const s of catData.snippets) {
      allSnippets.push({ title: s.title, href: s.relHref, category: cat });
    }
    for (const [subcat, snippets] of Object.entries(catData.subcategories)) {
      for (const s of snippets) {
        allSnippets.push({ title: s.title, href: s.relHref, category: cat, subcategory: subcat });
      }
    }
  }

  const total = allSnippets.length;
  const catCount = Object.keys(categories).length;

  const sections = Object.entries(categories).map(([cat, catData]) => {
    const snippetCount = catData.snippets.length +
      Object.values(catData.subcategories).reduce((n, ss) => n + ss.length, 0);

    const directItems = catData.snippets
      .map(s => `            <li><a href="${s.relHref}">${s.title}</a></li>`)
      .join('\n');

    const subSections = Object.entries(catData.subcategories).map(([subcat, snippets]) => {
      const subItems = snippets
        .map(s => `              <li><a href="${s.relHref}">${s.title}</a></li>`)
        .join('\n');
      return `
          <div class="subcategory">
            <h3>${subcat}</h3>
            <ul class="snippets-grid">
${subItems}
            </ul>
          </div>`;
    }).join('');

    const bodyContent = [
      directItems ? `          <ul class="snippets-grid">\n${directItems}\n          </ul>` : '',
      subSections,
    ].filter(Boolean).join('\n');

    return `    <details class="category">
      <summary>
        <div class="summary-left">
          <span class="cat-arrow">&#9654;</span>
          <span class="cat-name">${cat}</span>
        </div>
        <span class="cat-count">${snippetCount}</span>
      </summary>
      <div class="cat-body">
${bodyContent}
      </div>
    </details>`;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chelobotix Snippets</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0d1117;
      color: #e6edf3;
      padding: 48px;
      max-width: 960px;
      margin: 0 auto;
    }
    header { margin-bottom: 32px; }
    header h1 { font-size: 28px; font-weight: 700; color: #f0f6fc; margin-bottom: 8px; }
    header p { color: #8b949e; font-size: 14px; }
    .badge {
      display: inline-block;
      margin-top: 12px;
      background: #21262d;
      border: 1px solid #30363d;
      border-radius: 20px;
      padding: 4px 12px;
      font-size: 12px;
      color: #8b949e;
    }

    /* Search */
    .search-wrap { position: relative; margin-bottom: 28px; }
    .search-icon {
      position: absolute;
      left: 13px;
      top: 50%;
      transform: translateY(-50%);
      color: #484f58;
      pointer-events: none;
      width: 16px;
      height: 16px;
    }
    .search-input {
      width: 100%;
      padding: 11px 70px 11px 40px;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      color: #e6edf3;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }
    .search-input::placeholder { color: #484f58; }
    .search-input:focus { border-color: #58a6ff; }
    .search-kbd {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: #21262d;
      border: 1px solid #30363d;
      border-radius: 4px;
      padding: 2px 7px;
      font-size: 11px;
      color: #8b949e;
      pointer-events: none;
      transition: opacity 0.2s;
    }

    /* Search results */
    #search-results { display: none; }
    #search-results.visible { display: block; }
    .results-meta { font-size: 12px; color: #8b949e; margin-bottom: 12px; }
    .results-grid {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 8px;
    }
    .results-grid li a {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 10px 14px;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      color: #58a6ff;
      text-decoration: none;
      font-size: 13px;
      transition: all 0.15s;
    }
    .results-grid li a:hover { background: #21262d; border-color: #58a6ff; }
    .result-cat { font-size: 11px; color: #8b949e; }
    mark { background: transparent; color: #f0f6fc; font-weight: 700; }
    .no-results { color: #8b949e; font-size: 14px; padding: 24px 0; text-align: center; }

    /* Accordion */
    details.category {
      border: 1px solid #21262d;
      border-radius: 8px;
      margin-bottom: 6px;
      overflow: hidden;
    }
    details.category > summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 18px;
      cursor: pointer;
      background: #161b22;
      user-select: none;
      list-style: none;
      transition: background 0.15s;
    }
    details.category > summary::-webkit-details-marker { display: none; }
    details.category > summary::marker { display: none; content: ''; }
    details.category > summary:hover { background: #1c2128; }
    details.category[open] > summary { background: #1c2128; border-bottom: 1px solid #21262d; }
    .summary-left { display: flex; align-items: center; gap: 10px; }
    .cat-arrow {
      color: #8b949e;
      font-size: 9px;
      transition: transform 0.2s;
      display: inline-block;
    }
    details[open] .cat-arrow { transform: rotate(90deg); }
    .cat-name { font-size: 15px; font-weight: 600; color: #f0f6fc; }
    .cat-count {
      background: #21262d;
      border: 1px solid #30363d;
      border-radius: 12px;
      padding: 2px 9px;
      font-size: 11px;
      color: #8b949e;
    }
    .cat-body { padding: 16px 18px; }
    .snippets-grid {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      gap: 7px;
    }
    .snippets-grid li a {
      display: block;
      padding: 8px 12px;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 6px;
      color: #58a6ff;
      text-decoration: none;
      font-size: 13px;
      transition: all 0.15s;
    }
    .snippets-grid li a:hover {
      background: #21262d;
      border-color: #58a6ff;
      color: #79c0ff;
      transform: translateY(-1px);
    }
    .subcategory { margin-top: 16px; }
    .subcategory h3 {
      font-size: 11px;
      font-weight: 600;
      color: #8b949e;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 8px;
      padding-bottom: 6px;
      border-bottom: 1px solid #21262d;
    }
  </style>
</head>
<body>
  <header>
    <h1>Chelobotix Snippets</h1>
    <p>Colección personal de snippets de ingeniería de software.</p>
    <span class="badge">${total} snippet${total !== 1 ? 's' : ''} &middot; ${catCount} categor${catCount !== 1 ? 'ías' : 'ía'}</span>
  </header>

  <div class="search-wrap">
    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
    <input id="search" class="search-input" type="text" placeholder="Buscar snippets… (Ctrl+K)" autocomplete="off" spellcheck="false">
    <span class="search-kbd" id="kbd-hint">Ctrl+K</span>
  </div>

  <div id="search-results">
    <p class="results-meta" id="results-meta"></p>
    <ul class="results-grid" id="results-list"></ul>
    <p class="no-results" id="no-results" style="display:none">Sin resultados para esta búsqueda.</p>
  </div>

  <div id="categories">
${sections}
  </div>

  <script>
    const ALL = ${JSON.stringify(allSnippets)};

    const input    = document.getElementById('search');
    const panel    = document.getElementById('search-results');
    const list     = document.getElementById('results-list');
    const meta     = document.getElementById('results-meta');
    const noRes    = document.getElementById('no-results');
    const catPanel = document.getElementById('categories');
    const kbdHint  = document.getElementById('kbd-hint');

    function hl(text, q) {
      const i = text.toLowerCase().indexOf(q);
      if (i === -1) return text;
      return text.slice(0, i) + '<mark>' + text.slice(i, i + q.length) + '</mark>' + text.slice(i + q.length);
    }

    function search(q) {
      if (!q) {
        panel.classList.remove('visible');
        catPanel.style.display = '';
        kbdHint.style.opacity = '1';
        return;
      }
      catPanel.style.display = 'none';
      panel.classList.add('visible');
      kbdHint.style.opacity = '0';

      const matches = ALL.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.subcategory && s.subcategory.toLowerCase().includes(q))
      );

      if (matches.length === 0) {
        list.innerHTML = '';
        noRes.style.display = 'block';
        meta.textContent = '';
      } else {
        noRes.style.display = 'none';
        meta.textContent = matches.length + ' resultado' + (matches.length !== 1 ? 's' : '');
        list.innerHTML = matches.map(s => {
          const cat = s.subcategory ? s.category + ' / ' + s.subcategory : s.category;
          return '<li><a href="' + s.href + '"><span>' + hl(s.title, q) + '</span><span class="result-cat">' + cat + '</span></a></li>';
        }).join('');
      }
    }

    input.addEventListener('input', () => search(input.value.trim().toLowerCase()));

    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        input.focus();
        input.select();
      }
      if (e.key === 'Escape' && document.activeElement === input) {
        input.value = '';
        search('');
        input.blur();
      }
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(ROOT, 'index.html'), html, 'utf-8');
}

// --- main ---
const categories = walkCategories();

let total = 0;
for (const catData of Object.values(categories)) {
  total += catData.snippets.length;
  for (const ss of Object.values(catData.subcategories)) total += ss.length;
}

console.log('Building snippets...');
for (const catData of Object.values(categories)) {
  for (const snippet of catData.snippets) {
    buildSnippetPage(snippet);
    console.log(`  ✓ ${snippet.relHref}`);
  }
  for (const snippets of Object.values(catData.subcategories)) {
    for (const snippet of snippets) {
      buildSnippetPage(snippet);
      console.log(`  ✓ ${snippet.relHref}`);
    }
  }
}

buildIndex(categories);
console.log('  ✓ index.html');
console.log(`\nDone. ${total} snippet(s) built.`);
