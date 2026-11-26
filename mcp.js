const hero = document.querySelector('#hero');
const finalDownload = document.querySelector('#final-download');
const downloadBar = document.querySelector('#download-bar');
const feedback = document.querySelector('#download-feedback');
const status = document.querySelector('#download-status');
const announcement = document.querySelector('#download-announcement');

let scheduled = false;
let downloadTrigger;

function updateDownloadBar() {
  const visible = hero.getBoundingClientRect().bottom <= 0
    && finalDownload.getBoundingClientRect().top >= document.documentElement.clientHeight;
  downloadBar.classList.toggle('is-visible', visible);
  downloadBar.inert = !visible;
  scheduled = false;
}

function scheduleUpdate() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(updateDownloadBar);
}

window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
window.addEventListener('pageshow', scheduleUpdate);
new ResizeObserver(scheduleUpdate).observe(document.querySelector('#content'));
updateDownloadBar();

function requestDownload(event) {
  if (!feedback.contains(event.currentTarget)) downloadTrigger = event.currentTarget;
  feedback.hidden = false;
  status.textContent = 'Download simulated. The Windows MSI is not available in this preview.';
  announcement.textContent = status.textContent;
}

for (const button of document.querySelectorAll('[data-download]')) {
  button.addEventListener('click', requestDownload);
}

feedback.querySelector('.feedback-close').addEventListener('click', () => {
  feedback.hidden = true;
  announcement.textContent = '';
  if (downloadTrigger?.getClientRects().length && !downloadTrigger.closest('[inert]')) {
    downloadTrigger.focus({ preventScroll: true });
  }
});

feedback.querySelector('a').addEventListener('click', () => {
  feedback.hidden = true;
  announcement.textContent = '';
});
