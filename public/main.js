const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const header = document.querySelector('[data-header]');
const form = document.querySelector('[data-inquiry-form]');
const statusNode = document.querySelector('[data-form-status]');
const copyButtons = document.querySelectorAll('[data-copy]');

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

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNav);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNav();
});

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.getAttribute('data-copy') || '';
    try {
      await navigator.clipboard.writeText(value);
      button.querySelector('span').textContent = 'Copied';
    } catch {
      window.location.href = `tel:${value}`;
    }
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const interest = String(data.get('interest') || '').trim();
  const message = String(data.get('message') || '').trim();

  if (!name || !email || !interest || !message) {
    if (statusNode) statusNode.textContent = 'Please complete all fields before sending.';
    return;
  }

  const subject = encodeURIComponent(`Euro-Fish Inquiry: ${interest}`);
  const body = encodeURIComponent(
    `Full name: ${name}\nEmail: ${email}\nInterested in: ${interest}\n\nMessage:\n${message}`
  );

  if (statusNode) statusNode.textContent = 'Opening your email app with the inquiry details.';
  window.location.href = `mailto:joevyrosario@gmail.com?subject=${subject}&body=${body}`;
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
      links.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0.01 });

  sections.forEach((section) => activeObserver.observe(section));
}

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  header?.classList.toggle('is-scrolled', current > 12);
}, { passive: true });
