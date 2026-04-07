let snippets = [];
let filtered = [];
let activeIndex = -1;
let currentSnippet = null;

const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const resultsList = document.getElementById('results');
const detailPanel = document.getElementById('detail');
const detailTitle = document.getElementById('detail-title');
const detailMeta = document.getElementById('detail-meta');
const detailContent = document.getElementById('detail-content');
const countEl = document.getElementById('count');

marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: false,
  gfm: true,
});

snippets = window.SNIPPETS_DATA || [];
populateCategories();
renderList(snippets);

function populateCategories() {
  const cats = [...new Set(snippets.map(s => s.category))].sort();
  cats.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
}

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function search() {
  const query = normalize(searchInput.value.trim());
  const cat = categoryFilter.value;

  filtered = snippets.filter(s => {
    const matchCat = !cat || s.category === cat;
    if (!matchCat) return false;
    if (!query) return true;
    return (
      normalize(s.title).includes(query) ||
      normalize(s.category).includes(query) ||
      (s.subcategory && normalize(s.subcategory).includes(query)) ||
      normalize(s.content).includes(query)
    );
  });

  activeIndex = -1;
  renderList(filtered);

  // Keep current snippet visible if it's still in results
  if (currentSnippet) {
    const still = filtered.find(s => s.path === currentSnippet.path);
    if (!still) clearDetail();
  }
}

function renderList(list) {
  countEl.textContent = `${list.length} snippet${list.length !== 1 ? 's' : ''}`;
  resultsList.innerHTML = '';
  list.forEach((s, i) => {
    const li = document.createElement('li');
    li.className = 'result-item' + (currentSnippet && s.path === currentSnippet.path ? ' active' : '');
    li.dataset.index = i;

    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = s.subcategory ? `${s.category} / ${s.subcategory}` : s.category;

    const title = document.createElement('span');
    title.className = 'result-title';
    title.textContent = s.title;

    li.appendChild(tag);
    li.appendChild(title);
    li.addEventListener('click', () => showSnippet(s, i));
    resultsList.appendChild(li);
  });
}

function showSnippet(s, i) {
  currentSnippet = s;
  activeIndex = i;

  document.querySelectorAll('.result-item').forEach((el, idx) => {
    el.classList.toggle('active', idx === i);
  });

  detailTitle.textContent = s.title;
  detailMeta.textContent = s.subcategory
    ? `${s.category} / ${s.subcategory}`
    : s.category;

  detailContent.innerHTML = marked.parse(s.content);
  detailContent.querySelectorAll('pre code').forEach(el => {
    hljs.highlightElement(el);
  });

  detailPanel.classList.remove('empty');

  // scroll item into view
  const el = resultsList.querySelector(`[data-index="${i}"]`);
  if (el) el.scrollIntoView({ block: 'nearest' });
}

function clearDetail() {
  currentSnippet = null;
  detailTitle.textContent = '';
  detailMeta.textContent = '';
  detailContent.innerHTML = '';
  detailPanel.classList.add('empty');
}

// Keyboard navigation
searchInput.addEventListener('keydown', e => {
  if (!filtered.length) return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
    showSnippet(filtered[activeIndex], activeIndex);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex = Math.max(activeIndex - 1, 0);
    showSnippet(filtered[activeIndex], activeIndex);
  } else if (e.key === 'Enter' && activeIndex >= 0) {
    showSnippet(filtered[activeIndex], activeIndex);
  }
});

searchInput.addEventListener('input', search);
categoryFilter.addEventListener('change', search);

// Copy button
detailContent.addEventListener('click', e => {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;
  const code = btn.closest('pre').querySelector('code').innerText;
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => (btn.textContent = 'Copy'), 1500);
  });
});

// Inject copy buttons after render
const observer = new MutationObserver(() => {
  detailContent.querySelectorAll('pre:not([data-has-copy])').forEach(pre => {
    pre.dataset.hasCopy = '1';
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    pre.appendChild(btn);
  });
});
observer.observe(detailContent, { childList: true, subtree: true });
