let deferredPrompt = null;

const installBtn = document.getElementById('installBtn');
const installHint = document.getElementById('installHint');
const enterBtn = document.getElementById('enterBtn');
const backBtn = document.getElementById('backBtn');
const nameInput = document.getElementById('name');
const loginCard = document.getElementById('loginCard');
const roomCard = document.getElementById('roomCard');
const welcome = document.getElementById('welcome');
const status = document.getElementById('status');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.classList.remove('hidden');
  installHint.textContent = 'يمكنك تثبيت صوتنا كتطبيق مستقل على الهاتف.';
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) {
    installHint.textContent = 'إذا لم يظهر التثبيت، افتح قائمة Chrome ⋮ ثم اختر «تثبيت التطبيق».';
    return;
  }
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.classList.add('hidden');
});

window.addEventListener('appinstalled', () => {
  installBtn.classList.add('hidden');
  installHint.textContent = 'تم تثبيت صوتنا على الهاتف ✅';
});

enterBtn.addEventListener('click', () => {
  const name = nameInput.value.trim() || 'زائر';
  welcome.textContent = `أهلًا ${name} 👋`;
  loginCard.classList.add('hidden');
  roomCard.classList.remove('hidden');
  status.innerHTML = '<span class="dot" style="background:#16c27b"></span> جاهز';
});

backBtn.addEventListener('click', () => {
  roomCard.classList.add('hidden');
  loginCard.classList.remove('hidden');
  status.innerHTML = '<span class="dot"></span> غير متصل';
});

document.querySelectorAll('.room').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('roomNotice').textContent =
      `تم اختيار ${btn.dataset.room}. واجهة الغرفة جاهزة، وربط الصوت الجماعي الحقيقي يحتاج خادم WebRTC/إشارة.`;
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(console.error);
  });
}
