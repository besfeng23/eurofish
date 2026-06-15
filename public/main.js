const form = document.querySelector('[data-inquiry-form]');
const statusNode = document.querySelector('[data-form-status]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const PRINCIPAL_PHONE = '+639178004764';
const PRINCIPAL_EMAIL = 'joevyrosario@gmail.com';

function setStatus(message, type = 'info') {
  if (!statusNode) return;
  statusNode.textContent = message;
  statusNode.dataset.type = type;
}

function encodeInquiryBody(kind = 'General buyer inquiry') {
  return encodeURIComponent([
    `Inquiry type: ${kind}`,
    'Estimated quantity:',
    'Destination / receiving location:',
    'Target receiving date:',
    'Buyer type:',
    'Company / business name:',
    'Preferred contact method:',
    'Documents needed:',
    '',
    'Message / notes:'
  ].join('\n'));
}

function buildMailto(kind = 'General buyer inquiry') {
  const subject = encodeURIComponent(`Euro-Fish Quick Inquiry: ${kind}`);
  return `mailto:${PRINCIPAL_EMAIL}?subject=${subject}&body=${encodeInquiryBody(kind)}`;
}

function prefillInquiry(interest, message) {
  if (!form) return;
  const interestField = form.querySelector('[name="interest"]');
  const messageField = form.querySelector('[name="message"]');
  if (interestField) interestField.value = interest;
  if (messageField) messageField.value = message;
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => form.querySelector('[name="quantity"], [name="destination"], [name="targetDate"], [name="name"]')?.focus({ preventScroll: true }), 500);
}

function hardenContactLinks() {
  document.querySelectorAll('a[href*="0917"], a[href*="639178004764"], a[href^="tel:"]').forEach((link) => {
    const text = `${link.textContent} ${link.getAttribute('href') || ''}`.toLowerCase();
    if (text.includes('viber')) {
      link.setAttribute('href', `viber://chat?number=%2B639178004764`);
      link.setAttribute('aria-label', 'Message Euro-Fish Trades on Viber');
    } else {
      link.setAttribute('href', `tel:${PRINCIPAL_PHONE}`);
      link.setAttribute('aria-label', 'Call Euro-Fish Trades principal');
    }
  });

  document.querySelectorAll('a[href^="mailto:"], a[href*="joevyrosario"]').forEach((link) => {
    link.setAttribute('href', `mailto:${PRINCIPAL_EMAIL}`);
  });
}

function addQuickInquirySticky() {
  if (document.querySelector('[data-quick-inquiry]')) return;
  const bar = document.createElement('div');
  bar.className = 'quick-inquiry-bar';
  bar.dataset.quickInquiry = 'true';
  bar.innerHTML = `
    <a class="quick-primary" href="${buildMailto('Milkfish fry / imported flowers')}" aria-label="Open email quick inquiry template">Quick Inquiry</a>
    <a href="tel:${PRINCIPAL_PHONE}" aria-label="Call Euro-Fish Trades">Call</a>
    <a href="viber://chat?number=%2B639178004764" aria-label="Message Euro-Fish Trades on Viber">Viber</a>
  `;
  document.body.appendChild(bar);
}

function addQuickInquiryPanel() {
  if (!form || document.querySelector('[data-quick-panel]')) return;
  const contactCopy = document.querySelector('.contact-copy') || form.parentElement;
  const panel = document.createElement('div');
  panel.className = 'quick-inquiry-panel';
  panel.dataset.quickPanel = 'true';
  panel.innerHTML = `
    <p class="eyebrow">Quick inquiry</p>
    <h3>Open a buyer-ready email template.</h3>
    <p>Best for buyers on mobile. The email template asks for quantity, destination, target date, buyer type, and documents needed.</p>
    <div class="quick-panel-actions">
      <a href="${buildMailto('Milkfish fry availability')}">Fry availability email</a>
      <a href="${buildMailto('Imported flower catalog')}">Flower catalog email</a>
      <a href="${buildMailto('Buyer documents')}">Document request email</a>
    </div>
  `;
  contactCopy.appendChild(panel);
}

function addOrderingProgress() {
  const list = document.querySelector('.process-list');
  if (!list || document.querySelector('[data-order-progress]')) return;
  const items = [...list.querySelectorAll('li')];
  const progress = document.createElement('div');
  progress.className = 'order-progress';
  progress.dataset.orderProgress = 'true';
  progress.innerHTML = `
    <div class="order-progress-head">
      <span>Ordering progress</span>
      <strong data-progress-label>Step 1 of ${items.length}</strong>
    </div>
    <div class="order-progress-track"><i data-progress-bar></i></div>
    <div class="order-progress-steps">
      ${items.map((item, index) => `<button type="button" data-step="${index}">${String(index + 1).padStart(2, '0')}<span>${item.querySelector('h3')?.textContent || `Step ${index + 1}`}</span></button>`).join('')}
    </div>
  `;
  list.before(progress);

  const bar = progress.querySelector('[data-progress-bar]');
  const label = progress.querySelector('[data-progress-label]');
  const buttons = [...progress.querySelectorAll('[data-step]')];

  function setStep(index) {
    const safeIndex = Math.max(0, Math.min(index, items.length - 1));
    const pct = items.length <= 1 ? 100 : (safeIndex / (items.length - 1)) * 100;
    if (bar) bar.style.width = `${pct}%`;
    if (label) label.textContent = `Step ${safeIndex + 1} of ${items.length}`;
    buttons.forEach((button, i) => button.classList.toggle('is-active', i <= safeIndex));
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.step || 0);
      items[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setStep(index);
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setStep(items.indexOf(entry.target));
      });
    }, { rootMargin: '-35% 0px -45% 0px', threshold: 0.05 });
    items.forEach((item) => observer.observe(item));
  }
  setStep(0);
}

