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

function addRedactedDocumentPreviewSystem() {
  if (document.querySelector('[data-redacted-doc-system]')) return;
  const anchor = document.querySelector('#proof-pack') || document.querySelector('#trust-center') || document.querySelector('#contact');
  if (!anchor) return;
  const section = document.createElement('section');
  section.className = 'section redacted-doc-section';
  section.dataset.redactedDocSystem = 'true';
  section.innerHTML = `
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Redacted document preview UI</p>
        <h2>Show proof without leaking sensitive information.</h2>
        <p>Buyers need to feel that documents exist, but business IDs, signatures, private addresses, supplier details, and document numbers should not be exposed publicly. These preview cards create trust while keeping verification controlled.</p>
      </div>
      <div class="redacted-doc-grid">
        <article class="redacted-doc-card verified">
          <div class="doc-topline"><span>Business profile</span><strong>Preview only</strong></div>
          <div class="redacted-paper">
            <i class="line wide"></i><i class="line mid"></i><b class="redact long"></b><i class="line short"></i><b class="redact small"></b><em class="stamp">Qualified request</em>
          </div>
          <h3>Company information packet</h3>
          <p>Public preview should show structure only. Full file is shared after buyer qualification.</p>
        </article>
        <article class="redacted-doc-card">
          <div class="doc-topline"><span>Accreditation</span><strong>Redacted</strong></div>
          <div class="redacted-paper">
            <i class="line mid"></i><b class="redact long"></b><i class="line wide"></i><b class="redact medium"></b><i class="line short"></i><em class="stamp">Verify details</em>
          </div>
          <h3>BFAR / aquaculture-related proof</h3>
          <p>Use only if applicable and verified. Hide document number, signatures, and private identifiers.</p>
        </article>
        <article class="redacted-doc-card">
          <div class="doc-topline"><span>Plant imports</span><strong>Redacted</strong></div>
          <div class="redacted-paper">
            <i class="line wide"></i><i class="line short"></i><b class="redact medium"></b><i class="line mid"></i><b class="redact long"></b><em class="stamp">By request</em>
          </div>
          <h3>BPI / plant-related proof</h3>
          <p>For flower buyers, preview the document category without publicly exposing sensitive fields.</p>
        </article>
        <article class="redacted-doc-card quote">
          <div class="doc-topline"><span>Commercial</span><strong>Sample</strong></div>
          <div class="redacted-paper quote-paper">
            <i class="line wide"></i><i class="line mid"></i><i class="line mid"></i><b class="redact long"></b><em class="stamp">Per transaction</em>
          </div>
          <h3>Quotation template</h3>
          <p>Show buyers that formal quotes include product, quantity, destination, validity, and payment terms.</p>
        </article>
      </div>
      <div class="redaction-rules">
        <strong>Redaction rule:</strong> show document category and process, never raw IDs, signatures, payment info, private supplier data, or unverified claims.
      </div>
    </div>
  `;
  anchor.before(section);
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

function addQuickInquirySticky() {
  if (document.querySelector('[data-quick-inquiry]')) return;
  const bar = document.createElement('div');
  bar.className = 'quick-inquiry-bar';
  bar.dataset.quickInquiry = 'true';
  bar.innerHTML = `<a class="quick-primary" href="${buildMailto('Milkfish fry / imported flowers')}">Quick Inquiry</a><a href="tel:${PRINCIPAL_PHONE}">Call</a><a href="viber://chat?number=%2B639178004764">Viber</a>`;
  document.body.appendChild(bar);
}

function addActionableStyles() {
  if (document.querySelector('#actionable-cta-style')) return;
  const style = document.createElement('style');
  style.id = 'actionable-cta-style';
  style.textContent = `
    .redacted-doc-section{background:linear-gradient(180deg,rgba(9,47,37,.055),rgba(255,253,246,.42),transparent)}.redacted-doc-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}.redacted-doc-card{border:1px solid var(--line);border-radius:30px;background:rgba(255,253,246,.94);box-shadow:var(--soft-shadow);padding:18px;overflow:hidden}.doc-topline{display:flex;justify-content:space-between;gap:12px;margin-bottom:14px}.doc-topline span,.doc-topline strong{font-size:.72rem;font-weight:1000;letter-spacing:.12em;text-transform:uppercase}.doc-topline span{color:var(--muted)}.doc-topline strong{border-radius:999px;background:rgba(216,240,231,.72);color:var(--green);padding:5px 8px}.redacted-paper{height:235px;border:1px solid rgba(16,32,25,.12);border-radius:24px;background:linear-gradient(180deg,#fffdf6,#f6efe0);padding:22px;position:relative;box-shadow:inset 0 0 0 1px rgba(255,255,255,.72)}.redacted-paper:before{content:'';position:absolute;right:20px;top:20px;width:58px;height:58px;border-radius:50%;border:2px solid rgba(185,139,55,.32)}.line{display:block;height:10px;border-radius:999px;background:rgba(16,32,25,.14);margin-bottom:12px}.line.wide{width:82%}.line.mid{width:62%}.line.short{width:42%}.redact{display:block;height:22px;border-radius:7px;background:repeating-linear-gradient(45deg,rgba(16,32,25,.86) 0 8px,rgba(16,32,25,.72) 8px 16px);margin:18px 0}.redact.long{width:84%}.redact.medium{width:62%}.redact.small{width:38%}.stamp{position:absolute;left:22px;bottom:22px;border:1px solid rgba(19,86,64,.25);border-radius:999px;background:rgba(216,240,231,.74);color:var(--green);padding:8px 10px;font-style:normal;font-size:.72rem;font-weight:1000;text-transform:uppercase;letter-spacing:.08em}.quote-paper{background:linear-gradient(180deg,#fffdf6,#edf7f2)}.redacted-doc-card h3{margin-top:16px}.redacted-doc-card p{color:var(--muted);margin-bottom:0}.redaction-rules{margin-top:18px;border:1px solid rgba(19,86,64,.18);border-radius:22px;background:rgba(216,240,231,.48);padding:18px;color:var(--green);font-weight:900}.hero-actions[data-direct-hero-ctas="true"]{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;align-items:stretch}.hero-actions[data-direct-hero-ctas="true"] .btn{width:100%;min-height:58px;text-align:center}.btn-flower{background:linear-gradient(135deg,#7f4f3f,#d98e7d)!important}.hero-secondary-links{display:flex;flex-wrap:wrap;gap:14px;margin-top:-18px;margin-bottom:28px;color:var(--muted);font-size:.94rem;font-weight:900}.hero-secondary-links a{border-bottom:2px solid rgba(19,86,64,.18)}.quick-inquiry-bar{position:fixed;left:50%;bottom:16px;z-index:180;transform:translateX(-50%);display:flex;gap:8px;align-items:center;border:1px solid rgba(255,255,255,.45);border-radius:999px;background:rgba(16,32,25,.94);box-shadow:0 22px 56px rgba(16,32,25,.28);backdrop-filter:blur(16px);padding:9px}.quick-inquiry-bar a{border-radius:999px;background:#fff;color:#092f25;padding:12px 14px;font-weight:1000;white-space:nowrap}.quick-inquiry-bar .quick-primary{background:linear-gradient(135deg,#b98b37,#e1c884);color:#102019}@media(max-width:1080px){.redacted-doc-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.hero-actions[data-direct-hero-ctas="true"]{grid-template-columns:1fr}}@media(max-width:760px){.redacted-doc-grid{grid-template-columns:1fr}.quick-inquiry-bar{left:12px;right:12px;bottom:12px;transform:none;justify-content:space-between;border-radius:24px}.quick-inquiry-bar a{flex:1;text-align:center;padding:12px 8px;font-size:.86rem}.contact-section{padding-bottom:150px}}
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
    const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || 'Inquiry endpoint is not configured yet.');
    setStatus('Inquiry received. Prepare quantity, receiving date, destination, buyer details, and required documents for faster review.', 'success');
    form.reset();
  } catch (error) {
    setStatus('Lead backend is not fully configured yet. Opening email fallback with buyer fields.', 'error');
    window.location.href = buildMailto(payload.interest || 'Buyer inquiry');
  }
});

addActionableStyles();
hardenContactLinks();
addDirectHeroCtas();
addRedactedDocumentPreviewSystem();
addQuickInquirySticky();
