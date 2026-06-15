const form = document.querySelector('[data-inquiry-form]');
const statusNode = document.querySelector('[data-form-status]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

function setStatus(message, type = 'info') {
  if (!statusNode) return;
  statusNode.textContent = message;
  statusNode.dataset.type = type;
}

function prefillInquiry(interest, message) {
  if (!form) return;
  const interestField = form.querySelector('[name="interest"]');
  const messageField = form.querySelector('[name="message"]');
  if (interestField) interestField.value = interest;
  if (messageField) messageField.value = message;
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    setStatus('Lead backend is not fully configured yet. Do not rely on the website alone: call or Viber 0917-800-4764 with your quantity, target date, destination, and document needs.', 'error');
  }
});
