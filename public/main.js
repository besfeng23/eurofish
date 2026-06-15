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
      link.setAttribute('href', 'viber://chat?number=%2B639178004764');
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

function addDirectHeroCtas() {
  const heroCopy = document.querySelector('.hero-copy');
  const heroActions = heroCopy?.querySelector('.hero-actions');
  if (!heroCopy || !heroActions || document.querySelector('[data-direct-hero-ctas]')) return;

  heroActions.innerHTML = `
    <button class="btn btn-primary" type="button" data-hero-intent="fry">Request Fry Availability</button>
    <button class="btn btn-primary btn-flower" type="button" data-hero-intent="flowers">Request Flower Catalog</button>
    <button class="btn btn-ghost" type="button" data-hero-intent="docs">Request Buyer Documents</button>
  `;
  heroActions.dataset.directHeroCtas = 'true';

  const secondary = document.createElement('div');
  secondary.className = 'hero-secondary-links';
  secondary.innerHTML = `
    <a href="/company-profile/">View company profile</a>
    <a href="/trust-center.html">Trust center</a>
    <a href="${buildMailto('Quick buyer inquiry')}">Email quick inquiry</a>
  `;
  heroActions.after(secondary);

  heroActions.querySelector('[data-hero-intent="fry"]')?.addEventListener('click', () => {
    prefillInquiry('Milkfish fry wholesale', 'Please confirm current milkfish fry availability. Estimated quantity, target receiving date, destination, receiving contact, and document requirements are below.');
  });
  heroActions.querySelector('[data-hero-intent="flowers"]')?.addEventListener('click', () => {
    prefillInquiry('Imported flowers', 'Please send current imported flower catalog, availability, lead time, substitute options, and order requirements. Event date, quantity, receiving location, and color palette are below.');
  });
  heroActions.querySelector('[data-hero-intent="docs"]')?.addEventListener('click', () => {
    prefillInquiry('Buyer documents', 'Please send the qualified buyer document checklist and available redacted proof previews for procurement review.');
  });
}

function addProofAssetSystem() {
  if (document.querySelector('[data-proof-assets]')) return;
  const anchor = document.querySelector('#buyer-paths') || document.querySelector('#aquaculture') || document.querySelector('#contact');
  if (!anchor) return;
  const section = document.createElement('section');
  section.className = 'section proof-assets-section';
  section.dataset.proofAssets = 'true';
  section.innerHTML = `
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Proof assets</p>
        <h2>Turn the site from conceptual to believable.</h2>
        <p>The strongest visual upgrade is not more decoration. It is real proof: live cargo handling, flower inventory, packing/cold-chain preparation, principal oversight, office coordination, and redacted document previews.</p>
      </div>
      <div class="proof-asset-grid">
        <article class="proof-photo proof-photo-fry"><div class="proof-photo-media" role="img" aria-label="Milkfish fry bags or basins proof slot"></div><span>Needed photo</span><h3>Milkfish fry bags / basins</h3><p>Use a real handling or receiving photo to prove the aquaculture side is operational.</p></article>
        <article class="proof-photo proof-photo-flowers"><div class="proof-photo-media" role="img" aria-label="Imported flower inventory proof slot"></div><span>Needed photo</span><h3>Flower inventory / packing</h3><p>Show actual flower stock, crates, labels, or preparation instead of generic floral visuals.</p></article>
        <article class="proof-photo proof-photo-coldchain"><div class="proof-photo-media" role="img" aria-label="Packing and cold-chain proof slot"></div><span>Needed photo</span><h3>Packing / cold-chain handling</h3><p>Show the practical preparation step buyers care about before receiving perishable goods.</p></article>
        <article class="proof-photo proof-photo-principal"><div class="proof-photo-media" role="img" aria-label="Principal or team proof slot"></div><span>Needed photo</span><h3>Principal / team photo</h3><p>A real face increases trust more than another abstract graphic.</p></article>
        <article class="proof-photo proof-photo-office"><div class="proof-photo-media" role="img" aria-label="Office coordination proof slot"></div><span>Needed photo</span><h3>Office / coordination desk</h3><p>Show where inquiries, supplier coordination, documents, and buyer calls are handled.</p></article>
        <article class="proof-document-card"><span>Redacted preview</span><h3>Document proof pack</h3><div class="doc-preview"><i></i><i></i><i></i><b></b><em></em></div><p>Use blurred or redacted previews for business profile, BFAR/BPI-related proof when applicable, quotation template, and buyer checklist.</p></article>
      </div>
    </div>
  `;
  anchor.before(section);
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
    <div class="order-progress-head"><span>Ordering progress</span><strong data-progress-label>Step 1 of ${items.length}</strong></div>
    <div class="order-progress-track"><i data-progress-bar></i></div>
    <div class="order-progress-steps">${items.map((item, index) => `<button type="button" data-step="${index}">${String(index + 1).padStart(2, '0')}<span>${item.querySelector('h3')?.textContent || `Step ${index + 1}`}</span></button>`).join('')}</div>
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
  buttons.forEach((button) => button.addEventListener('click', () => {
    const index = Number(button.dataset.step || 0);
    items[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setStep(index);
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setStep(items.indexOf(entry.target));
    }), { rootMargin: '-35% 0px -45% 0px', threshold: 0.05 });
    items.forEach((item) => observer.observe(item));
  }
  setStep(0);
}

