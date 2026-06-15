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

function ensureConversionFields() {
  if (!form) return;
  const targetDate = form.querySelector('[name="targetDate"]')?.closest('label');
  if (!form.querySelector('[name="quantity"]')) {
    const quantity = document.createElement('label');
    quantity.innerHTML = 'Estimated quantity<input name="quantity" type="text" placeholder="Example: 100k fry, 20 boxes, 500 stems">';
    form.insertBefore(quantity, targetDate || form.querySelector('button'));
  }
  if (!form.querySelector('[name="urgency"]')) {
    const urgency = document.createElement('label');
    urgency.innerHTML = 'Urgency<select name="urgency"><option value="">Select urgency</option><option>Immediate</option><option>This week</option><option>This month</option><option>Planning only</option></select>';
    form.insertBefore(urgency, targetDate || form.querySelector('button'));
  }
  if (!form.querySelector('[name="preferredContact"]')) {
    const preferred = document.createElement('label');
    preferred.innerHTML = 'Preferred contact<select name="preferredContact"><option value="">Select contact method</option><option>Viber / mobile call</option><option>Email</option><option>Either mobile or email</option></select>';
    const button = form.querySelector('button');
    form.insertBefore(preferred, button);
  }
}

function setInquiry(interest, message, extra = {}) {
  if (!form) return;
  const interestField = form.querySelector('[name="interest"]');
  const messageField = form.querySelector('[name="message"]');
  const urgencyField = form.querySelector('[name="urgency"]');
  const quantityField = form.querySelector('[name="quantity"]');
  const destinationField = form.querySelector('[name="destination"]');
  if (interestField) interestField.value = interest;
  if (urgencyField && extra.urgency) urgencyField.value = extra.urgency;
  if (quantityField && extra.quantity) quantityField.value = extra.quantity;
  if (destinationField && extra.destination) destinationField.value = extra.destination;
  if (messageField) messageField.value = message;
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => form.querySelector('[name="name"]')?.focus({ preventScroll: true }), 500);
}

function addConversionStyles() {
  if (document.querySelector('#conversion-style')) return;
  const style = document.createElement('style');
  style.id = 'conversion-style';
  style.textContent = `
    .conversion-panel,.next-step-panel{border:1px solid var(--line);border-radius:30px;background:rgba(255,253,246,.92);box-shadow:var(--soft-shadow);padding:28px;margin-top:26px}.conversion-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.conversion-option{border:1px solid var(--line);border-radius:22px;background:linear-gradient(135deg,rgba(255,253,246,.96),rgba(216,240,231,.38));padding:18px;text-align:left;color:var(--ink);font-weight:900;transition:.2s ease}.conversion-option:hover{transform:translateY(-2px);box-shadow:var(--soft-shadow)}.conversion-option span{display:block;color:var(--muted);font-size:.76rem;font-weight:1000;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px}.next-step-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:18px 0 0;padding:0}.next-step-list li{list-style:none;border:1px solid var(--line);border-radius:18px;background:rgba(255,253,246,.72);padding:16px;font-weight:900}.sticky-conversion{position:fixed;left:50%;bottom:18px;z-index:120;transform:translateX(-50%);display:flex;gap:10px;align-items:center;border:1px solid rgba(255,255,255,.52);border-radius:999px;background:rgba(16,32,25,.92);color:#fff;box-shadow:0 22px 56px rgba(16,32,25,.28);backdrop-filter:blur(16px);padding:10px}.sticky-conversion a,.sticky-conversion button{border:0;border-radius:999px;background:#fff;color:var(--green);padding:12px 14px;font-weight:1000;white-space:nowrap}.sticky-conversion .sticky-primary{background:linear-gradient(135deg,var(--gold),var(--gold-2));color:#102019}.form-helper{margin:-4px 0 4px;color:var(--muted);font-size:.92rem}.form-confirmation{border:1px solid rgba(19,86,64,.18);border-radius:22px;background:rgba(216,240,231,.5);padding:18px;color:var(--green);font-weight:900}.required-note{color:var(--muted);font-size:.9rem;margin:0}@media(max-width:760px){.conversion-grid,.next-step-list{grid-template-columns:1fr}.sticky-conversion{left:12px;right:12px;bottom:12px;transform:none;justify-content:space-between;border-radius:24px}.sticky-conversion a,.sticky-conversion button{flex:1;padding:12px 10px;font-size:.86rem}.contact-section{padding-bottom:150px}}`;
  document.head.appendChild(style);
}

