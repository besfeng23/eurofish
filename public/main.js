const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const header = document.querySelector('[data-header]');
const form = document.querySelector('[data-inquiry-form]');
const statusNode = document.querySelector('[data-form-status]');
const copyButtons = document.querySelectorAll('[data-copy]');
const docButtons = document.querySelectorAll('[data-doc-request]');
const STORAGE_KEY = 'eurofish_inquiries_v2';

const imageSet = {
  liveCargo: 'https://ispweb.pcaarrd.dost.gov.ph/wp-content/uploads/2021/11/Transport-of-Milkfish-Fry-1024x576.jpg',
  fryBasins: 'https://www.seafdec.org.ph/wp-content/uploads/2021/06/milkfish-fry-in-basins-1-scaled.jpg',
  anthurium: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Aanthurium.JPG',
  orchid: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Orchid_Flower_%28181043279%29.jpeg'
};

function setPhotoBackground(selector, url, label) {
  document.querySelectorAll(selector).forEach((node) => {
    node.style.backgroundImage = `linear-gradient(135deg, rgba(9, 47, 37, 0.46), rgba(9, 47, 37, 0.16)), url("${url}")`;
    node.style.backgroundSize = 'cover';
    node.style.backgroundPosition = 'center';
    const badge = node.querySelector('span');
    if (badge && label) badge.textContent = label;
  });
}

function applyImageLayer() {
  setPhotoBackground('.live-cargo', imageSet.liveCargo, 'Milkfish fry transport coordination');
  setPhotoBackground('.principal-shot', imageSet.fryBasins, 'Aquaculture sourcing desk');
  setPhotoBackground('.documents-shot', imageSet.fryBasins, 'Shipment readiness review');
  setPhotoBackground('.catalog-art.exotic', imageSet.anthurium, '');
  setPhotoBackground('.catalog-art.orchid', imageSet.orchid, '');
}

function applyBrandName() {
  document.title = document.title.replaceAll('1064 Euro-Fish Trading', '1064 Euro-Fish Trades').replaceAll('Euro-Fish Trading', 'Euro-Fish Trades');
  document.querySelectorAll('meta[content], [aria-label], [title]').forEach((node) => {
    ['content', 'aria-label', 'title'].forEach((attribute) => {
      const value = node.getAttribute(attribute);
      if (value) node.setAttribute(attribute, value.replaceAll('1064 Euro-Fish Trading', '1064 Euro-Fish Trades').replaceAll('Euro-Fish Trading', 'Euro-Fish Trades'));
    });
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    node.nodeValue = node.nodeValue.replaceAll('1064 Euro-Fish Trading', '1064 Euro-Fish Trades').replaceAll('Euro-Fish Trading', 'Euro-Fish Trades');
  });
}

function applyBuyerFacingPolish() {
  applyBrandName();
  applyImageLayer();
  document.querySelectorAll('.photo-slot span').forEach((node) => {
    const text = node.textContent.toLowerCase();
    if (text.includes('replace')) node.textContent = 'Operational coordination available';
    if (text.includes('document')) node.textContent = 'Documents available upon request';
  });

  document.querySelectorAll('a[href="/admin/"], a[href="/admin.html"]').forEach((link) => {
    const text = link.textContent.toLowerCase();
    if (text.includes('dashboard') || text.includes('admin')) link.remove();
  });

  document.querySelectorAll('.document-card p').forEach((node) => {
    node.textContent = node.textContent
      .replace('Add current validity date, document number, and redacted preview.', 'Documentation may be shared with qualified buyers upon request, subject to verification and appropriate redaction.')
      .replace('Add permitted business registration details and principal confirmation.', 'Business profile information may be shared with qualified buyers upon request.')
      .replace('Show how serious buyers receive formal quote, confirmation, and payment terms.', 'Formal quote, confirmation, and payment terms are handled per transaction.');
  });
}

function closeNav() {
  document.body.classList.remove('nav-open');
  nav?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
}

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  document.body.classList.toggle('nav-open', !isOpen);
  nav?.classList.toggle('is-open', !isOpen);
  navToggle.setAttribute('aria-expanded', String(!isOpen));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeNav(); });

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.getAttribute('data-copy') || '';
    try {
      await navigator.clipboard.writeText(value);
      const label = button.querySelector('span');
      if (label) label.textContent = 'Copied';
    } catch {
      window.location.href = `tel:${value}`;
    }
  });
});

function getSavedInquiries() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveInquiry(payload) {
  const inquiries = getSavedInquiries();
  inquiries.unshift({ ...payload, status: 'New', createdAt: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries.slice(0, 100)));
}

function buildMailto(payload) {
  const subject = encodeURIComponent(`Euro-Fish Inquiry: ${payload.interest}`);
  const body = encodeURIComponent([
    `Full name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone / Viber: ${payload.phone || 'Not provided'}`,
    `Buyer type: ${payload.buyerType}`,
    `Interested in: ${payload.interest}`,
    `Target date: ${payload.targetDate || 'Not provided'}`,
    `Destination: ${payload.destination || 'Not provided'}`,
    '',
    'Message:',
    payload.message
  ].join('\n'));
  return `mailto:joevyrosario@gmail.com?subject=${subject}&body=${body}`;
}

async function submitToBackend(payload) {
  const response = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Inquiry service unavailable');
  return response.json();
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const payload = {
    name: String(data.get('name') || '').trim(),
    email: String(data.get('email') || '').trim(),
    phone: String(data.get('phone') || '').trim(),
    buyerType: String(data.get('buyerType') || '').trim(),
    interest: String(data.get('interest') || '').trim(),
    targetDate: String(data.get('targetDate') || '').trim(),
    destination: String(data.get('destination') || '').trim(),
    message: String(data.get('message') || '').trim(),
    source: window.location.pathname
  };

  if (!payload.name || !payload.email || !payload.buyerType || !payload.interest || !payload.message) {
    if (statusNode) statusNode.textContent = 'Complete the required fields before sending.';
    return;
  }

  saveInquiry(payload);
  if (statusNode) statusNode.textContent = 'Preparing your inquiry...';

  try {
    await submitToBackend(payload);
    if (statusNode) statusNode.textContent = 'Inquiry received. Euro-Fish will contact you directly.';
    form.reset();
  } catch {
    if (statusNode) statusNode.textContent = 'Opening your email app with the full inquiry.';
    window.location.href = buildMailto(payload);
  }
});

docButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const request = button.getAttribute('data-doc-request') || 'Compliance documents';
    const interest = form?.querySelector('[name="interest"]');
    const message = form?.querySelector('[name="message"]');
    if (interest) interest.value = 'Compliance documents';
    if (message) message.value = `Please send buyer documentation for: ${request}.`;
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
if ('IntersectionObserver' in window && sections.length && links.length) {
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0.01 });
  sections.forEach((section) => activeObserver.observe(section));
}

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
}, { passive: true });

applyBuyerFacingPolish();
