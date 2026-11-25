const stateButtons = document.querySelectorAll('[data-state]');
const stateNote = document.querySelector('#state-note');

for (const button of stateButtons) {
  button.addEventListener('click', () => {
    for (const state of stateButtons) {
      state.setAttribute('aria-pressed', String(state === button));
    }
    stateNote.textContent = button.dataset.state;
  });
}

const form = document.querySelector('#checkout');
const terms = document.querySelector('#test-terms');

form.querySelector('a[href="#test-terms"]').addEventListener('click', () => {
  terms.open = true;
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const scenario = document.querySelector('#test-scenario').value;
  const order = {
    id: 'TEST-' + crypto.getRandomValues(new Uint32Array(1))[0].toString(16).toUpperCase().padStart(8, '0'),
    email: document.querySelector('#order-email').value.trim(),
    scenario,
    readyAt: Date.now() + (scenario === 'processing' ? 12000 : 1000),
  };

  try {
    sessionStorage.setItem('ekvip-demo-order', JSON.stringify(order));
  } catch {
    document.querySelector('#test-notice').textContent = 'This demo needs browser session storage. Enable it and try again.';
    return;
  }

  window.location.assign('confirmation.html');
});
