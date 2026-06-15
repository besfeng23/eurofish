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
  document.querySelectorAll('a[href^="mailto:"], a[href*="joevyrosario"]').forEach((link) => link.setAttribute('href', `mailto:${PRINCIPAL_EMAIL}`));
}

function addRoleBasedPortalNav() {
  if (document.querySelector('[data-role-portal-nav]')) return;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const navPanel = document.createElement('section');
  navPanel.className = 'role-portal-nav';
  navPanel.dataset.rolePortalNav = 'true';
  navPanel.innerHTML = `
    <div class="container role-portal-grid">
      <article data-role-jump="aquaculture">
        <span>Aquaculture buyers</span>
        <h3>Fish farms, nurseries, fry distributors</h3>
        <p>Availability, quantity range, receiving date, destination, and fry handling readiness.</p>
      </article>
      <article data-role-jump="flowers">
        <span>Flower buyers</span>
        <h3>Florists, stylists, event teams</h3>
        <p>Catalog, colors, event date, quantity, substitute options, and receiving schedule.</p>
      </article>
      <article data-role-jump="documents">
        <span>Procurement teams</span>
        <h3>Compliance and document review</h3>
        <p>Redacted proof previews, quotation process, buyer qualification, and commercial boundaries.</p>
      </article>
    </div>
  `;
  hero.after(navPanel);
  navPanel.querySelector('[data-role-jump="aquaculture"]')?.addEventListener('click', () => document.querySelector('#aquaculture, #milkfish, #buyer-paths')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  navPanel.querySelector('[data-role-jump="flowers"]')?.addEventListener('click', () => document.querySelector('#flowers, #imported-flowers, #buyer-paths')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  navPanel.querySelector('[data-role-jump="documents"]')?.addEventListener('click', () => document.querySelector('#proof-pack, [data-redacted-doc-system], #trust-center')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

function addB2BDesignSystemPanel() {
  if (document.querySelector('[data-design-system-panel]')) return;
  const anchor = document.querySelector('#buyer-paths') || document.querySelector('#aquaculture') || document.querySelector('#contact');
  if (!anchor) return;
  const section = document.createElement('section');
  section.className = 'section design-system-panel';
  section.dataset.designSystemPanel = 'true';
  section.innerHTML = `
    <div class="container design-system-grid">
      <div>
        <p class="eyebrow">B2B portal standard</p>
        <h2>Separated paths for two very different supply needs.</h2>
        <p>Milkfish fry and imported flowers should not feel like one generic catalog. Each path has a different buyer, urgency, risk, proof requirement, and receiving workflow.</p>
      </div>
      <div class="niche-split-card aqua-path">
        <span>01 / Aquaculture</span>
        <h3>Milkfish fry procurement</h3>
        <ul><li>Live biological cargo</li><li>Receiving readiness matters</li><li>Quantity and timing drive quote</li><li>Document review by qualified request</li></ul>
        <button type="button" data-path-prefill="fry">Start fry inquiry</button>
      </div>
      <div class="niche-split-card flower-path">
        <span>02 / Flowers</span>
        <h3>Imported flower procurement</h3>
        <ul><li>Perishable event supply</li><li>Catalog and substitutes matter</li><li>Event date drives urgency</li><li>Color, stem count, and receiving schedule needed</li></ul>
        <button type="button" data-path-prefill="flowers">Start flower inquiry</button>
      </div>
    </div>
  `;
  anchor.before(section);
  section.querySelector('[data-path-prefill="fry"]')?.addEventListener('click', () => prefillInquiry('Milkfish fry wholesale', 'Please confirm milkfish fry availability. Quantity, receiving date, destination, and document needs are below.'));
  section.querySelector('[data-path-prefill="flowers"]')?.addEventListener('click', () => prefillInquiry('Imported flowers', 'Please send current imported flower catalog and availability. Event date, quantity, color palette, receiving location, and substitute options are below.'));
}

function addBuyerCommandCenter() {
  if (document.querySelector('[data-buyer-command-center]')) return;
  const anchor = document.querySelector('#buyer-paths') || document.querySelector('#aquaculture') || document.querySelector('#contact');
  if (!anchor) return;
  const section = document.createElement('section');
  section.className = 'section buyer-command-section';
  section.dataset.buyerCommandCenter = 'true';
  section.innerHTML = `
    <div class="container command-shell">
      <div class="command-copy"><p class="eyebrow">Buyer command center</p><h2>One screen for serious procurement action.</h2><p>Choose the product path, prepare the details, and contact the principal quickly.</p><div class="command-actions"><button type="button" data-command="fry">Check fry availability</button><button type="button" data-command="flowers">Request flower catalog</button><button type="button" data-command="docs">Ask for documents</button></div></div>
      <div class="command-board"><div class="command-status"><span>Lead quality</span><strong>Buyer-ready inquiry</strong></div><ul><li><b>01</b><span>Product needed</span><em>Fry, flowers, or documents</em></li><li><b>02</b><span>Quantity range</span><em>Volume, boxes, stems, or fry count</em></li><li><b>03</b><span>Target date</span><em>Receiving or event schedule</em></li><li><b>04</b><span>Destination</span><em>Farm, shop, warehouse, or venue</em></li><li><b>05</b><span>Proof needs</span><em>Documents for qualified review</em></li></ul></div>
    </div>`;
  anchor.before(section);
  section.querySelector('[data-command="fry"]')?.addEventListener('click', () => prefillInquiry('Milkfish fry wholesale', 'Please confirm current milkfish fry availability. Estimated quantity, target receiving date, destination, receiving contact, and document requirements are below.'));
  section.querySelector('[data-command="flowers"]')?.addEventListener('click', () => prefillInquiry('Imported flowers', 'Please send current imported flower catalog, availability, lead time, substitute options, and order requirements. Event date, quantity, receiving location, and color palette are below.'));
  section.querySelector('[data-command="docs"]')?.addEventListener('click', () => prefillInquiry('Buyer documents', 'Please send the qualified buyer document checklist and available redacted proof previews for procurement review.'));
}

function addDirectHeroCtas() {
  const heroCopy = document.querySelector('.hero-copy');
  const heroActions = heroCopy?.querySelector('.hero-actions');
  if (!heroCopy || !heroActions || document.querySelector('[data-direct-hero-ctas]')) return;
  heroActions.innerHTML = `<button class="btn btn-primary" type="button" data-hero-intent="fry">Request Fry Availability</button><button class="btn btn-primary btn-flower" type="button" data-hero-intent="flowers">Request Flower Catalog</button><button class="btn btn-ghost" type="button" data-hero-intent="docs">Request Buyer Documents</button>`;
  heroActions.dataset.directHeroCtas = 'true';
  const secondary = document.createElement('div');
  secondary.className = 'hero-secondary-links';
  secondary.innerHTML = `<a href="/company-profile/">View company profile</a><a href="/trust-center.html">Trust center</a><a href="${buildMailto('Quick buyer inquiry')}">Email quick inquiry</a>`;
  heroActions.after(secondary);
  heroActions.querySelector('[data-hero-intent="fry"]')?.addEventListener('click', () => prefillInquiry('Milkfish fry wholesale', 'Please confirm current milkfish fry availability. Estimated quantity, target receiving date, destination, receiving contact, and document requirements are below.'));
  heroActions.querySelector('[data-hero-intent="flowers"]')?.addEventListener('click', () => prefillInquiry('Imported flowers', 'Please send current imported flower catalog, availability, lead time, substitute options, and order requirements. Event date, quantity, receiving location, and color palette are below.'));
  heroActions.querySelector('[data-hero-intent="docs"]')?.addEventListener('click', () => prefillInquiry('Buyer documents', 'Please send the qualified buyer document checklist and available redacted proof previews for procurement review.'));
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
    :root{--trust-blue:#163b73;--trust-blue2:#2463a6;--portal-mint:#e8f4ee;--flower-rose:#f3d9d1}.site-header{background:rgba(248,250,252,.82)}.brand-mark{background:linear-gradient(135deg,var(--trust-blue),var(--green2))}.nav-cta,.btn-primary{background:linear-gradient(135deg,var(--trust-blue),var(--green2))}.role-portal-nav{padding:0 0 34px;margin-top:-52px;position:relative;z-index:4}.role-portal-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.role-portal-grid article{border:1px solid rgba(22,59,115,.13);border-radius:24px;background:rgba(255,255,255,.84);box-shadow:0 20px 58px rgba(22,59,115,.09);padding:20px;cursor:pointer}.role-portal-grid article:hover{transform:translateY(-3px);border-color:rgba(22,59,115,.28)}.role-portal-grid span,.niche-split-card span{color:var(--trust-blue2);font-size:.72rem;font-weight:1000;text-transform:uppercase;letter-spacing:.13em}.role-portal-grid p{color:var(--muted);margin-bottom:0}.design-system-panel{background:linear-gradient(180deg,#f8fafc,#eef7f2)}.design-system-grid{display:grid;grid-template-columns:1.1fr .95fr .95fr;gap:18px;align-items:stretch}.niche-split-card{border:1px solid rgba(22,59,115,.13);border-radius:32px;background:white;box-shadow:0 24px 64px rgba(22,59,115,.08);padding:26px}.niche-split-card ul{padding-left:18px;color:#4b5b66}.niche-split-card button,.command-actions button{border:0;border-radius:999px;padding:13px 16px;font-weight:1000}.aqua-path{border-top:6px solid var(--trust-blue2)}.flower-path{border-top:6px solid #d98e7d}.aqua-path button{background:linear-gradient(135deg,var(--trust-blue),var(--green2));color:#fff}.flower-path button{background:linear-gradient(135deg,#7f4f3f,#d98e7d);color:#fff}.buyer-command-section{background:linear-gradient(135deg,#122943,#135640);color:#fff;position:relative;overflow:hidden}.buyer-command-section:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 18% 18%,rgba(225,200,132,.2),transparent 28rem),linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px);background-size:auto,42px 42px,42px 42px;pointer-events:none}.command-shell{position:relative;display:grid;grid-template-columns:1fr 1.05fr;gap:28px;align-items:center}.command-copy h2{color:#fff}.command-copy p{color:rgba(255,255,255,.76);font-size:1.05rem}.command-actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:22px}.command-actions button{border:1px solid rgba(255,255,255,.18);border-radius:18px;background:rgba(255,255,255,.1);color:#fff;padding:15px 13px;text-align:left}.command-actions button:first-child{background:linear-gradient(135deg,#2463a6,#e1c884);color:#fff}.command-board{border:1px solid rgba(255,255,255,.16);border-radius:32px;background:rgba(255,255,255,.1);backdrop-filter:blur(18px);padding:18px;box-shadow:0 30px 80px rgba(0,0,0,.18)}.command-status{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid rgba(255,255,255,.14);padding:4px 2px 16px;margin-bottom:12px}.command-status span{color:rgba(255,255,255,.6);font-weight:1000;text-transform:uppercase;letter-spacing:.1em;font-size:.72rem}.command-status strong{color:#e1c884}.command-board ul{display:grid;gap:9px;margin:0;padding:0}.command-board li{display:grid;grid-template-columns:42px 1fr;gap:10px;list-style:none;border:1px solid rgba(255,255,255,.13);border-radius:18px;background:rgba(255,255,255,.08);padding:12px}.command-board b{grid-row:span 2;color:#e1c884}.command-board span{font-weight:1000}.command-board em{font-style:normal;color:rgba(255,255,255,.62);font-size:.9rem}.hero-actions[data-direct-hero-ctas="true"]{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;align-items:stretch}.hero-actions[data-direct-hero-ctas="true"] .btn{width:100%;min-height:58px;text-align:center}.btn-flower{background:linear-gradient(135deg,#7f4f3f,#d98e7d)!important}.hero-secondary-links{display:flex;flex-wrap:wrap;gap:14px;margin-top:-18px;margin-bottom:28px;color:var(--muted);font-size:.94rem;font-weight:900}.hero-secondary-links a{border-bottom:2px solid rgba(19,86,64,.18)}.quick-inquiry-bar{position:fixed;left:50%;bottom:16px;z-index:180;transform:translateX(-50%);display:flex;gap:8px;align-items:center;border:1px solid rgba(255,255,255,.45);border-radius:999px;background:rgba(18,41,67,.94);box-shadow:0 22px 56px rgba(18,41,67,.28);backdrop-filter:blur(16px);padding:9px}.quick-inquiry-bar a{border-radius:999px;background:#fff;color:#122943;padding:12px 14px;font-weight:1000;white-space:nowrap}.quick-inquiry-bar .quick-primary{background:linear-gradient(135deg,#2463a6,#e1c884);color:#fff}@media(max-width:1080px){.command-shell,.design-system-grid{grid-template-columns:1fr}.command-actions,.role-portal-grid{grid-template-columns:1fr}.hero-actions[data-direct-hero-ctas="true"]{grid-template-columns:1fr}}@media(max-width:760px){.quick-inquiry-bar{left:12px;right:12px;bottom:12px;transform:none;justify-content:space-between;border-radius:24px}.quick-inquiry-bar a{flex:1;text-align:center;padding:12px 8px;font-size:.86rem}.contact-section{padding-bottom:150px}}
  `;
  document.head.appendChild(style);
}

document.querySelectorAll('[data-prefill]').forEach((button) => button.addEventListener('click', () => {
  const type = button.getAttribute('data-prefill') || 'Buyer inquiry';
  const copy = { fry: 'Please confirm current milkfish fry availability. I will provide quantity, target receiving date, destination, receiving contact, and document requirements.', flowers: 'Please send current imported flower availability, lead time, substitute options, and order requirements. I will provide event date, quantity, receiving location, and color palette.', docs: 'Please send the qualified buyer document checklist and available redacted proof previews for procurement review.' };
  prefillInquiry(type === 'fry' ? 'Milkfish fry wholesale' : type === 'flowers' ? 'Imported flowers' : 'Buyer documents', copy[type] || 'Please review my inquiry.');
}));

navToggle?.addEventListener('click', () => { const expanded = navToggle.getAttribute('aria-expanded') === 'true'; navToggle.setAttribute('aria-expanded', String(!expanded)); document.body.classList.toggle('nav-open', !expanded); });
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { navToggle?.setAttribute('aria-expanded', 'false'); document.body.classList.remove('nav-open'); }));

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const consent = form.querySelector('[name="privacyConsent"]');
  if (consent && !consent.checked) { setStatus('Consent is required before sending buyer details.', 'error'); consent.focus(); return; }
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
addRoleBasedPortalNav();
addB2BDesignSystemPanel();
addBuyerCommandCenter();
addQuickInquirySticky();