function addActionableStyles() {
  if (document.querySelector('#actionable-cta-style')) return;
  const style = document.createElement('style');
  style.id = 'actionable-cta-style';
  style.textContent = `
    .quick-inquiry-bar{position:fixed;left:50%;bottom:16px;z-index:180;transform:translateX(-50%);display:flex;gap:8px;align-items:center;border:1px solid rgba(255,255,255,.45);border-radius:999px;background:rgba(16,32,25,.94);box-shadow:0 22px 56px rgba(16,32,25,.28);backdrop-filter:blur(16px);padding:9px}.quick-inquiry-bar a{border-radius:999px;background:#fff;color:#092f25;padding:12px 14px;font-weight:1000;white-space:nowrap}.quick-inquiry-bar .quick-primary{background:linear-gradient(135deg,#b98b37,#e1c884);color:#102019}.quick-inquiry-panel{border:1px solid var(--line);border-radius:28px;background:rgba(255,253,246,.92);box-shadow:var(--soft-shadow);padding:24px;margin-top:24px}.quick-inquiry-panel p{color:var(--muted)}.quick-panel-actions{display:grid;gap:10px}.quick-panel-actions a{border:1px solid var(--line);border-radius:16px;background:rgba(216,240,231,.38);padding:14px;font-weight:1000}.order-progress{border:1px solid var(--line);border-radius:28px;background:rgba(255,253,246,.92);box-shadow:var(--soft-shadow);padding:22px;margin-bottom:22px}.order-progress-head{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:14px}.order-progress-head span{color:var(--muted);font-size:.78rem;font-weight:1000;text-transform:uppercase;letter-spacing:.12em}.order-progress-track{height:9px;border-radius:999px;background:rgba(16,32,25,.1);overflow:hidden}.order-progress-track i{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,var(--green-2),var(--gold));transition:width .35s ease}.order-progress-steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-top:14px}.order-progress-steps button{border:1px solid var(--line);border-radius:16px;background:rgba(255,253,246,.72);padding:10px;text-align:left;color:var(--ink);font-weight:1000}.order-progress-steps button span{display:block;margin-top:3px;color:var(--muted);font-size:.76rem;font-weight:850}.order-progress-steps button.is-active{background:var(--green);color:#fff}.order-progress-steps button.is-active span{color:rgba(255,255,255,.72)}@media(max-width:760px){.quick-inquiry-bar{left:12px;right:12px;bottom:12px;transform:none;justify-content:space-between;border-radius:24px}.quick-inquiry-bar a{flex:1;text-align:center;padding:12px 8px;font-size:.86rem}.order-progress-steps{grid-template-columns:1fr}.contact-section{padding-bottom:150px}}
  `;
  document.head.appendChild(style);
}

document.querySelectorAll('[data-prefill]').forEach((button) => {
  button.addEventListener('click', () => {
    const type = button.getAttribute('data-prefill') || 'Buyer inquiry';
    const copy = {
      fry: 'Please confirm current milkfish fry availability. I will provide quantity, target receiving date, destination, receiving contact, and document requirements.',
      flowers: 'Please send current imported flower availability, lead time, substitute options, and order requirements. I will provide event date, quantity, receiving location, and color palette.',
      docs: 'Please send the qualified buyer document checklist and available redacted proof previews for procurement review.'
    };
    prefillInquiry(type === 'fry' ? 'Milkfish fry wholesale' : type === 'flowers' ? 'Imported flowers' : 'Buyer documents', copy[type] || 'Please review my inquiry.');
  });
});

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  document.body.classList.toggle('nav-open', !expanded);
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}));

const contactSection = document.querySelector('#contact');
const stickyBar = document.querySelector('[data-sticky-cta]');
if (contactSection && stickyBar && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(([entry]) => {
    stickyBar.hidden = entry.isIntersecting;
  }, { threshold: 0.12 });
  observer.observe(contactSection);
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const consent = form.querySelector('[name="privacyConsent"]');
  if (consent && !consent.checked) {
    setStatus('Consent is required before sending buyer details.', 'error');
    consent.focus();
    return;
  }
  const payload = Object.fromEntries(new FormData(form).entries());
  payload.source = location.pathname;
  payload.submittedAt = new Date().toISOString();
  setStatus('Sending inquiry to the secure intake endpoint...', 'info');
  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || 'Inquiry endpoint is not configured yet.');
    setStatus('Inquiry received. Prepare quantity, receiving date, destination, buyer details, and required documents for faster review.', 'success');
    form.reset();
  } catch (error) {
    setStatus('Lead backend is not fully configured yet. Opening email fallback with buyer fields.', 'error');
    const kind = payload.interest || 'Buyer inquiry';
    window.location.href = buildMailto(kind);
  }
});

addActionableStyles();
hardenContactLinks();
addQuickInquirySticky();
addQuickInquiryPanel();
addOrderingProgress();
