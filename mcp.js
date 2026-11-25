const purchase = document.querySelector('#purchase');
const summary = document.querySelector('#purchase-summary');
const inlineCheckout = document.querySelector('#inline-checkout');
const dialog = document.querySelector('#checkout-dialog');
const checkout = document.querySelector('#checkout-content');
const heading = document.querySelector('#checkout-heading');
const form = document.querySelector('#checkout');
const checkoutPlan = document.querySelector('#checkout-plan');
const planOptions = document.querySelectorAll('input[name="plan"]');
const preview = document.querySelector('#checkout-preview');
const scenario = document.querySelector('#test-scenario');
const terms = document.querySelector('#test-terms');
const reassurance = document.querySelector('#checkout-reassurance');
const progress = document.querySelector('#payment-progress');
const error = document.querySelector('#checkout-error');
const success = document.querySelector('#checkout-success');
const successTitle = document.querySelector('#success-title');
const installer = document.querySelector('#get-installer');
const installerStatus = document.querySelector('#installer-status');
const buyButtons = [document.querySelector('#buy'), document.querySelector('#mobile-buy')];

let opener;
let openerScroll;
let timer;
let paymentConfirmed = false;
let installerUnavailable = false;

function selectPlan() {
  const yearly = [...planOptions].find(plan => plan.checked).value === 'year';
  checkoutPlan.value = yearly ? 'year' : 'month';
  for (const price of document.querySelectorAll('[data-plan-price]')) {
    price.textContent = yearly ? '€90 / year' : '€9 / month';
  }
}

for (const plan of planOptions) {
  plan.addEventListener('change', selectPlan);
}

checkoutPlan.addEventListener('change', () => {
  for (const plan of planOptions) plan.checked = plan.value === checkoutPlan.value;
  selectPlan();
});

const mobileBar = document.querySelector('.mobile-purchase');
new IntersectionObserver(([entry]) => {
  mobileBar.hidden = entry.isIntersecting;
}, { threshold: 0.25 }).observe(buyButtons[0]);

function openCheckout(event) {
  opener = event.currentTarget;
  openerScroll = window.scrollY;
  checkout.hidden = false;

  if (preview.value === 'popup') {
    dialog.append(checkout);
    dialog.showModal();
    dialog.scrollTop = 0;
  } else {
    inlineCheckout.append(checkout);
    inlineCheckout.hidden = false;
    summary.hidden = true;
    purchase.classList.add('is-expanded');
    purchase.setAttribute('aria-labelledby', paymentConfirmed ? 'success-title' : 'checkout-heading');
    purchase.scrollIntoView({ block: 'start' });
  }

  (paymentConfirmed ? successTitle : heading).focus({ preventScroll: true });
}

for (const button of buyButtons) {
  button.addEventListener('click', openCheckout);
}

function showPaymentError(message) {
  progress.hidden = true;
  form.hidden = false;
  terms.hidden = false;
  reassurance.hidden = false;
  error.hidden = false;
  error.textContent = message;
}

function cancelPayment() {
  window.clearTimeout(timer);
  timer = undefined;
  showPaymentError('Payment cancelled. No charge was made. You can try again.');
}

function restorePurchaseSummary() {
  if (timer !== undefined) cancelPayment();
  checkout.hidden = true;
  inlineCheckout.hidden = true;
  summary.hidden = false;
  purchase.classList.remove('is-expanded');
  purchase.setAttribute('aria-labelledby', 'purchase-title');
  window.scrollTo(0, openerScroll);
  opener.focus({ preventScroll: true });
}

document.querySelector('#close-checkout').addEventListener('click', () => {
  if (dialog.open) dialog.close();
  else restorePurchaseSummary();
});

dialog.addEventListener('close', restorePurchaseSummary);

form.querySelector('a[href="#test-terms"]').addEventListener('click', () => {
  terms.open = true;
});

document.querySelector('#cancel-payment').addEventListener('click', () => {
  cancelPayment();
  form.querySelector('button[type="submit"]').focus();
});

function completePayment(outcome) {
  timer = undefined;
  if (outcome === 'failed' || outcome === 'cancelled') {
    const cancelled = outcome === 'cancelled';
    showPaymentError(cancelled
      ? 'Payment cancelled. No charge was made. You can try again.'
      : 'The test payment was declined. No charge was made. Choose a different test outcome to retry.');
    form.querySelector('button[type="submit"]').focus();
    return;
  }

  paymentConfirmed = true;
  installerUnavailable = outcome === 'unavailable';
  progress.hidden = true;
  success.hidden = false;
  heading.hidden = true;
  document.querySelector('#checkout-header-title').textContent = 'ORDER CONFIRMATION';
  dialog.setAttribute('aria-labelledby', 'success-title');
  if (!dialog.open) purchase.setAttribute('aria-labelledby', 'success-title');
  document.querySelector('#checkout-order').textContent =
    'TEST-' + crypto.getRandomValues(new Uint32Array(1))[0].toString(16).toUpperCase().padStart(8, '0');
  document.querySelector('#receipt-status').textContent = outcome === 'email-pending'
    ? 'Test email delivery is pending. You can download now.'
    : 'In live checkout, your receipt and backup download link will be emailed to ' + document.querySelector('#order-email').value.trim() + '. No email was sent in this test.';
  for (const button of buyButtons) button.textContent = 'View order & download';
  for (const plan of planOptions) plan.disabled = true;
  if (installerUnavailable) {
    installer.textContent = 'Retry download';
    installerStatus.textContent = 'The test download is temporarily unavailable. You can retry now.';
  }
  successTitle.focus();
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (timer !== undefined || paymentConfirmed) return;

  const outcome = scenario.value;
  error.hidden = true;
  form.hidden = true;
  terms.hidden = true;
  reassurance.hidden = true;
  progress.hidden = false;
  heading.focus();
  timer = window.setTimeout(() => completePayment(outcome), outcome === 'processing' ? 9000 : 850);
});

installer.addEventListener('click', () => {
  if (!paymentConfirmed) return;
  if (installerUnavailable) {
    installerUnavailable = false;
    installer.textContent = 'Download for Windows (.msi) ↓';
  }
  installerStatus.textContent = 'Download simulated. The Windows MSI would start downloading now. No file was sent.';
});

document.querySelector('#inline-recovery').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#recovery-result').textContent =
    'Recovery request simulated. In live checkout, an eligible order would receive a fresh link by email.';
});

selectPlan();
