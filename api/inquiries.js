export function validateInquiry(body = {}) {
  const required = ['name', 'email', 'buyerType', 'interest', 'message'];
  const missing = required.filter((key) => !String(body[key] || '').trim());
  return { ok: missing.length === 0, missing };
}

export function normalizeInquiry(body = {}) {
  const clean = (value) => String(value || '').trim().slice(0, 2000);
  return {
    name: clean(body.name),
    email: clean(body.email),
    phone: clean(body.phone),
    buyerType: clean(body.buyerType),
    interest: clean(body.interest),
    targetDate: clean(body.targetDate),
    destination: clean(body.destination),
    message: clean(body.message),
    source: clean(body.source),
    status: 'New',
    createdAt: new Date().toISOString()
  };
}
