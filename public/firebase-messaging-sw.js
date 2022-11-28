importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyDbL2jAmw98v77opswRU8Pzj3R7Kf_TK4M",
    authDomain: "react-push-notification-441a7.firebaseapp.com",
    projectId: "react-push-notification-441a7",
    storageBucket: "react-push-notification-441a7.appspot.com",
    messagingSenderId: "190288214638",
    appId: "1:190288214638:web:bb2c9a31d2d9bf6271c47f"
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

console.log('inside firebase-messaging')
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});