function addBuyerPathCtas() {
  const heroActions = document.querySelector('.hero-copy .hero-actions');
  if (!heroActions || document.querySelector('[data-buyer-paths]')) return;
  const wrap = document.createElement('div');
  wrap.className = 'hero-actions compact';
  wrap.dataset.buyerPaths = 'true';
  wrap.innerHTML = '<button class="btn btn-ghost" type="button" data-interest="Milkfish fry wholesale">Request fry availability</button><button class="btn btn-ghost" type="button" data-interest="Imported flowers">Request flower catalog</button><button class="btn btn-ghost" type="button" data-interest="Compliance documents">Request buyer documents</button>';
  heroActions.after(wrap);
  wrap.querySelectorAll('[data-interest]').forEach((button) => {
    button.addEventListener('click', () => {
      const interest = button.getAttribute('data-interest') || '';
      const message = interest === 'Milkfish fry wholesale'
        ? 'Please confirm current milkfish fry availability. I will send volume, target date, and receiving location.'
        : interest === 'Imported flowers'
          ? 'Please send the current flower catalog, availability, lead time, and order requirements.'
          : 'Please send the buyer document checklist and available procurement documents for qualified review.';
      setInquiry(interest, message, { urgency: interest === 'Compliance documents' ? 'This week' : '' });
    });
  });
}

function addConversionPanel() {
  if (!form || document.querySelector('[data-conversion-panel]')) return;
  const contactCopy = document.querySelector('.contact-copy') || form.parentElement;
  const panel = document.createElement('div');
  panel.className = 'conversion-panel reveal';
  panel.dataset.conversionPanel = 'true';
  panel.innerHTML = `
    <p class="eyebrow">Fast inquiry paths</p>
    <h3>Choose the closest request. The form will prefill.</h3>
    <div class="conversion-grid">
      <button class="conversion-option" type="button" data-convert="fry"><span>Farm / nursery</span>Check fry availability</button>
      <button class="conversion-option" type="button" data-convert="flowers"><span>Florist / events</span>Request current catalog</button>
      <button class="conversion-option" type="button" data-convert="docs"><span>Procurement</span>Request buyer documents</button>
    </div>
  `;
  contactCopy.appendChild(panel);
  panel.querySelector('[data-convert="fry"]')?.addEventListener('click', () => setInquiry('Milkfish fry wholesale', 'Please confirm milkfish fry availability. Quantity, target date, receiving location, and buyer details are below.', { urgency: 'This week' }));
  panel.querySelector('[data-convert="flowers"]')?.addEventListener('click', () => setInquiry('Imported flowers', 'Please send current imported flower catalog, availability, lead time, and order requirements. Event/date details are below.', { urgency: 'This month' }));
  panel.querySelector('[data-convert="docs"]')?.addEventListener('click', () => setInquiry('Compliance documents', 'Please send the buyer document checklist and available documents for qualified procurement review.', { urgency: 'This week' }));
}

function addNextStepPanel() {
  if (!form || document.querySelector('[data-next-steps]')) return;
  const panel = document.createElement('div');
  panel.className = 'next-step-panel reveal';
  panel.dataset.nextSteps = 'true';
  panel.innerHTML = `
    <p class="eyebrow">After you send</p>
    <h3>What Euro-Fish needs to move fast.</h3>
    <ul class="next-step-list">
      <li>Product + estimated quantity</li>
      <li>Target date + receiving location</li>
      <li>Buyer type + document needs</li>
    </ul>
    <p class="required-note">Best inquiries include enough detail for availability, quotation, documents, and receiving coordination.</p>
  `;
  form.appendChild(panel);
}

function addStickyConversionBar() {
  if (document.querySelector('[data-sticky-conversion]')) return;
  const bar = document.createElement('div');
  bar.className = 'sticky-conversion';
  bar.dataset.stickyConversion = 'true';
  bar.innerHTML = '<a class="sticky-primary" href="#contact">Request quote</a><a href="tel:+639178004764">Call</a><button type="button">Docs</button>';
  document.body.appendChild(bar);
  bar.querySelector('button')?.addEventListener('click', () => setInquiry('Compliance documents', 'Please send the buyer document checklist and available documents for qualified review.', { urgency: 'This week' }));
}

function enhanceFormCopy() {
  if (!form || document.querySelector('[data-form-helper]')) return;
  const helper = document.createElement('p');
  helper.className = 'form-helper';
  helper.dataset.formHelper = 'true';
  helper.textContent = 'For faster response, include quantity, date, destination, buyer type, and document needs.';
  form.prepend(helper);
  const button = form.querySelector('button[type="submit"]');
  if (button) button.textContent = 'Send buyer-ready inquiry';
}

function showConfirmation(payload) {
  if (!form) return;
  let box = form.querySelector('.form-confirmation');
  if (!box) {
    box = document.createElement('div');
    box.className = 'form-confirmation';
    form.prepend(box);
  }
  box.innerHTML = `Inquiry prepared for <strong>${payload.interest || 'buyer review'}</strong>. Next: Euro-Fish needs quantity, date, destination, and document needs to quote properly.`;
}