function addActionableStyles() {
  if (document.querySelector('#actionable-cta-style')) return;
  const style = document.createElement('style');
  style.id = 'actionable-cta-style';
  style.textContent = `
    .hero-actions[data-direct-hero-ctas="true"]{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;align-items:stretch}.hero-actions[data-direct-hero-ctas="true"] .btn{width:100%;min-height:58px;text-align:center}.btn-flower{background:linear-gradient(135deg,#7f4f3f,#d98e7d)!important}.hero-secondary-links{display:flex;flex-wrap:wrap;gap:14px;margin-top:-18px;margin-bottom:28px;color:var(--muted);font-size:.94rem;font-weight:900}.hero-secondary-links a{border-bottom:2px solid rgba(19,86,64,.18)}.hero-secondary-links a:hover{color:var(--green);border-color:var(--gold)}.proof-assets-section{background:radial-gradient(circle at 12% 10%,rgba(216,240,231,.7),transparent 28rem),linear-gradient(180deg,rgba(255,253,246,.56),transparent)}.proof-asset-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.proof-photo,.proof-document-card{border:1px solid var(--line);border-radius:28px;background:rgba(255,253,246,.92);box-shadow:var(--soft-shadow);padding:18px;overflow:hidden}.proof-photo-media{height:210px;border-radius:22px;margin-bottom:18px;background:linear-gradient(135deg,rgba(9,47,37,.72),rgba(19,86,64,.28)),repeating-linear-gradient(135deg,rgba(255,255,255,.12) 0 12px,transparent 12px 24px);position:relative}.proof-photo-media:after{content:'Replace with real asset';position:absolute;left:14px;bottom:14px;border-radius:999px;background:rgba(255,253,246,.92);color:var(--green);padding:8px 10px;font-size:.76rem;font-weight:1000;text-transform:uppercase;letter-spacing:.08em}.proof-photo-fry .proof-photo-media{background:linear-gradient(135deg,rgba(9,47,37,.72),rgba(19,86,64,.18)),radial-gradient(circle at 32% 35%,rgba(255,255,255,.8) 0 18px,transparent 19px),radial-gradient(circle at 55% 50%,rgba(255,255,255,.7) 0 24px,transparent 25px),linear-gradient(135deg,#5a846d,#d8f0e7)}.proof-photo-flowers .proof-photo-media{background:radial-gradient(circle at 30% 34%,rgba(255,255,255,.86) 0 18px,transparent 19px),radial-gradient(circle at 62% 45%,rgba(255,255,255,.72) 0 24px,transparent 25px),linear-gradient(135deg,#d98e7d,#f3d9d1)}.proof-photo-coldchain .proof-photo-media{background:linear-gradient(135deg,rgba(16,32,25,.62),rgba(19,86,64,.2)),linear-gradient(90deg,rgba(255,255,255,.42) 0 18%,transparent 18% 22%,rgba(255,255,255,.32) 22% 40%,transparent 40% 45%,rgba(255,255,255,.25) 45% 60%,transparent 60%),#cfd8d1}.proof-photo-principal .proof-photo-media{background:radial-gradient(circle at 50% 32%,rgba(255,253,246,.95) 0 34px,transparent 35px),linear-gradient(180deg,transparent 0 45%,rgba(255,253,246,.8) 45% 70%,transparent 70%),linear-gradient(135deg,#092f25,#bb8d36)}.proof-photo-office .proof-photo-media{background:linear-gradient(135deg,rgba(9,47,37,.68),rgba(187,141,55,.22)),linear-gradient(90deg,rgba(255,255,255,.38) 0 30%,transparent 30% 35%,rgba(255,255,255,.28) 35% 68%,transparent 68%),#e9ddc7}.proof-photo span,.proof-document-card span{display:block;color:var(--muted);font-size:.74rem;font-weight:1000;letter-spacing:.13em;text-transform:uppercase}.proof-photo h3,.proof-document-card h3{margin-top:6px}.proof-photo p,.proof-document-card p{color:var(--muted);margin-bottom:0}.doc-preview{height:210px;border-radius:22px;background:#fffdf6;border:1px solid var(--line);margin:14px 0;position:relative;padding:22px;box-shadow:inset 0 0 0 1px rgba(16,32,25,.04)}.doc-preview i{display:block;height:11px;border-radius:999px;background:rgba(16,32,25,.13);margin-bottom:12px}.doc-preview i:nth-child(1){width:72%}.doc-preview i:nth-child(2){width:50%}.doc-preview i:nth-child(3){width:88%}.doc-preview b{display:block;height:42px;width:68%;border-radius:12px;background:repeating-linear-gradient(45deg,rgba(16,32,25,.24) 0 10px,rgba(16,32,25,.08) 10px 20px);margin-top:26px}.doc-preview em{position:absolute;right:20px;bottom:20px;width:92px;height:38px;border-radius:999px;background:rgba(185,139,55,.28)}.quick-inquiry-bar{position:fixed;left:50%;bottom:16px;z-index:180;transform:translateX(-50%);display:flex;gap:8px;align-items:center;border:1px solid rgba(255,255,255,.45);border-radius:999px;background:rgba(16,32,25,.94);box-shadow:0 22px 56px rgba(16,32,25,.28);backdrop-filter:blur(16px);padding:9px}.quick-inquiry-bar a{border-radius:999px;background:#fff;color:#092f25;padding:12px 14px;font-weight:1000;white-space:nowrap}.quick-inquiry-bar .quick-primary{background:linear-gradient(135deg,#b98b37,#e1c884);color:#102019}.quick-inquiry-panel{border:1px solid var(--line);border-radius:28px;background:rgba(255,253,246,.92);box-shadow:var(--soft-shadow);padding:24px;margin-top:24px}.quick-inquiry-panel p{color:var(--muted)}.quick-panel-actions{display:grid;gap:10px}.quick-panel-actions a{border:1px solid var(--line);border-radius:16px;background:rgba(216,240,231,.38);padding:14px;font-weight:1000}.order-progress{border:1px solid var(--line);border-radius:28px;background:rgba(255,253,246,.92);box-shadow:var(--soft-shadow);padding:22px;margin-bottom:22px}.order-progress-head{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:14px}.order-progress-head span{color:var(--muted);font-size:.78rem;font-weight:1000;text-transform:uppercase;letter-spacing:.12em}.order-progress-track{height:9px;border-radius:999px;background:rgba(16,32,25,.1);overflow:hidden}.order-progress-track i{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,var(--green-2),var(--gold));transition:width .35s ease}.order-progress-steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-top:14px}.order-progress-steps button{border:1px solid var(--line);border-radius:16px;background:rgba(255,253,246,.72);padding:10px;text-align:left;color:var(--ink);font-weight:1000}.order-progress-steps button span{display:block;margin-top:3px;color:var(--muted);font-size:.76rem;font-weight:850}.order-progress-steps button.is-active{background:var(--green);color:#fff}.order-progress-steps button.is-active span{color:rgba(255,255,255,.72)}@media(max-width:900px){.proof-asset-grid{grid-template-columns:1fr 1fr}.hero-actions[data-direct-hero-ctas="true"]{grid-template-columns:1fr}}@media(max-width:760px){.proof-asset-grid{grid-template-columns:1fr}.quick-inquiry-bar{left:12px;right:12px;bottom:12px;transform:none;justify-content:space-between;border-radius:24px}.quick-inquiry-bar a{flex:1;text-align:center;padding:12px 8px;font-size:.86rem}.order-progress-steps{grid-template-columns:1fr}.contact-section{padding-bottom:150px}}
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
addDirectHeroCtas();
addProofAssetSystem();
addQuickInquirySticky();
addQuickInquiryPanel();
addOrderingProgress();
