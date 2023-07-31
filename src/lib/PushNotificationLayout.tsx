import React, { useEffect } from 'react';
import 'firebase/messaging';
import { ToastContainer } from 'react-toastify';
import { firebaseCloudMessaging } from '@/lib/firebase';
import { getMessaging } from 'firebase/messaging';

interface PushNotificationLayoutProps {
  children: React.ReactNode;
}

function PushNotificationLayout({ children }: PushNotificationLayoutProps) {
  async function setToken() {
    try {
      const token = await firebaseCloudMessaging.init();
      if (token) {
        getMessage();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setToken();
    // Event listener that listens for the push notification event in the background
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('event for the service worker', event);
      });
    }

    // Calls the getMessage() function if the token is there
  });

  // Get the push notification message and triggers a toast to display it
  function getMessage() {
    const messaging = getMessaging();
    console.log('messaging', messaging);
  }

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

export default PushNotificationLayout;
