'use client';

import { Box, Button } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push('dogs');
    }
  }, [user]);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // This will make it center vertically
      }}
    >
      <Button
        variant="contained"
        color="primary"
        href="/api/auth/login"
        sx={{
          textDecoration: 'none', // To remove underline of anchor tag
          color: 'white',
        }}
      >
        Login
      </Button>
    </Box>
  );
}
