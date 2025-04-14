importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyD0Z911mOoWCVkeGdjhIKwWFPRgvd6ZyAw",
  authDomain: "blinkpick-by-mdev-team.firebaseapp.com",
  databaseURL: "https://blinkpick-by-mdev-team-default-rtdb.firebaseio.com",
  projectId: "blinkpick-by-mdev-team",
  storageBucket: "blinkpick-by-mdev-team.firebasestorage.app",
  messagingSenderId: "559682777044",
  appId: "1:559682777044:web:d8bc7ab8dbc9991c8f1ec2",
  measurementId: "G-4PYH3B1XRD"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});