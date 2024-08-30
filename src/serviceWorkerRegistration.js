import Swal from 'sweetalert2';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] IPv6 localhost manzili.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 IPv4 uchun localhost hisoblanadi.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // URL konstruktor barcha SW qo'llab-quvvatlaydigan brauzerlarda mavjud.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Agar PUBLIC_URL boshqa kelib chiqish manzilida bo'lsa, bizning service worker ishlamaydi
      // Bu CDN ishlatilishi mumkin; https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Bu localhost-da ishlamoqda. Service worker hali mavjud yoki yo'qligini tekshiramiz.
        checkValidServiceWorker(swUrl, config);

        // Localhost-da qo'shimcha log qo'shamiz, ishlab chiquvchilarga
        // service worker/PWA hujjatiga yo'naltirib.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Ushbu veb-ilova service worker tomonidan cache-first usulda taqdim etilmoqda.'
          );
        });
      } else {
        // Localhost emas. Faqat service workerni ro'yxatdan o'tkazamiz
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Hozirda yangilangan precached kontent olinmoqda,
              // lekin avvalgi service worker eski kontentni taqdim etishda davom etadi
              console.log(
                'Yangi kontent mavjud va barcha ' +
                  'bu sahifa uchun tablar yopilganda ishlatiladi.'
              );

              // Callbackni bajarish
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // Hozirda hamma narsalar precached.
              // Offline rejimda ishlash uchun "Kontent cache-da saqlangan" xabarini ko'rsatish uchun mukammal vaqt.
              console.log('Kontent offline ishlash uchun saqlangan.');

              Swal.fire({
                toast: 'true',
                position: 'bottom',
                icon: 'success',
                title: 'Ilova offline ishlash uchun tayyor.',
                showConfirmButton: false,
                timer: 6000
              });

              // Callbackni bajarish
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Service worker ro\'yxatdan o\'tishda xato:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Service worker mavjudligini tekshirish. Agar topilmasa, sahifani yangilang.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' }
  })
    .then(response => {
      // Service worker mavjudligini va biz haqiqatan ham JS faylini olayotganimizni tekshiring.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Service worker topilmadi. Ehtimol, boshqa ilova. Sahifani yangilang.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker topildi. Normal holatda davom eting.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'Internet ulanishi topilmadi. Ilova offline rejimda ishlamoqda.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}
