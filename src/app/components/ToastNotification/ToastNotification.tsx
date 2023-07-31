'use client';
import React, { useEffect } from 'react';

import { fetchCreateDevice } from '@/lib/api';
import localforage from 'localforage';
import { CreateDevice } from '@/types/devices';
import { useUser } from '@auth0/nextjs-auth0/client';
import { firebaseCloudMessaging } from '@/lib/firebase';
import { toast } from 'react-toastify';
import { Button, Typography } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

interface DogTableProps {
  token: string;
}

const ToastNotification = ({ token }: DogTableProps) => {
  const ShowNotification = () => {
    const handleClick = () => {
      Notification.requestPermission().then(async () => {
        await firebaseCloudMessaging.getTokenMessaging();
        await sendDeviceToken();
      });
    };
    return (
      <div>
        <Typography>Show notification??</Typography>
        <Button onClick={handleClick}>show notification</Button>
      </div>
    );
  };

  const { user } = useUser();

  const sendDeviceToken = async () => {
    const deviceToken = await localforage.getItem('fcm_token');
    if (deviceToken) {
      const device: CreateDevice = {
        user: user?.email as string,
        token: deviceToken as string,
      };
      await fetchCreateDevice(device, token);
    }
  };

  const isSafariBrowser = () => {
    const userAgent = navigator.userAgent;
    return userAgent.includes('Safari') && !userAgent.includes('Chrome');
  };

  const showNotification = async () => {
    const deviceToken = await localforage.getItem('fcm_token');
    if (!deviceToken && isSafariBrowser()) {
      toast(<ShowNotification />, {
        closeOnClick: false,
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    if (user?.email) {
      sendDeviceToken();
    }
  }, [user?.email]);

  useEffect(() => {
    showNotification();
  }, []);

  return <></>;
};

export default ToastNotification;
