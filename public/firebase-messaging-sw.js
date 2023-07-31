importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBqxvUCFKJPlzQy89LvR2eTrWaKYOt3kVU',
  authDomain: 'dog-detector-6d0de.firebaseapp.com',
  projectId: 'dog-detector-6d0de',
  storageBucket: 'dog-detector-6d0de.appspot.com',
  messagingSenderId: '862575037985',
  appId: '1:862575037985:web:dd693598c8e3bc0723dd60',
});

const messaging = firebase.messaging();
