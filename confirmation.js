const demoStorageKey = 'ekvip-demo-order';
const title = document.querySelector('#order-title');
const message = document.querySelector('#order-message');
const icon = document.querySelector('#status-icon');
const download = document.querySelector('#download');
const downloadAlert = document.querySelector('#download-alert');
const downloadError = document.querySelector('#download-error');
const downloadStatus = document.querySelector('#download-status');
const downloadAgain = document.querySelector('#download-again');
const scenarios = ['success', 'processing', 'failed', 'cancelled', 'unavailable', 'email-pending'];
let order;
let testPaymentConfirmed = false;
let downloadAvailable = true;

try {
  const stored = JSON.parse(sessionStorage.getItem(demoStorageKey));
  if (stored && scenarios.includes(stored.scenario) && /^TEST-[A-F0-9]{8}$/.test(stored.id)
    && typeof stored.email === 'string' && Number.isFinite(stored.readyAt)) {
    order = stored;
  }
} catch {
  // The missing-order view also handles unavailable or invalid demo storage.
}

function showStatus(heading, detail, symbol, tone) {
  title.textContent = heading;
  message.textContent = detail;
  icon.textContent = symbol;
  icon.dataset.tone = tone;
}

function renderOrder() {
  if (!order) {
    showStatus('Order not found', 'Start checkout to create a test order, or use email recovery for a previous purchase.', '?', 'neutral');
    document.querySelector('#return-to-checkout').hidden = false;
    return;
  }

  const remaining = order.readyAt - Date.now();
  if (remaining > 0) {
    showStatus('Payment processing', 'We’re waiting for payment confirmation. This page will update automatically.', '…', 'neutral');
    window.setTimeout(renderOrder, remaining);
    return;
  }

  if (order.scenario === 'failed' || order.scenario === 'cancelled') {
    const failed = order.scenario === 'failed';
    showStatus(
      failed ? 'Payment failed' : 'Payment cancelled',
      failed ? 'Your test payment didn’t go through. Return to checkout to try again.' : 'Checkout was cancelled before payment. You can return whenever you’re ready.',
      failed ? '!' : '–',
      failed ? 'error' : 'neutral'
    );
    document.querySelector('#return-to-checkout').hidden = false;
    return;
  }

  testPaymentConfirmed = true;
  download.href = 'data:text/plain,' + encodeURIComponent(
    'ekvip TwinCAT MCP Server checkout demo. This sample file is not an MSI installer.'
  );
  downloadAvailable = order.scenario !== 'unavailable';
  showStatus('Payment successful', 'Your test order is confirmed. Download the installer to get started on Windows.', '✓', 'success');
  document.querySelector('#paid-actions').hidden = false;
  document.querySelector('#install').hidden = false;
  document.querySelector('#order-summary').hidden = false;
  document.querySelector('#order-id').textContent = order.id;
  document.querySelector('#receipt').textContent = order.scenario === 'email-pending'
    ? 'Test email delivery is pending. You can still download now.'
    : 'Email delivery confirmed in this simulation. In live checkout, the receipt and download link would be emailed to ' + order.email + '.';

  if (!downloadAvailable) {
    download.hidden = true;
    downloadAlert.hidden = false;
    downloadError.textContent = 'Download temporarily unavailable. Retry in a moment or recover the link by email.';
  }
}

// This browser-only demo serves a text fixture. Production must authorize
// the status response and every installer request on the server.
download.addEventListener('click', event => {
  if (!testPaymentConfirmed || !downloadAvailable) {
    event.preventDefault();
    return;
  }

  downloadStatus.textContent = 'Test download requested. If it doesn’t start, download again.';
  downloadAgain.hidden = false;
});

document.querySelector('#retry-download').addEventListener('click', () => {
  if (!testPaymentConfirmed) return;
  downloadAvailable = true;
  download.hidden = false;
  downloadAlert.hidden = true;
  download.focus();
  download.click();
});

downloadAgain.addEventListener('click', () => download.click());

document.querySelector('#recovery-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#recovery-status').textContent =
    'Recovery request simulated. In live checkout, an eligible order would receive a fresh link by email.';
});

renderOrder();
