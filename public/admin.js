const KEY = 'eurofish_inquiries_v2';
const rows = document.querySelector('[data-rows]');
const total = document.querySelector('[data-total]');
const fresh = document.querySelector('[data-new]');
const exportButton = document.querySelector('[data-export]');
const clearButton = document.querySelector('[data-clear]');

function readInquiries() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

function safe(value) {
  return String(value || '').replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
}

function render() {
  const data = readInquiries();
  if (total) total.textContent = data.length;
  if (fresh) fresh.textContent = data.filter((item) => (item.status || 'New') === 'New').length;
  if (!rows) return;
  if (!data.length) {
    rows.innerHTML = '<tr><td colspan="6">No local inquiries yet.</td></tr>';
    return;
  }
  rows.innerHTML = data.map((item) => `
    <tr>
      <td>${safe((item.createdAt || '').slice(0, 10))}</td>
      <td>${safe(item.name)}<br>${safe(item.email)}<br>${safe(item.phone)}</td>
      <td>${safe(item.interest)}</td>
      <td>${safe(item.buyerType)}</td>
      <td>${safe(item.destination)}</td>
      <td>${safe(item.message)}</td>
    </tr>
  `).join('');
}

exportButton?.addEventListener('click', () => {
  const data = readInquiries();
  const header = ['date', 'name', 'email', 'phone', 'buyerType', 'interest', 'destination', 'message'];
  const lines = data.map((item) => header.map((key) => `"${String(item[key] || '').replaceAll('"', '""').replaceAll('\n', ' ')}"`).join(','));
  const blob = new Blob([[header.join(','), ...lines].join('\n')], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'eurofish-inquiries.csv';
  link.click();
  URL.revokeObjectURL(link.href);
});

clearButton?.addEventListener('click', () => {
  localStorage.removeItem(KEY);
  render();
});

render();
