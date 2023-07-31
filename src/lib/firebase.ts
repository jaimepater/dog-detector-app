import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import localforage from 'localforage';

const getTokenMessaging = async () => {
  const messaging = getMessaging();
  const fcm_token = await getToken(messaging);

  // Set token in our local storage
  if (fcm_token) {
    localforage.setItem('fcm_token', fcm_token);
    return fcm_token;
  }
};

const firebaseCloudMessaging = {
  init: async () => {
    // Initialize the Firebase app with the credentials
    initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    });

    try {
      // Request the push notification permission from browser
      const status = await Notification.requestPermission(() => {});
      if (status && status === 'granted') {
        // Get new token from Firebase
        return getTokenMessaging();
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getTokenMessaging: getTokenMessaging,
};

export { firebaseCloudMessaging };