function addTrustCenter() {
  if (document.querySelector('[data-trust-center]')) return;
  const anchor = document.querySelector('#proof-pack') || document.querySelector('#process') || document.querySelector('#contact');
  if (!anchor) return;
  const section = document.createElement('section');
  section.className = 'section trust-center reveal';
  section.dataset.trustCenter = 'true';
  section.id = 'trust-center';
  section.innerHTML = `<div class="container"><div class="section-heading"><p class="eyebrow">Trust center</p><h2>Credibility built on transparency, not hype.</h2><p>Euro-Fish Trades should be judged by how clearly it handles buyer details, documents, quotation boundaries, receiving requirements, and principal accountability. The site now makes those rules visible before a buyer sends an inquiry.</p></div><div class="trust-grid"><article class="trust-card trust-card-strong"><span>01</span><h3>Documents are available by qualified request</h3><p>Relevant business, accreditation, quotation, and shipment-related documents are positioned as buyer proof — not public decoration. Sensitive files should be verified, redacted, and shared only with qualified buyers.</p></article><article class="trust-card"><span>02</span><h3>No unsupported dominance claims</h3><p>The site avoids risky claims like “No. 1,” “largest,” “exclusive,” or “market leader” unless those can be proven with official documents.</p></article><article class="trust-card"><span>03</span><h3>Principal-led communication</h3><p>Serious buyers are routed toward direct principal oversight for timing, volume, documentation, quotation, and receiving coordination.</p></article><article class="trust-card"><span>04</span><h3>Buyer qualification before quote</h3><p>The inquiry flow asks for company name, buyer type, product, estimated quantity, target date, destination, urgency, and document needs before serious quotation.</p></article><article class="trust-card"><span>05</span><h3>Receiving-risk controls</h3><p>Live fry and perishable flowers require receiving-party readiness. The site makes timing, location, and handoff details part of the buying process.</p></article><article class="trust-card"><span>06</span><h3>Clear commercial boundaries</h3><p>Availability, order size, pricing, and shipment timing are confirmed per transaction. The site does not imply guaranteed stock or fixed terms without confirmation.</p></article></div><div class="trust-note"><strong>Credibility rule:</strong> publish only what can be verified, redact what is sensitive, and move serious buyers into a documented inquiry-to-quote process.</div></div>`;
  anchor.before(section);
}

function applyBuyerFacingPolish() {
  applyBrandName();
  applyImageLayer();
  addConversionStyles();
  ensureConversionFields();
  enhanceFormCopy();
  addBuyerPathCtas();
  addConversionPanel();
  addNextStepPanel();
  addStickyConversionBar();
  addTrustCenter();
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
    `Company / business: ${payload.company || 'Not provided'}`,
    `Email: ${payload.email}`,
    `Phone / Viber: ${payload.phone || 'Not provided'}`,
    `Preferred contact: ${payload.preferredContact || 'Not provided'}`,
    `Buyer type: ${payload.buyerType}`,
    `Interested in: ${payload.interest}`,
    `Estimated quantity: ${payload.quantity || 'Not provided'}`,
    `Urgency: ${payload.urgency || 'Not provided'}`,
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
    company: String(data.get('company') || '').trim(),
    email: String(data.get('email') || '').trim(),
    phone: String(data.get('phone') || '').trim(),
    preferredContact: String(data.get('preferredContact') || '').trim(),
    buyerType: String(data.get('buyerType') || '').trim(),
    interest: String(data.get('interest') || '').trim(),
    quantity: String(data.get('quantity') || '').trim(),
    urgency: String(data.get('urgency') || '').trim(),
    targetDate: String(data.get('targetDate') || '').trim(),
    destination: String(data.get('destination') || '').trim(),
    message: String(data.get('message') || '').trim(),
    source: window.location.pathname
  };

  if (!payload.name || !payload.email || !payload.buyerType || !payload.interest || !payload.message) {
    if (statusNode) statusNode.textContent = 'Complete the required fields before sending.';
    return;
  }
  if (!payload.quantity || !payload.destination || !payload.targetDate) {
    if (statusNode) statusNode.textContent = 'Tip: quantity, target date, and destination help Euro-Fish quote faster.';
  }

  saveInquiry(payload);
  showConfirmation(payload);
  if (statusNode) statusNode.textContent = 'Preparing your buyer-ready inquiry...';

  try {
    await submitToBackend(payload);
    if (statusNode) statusNode.textContent = 'Inquiry received. Euro-Fish will contact you directly.';
    form.reset();
  } catch {
    if (statusNode) statusNode.textContent = 'Opening your email app with the full inquiry. Send the prepared email to complete the request.';
    window.location.href = buildMailto(payload);
  }
});

docButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const request = button.getAttribute('data-doc-request') || 'Compliance documents';
    setInquiry('Compliance documents', `Please send buyer documentation for: ${request}.`, { urgency: 'This week' });
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
