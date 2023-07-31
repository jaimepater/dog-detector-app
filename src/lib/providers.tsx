'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import PushNotificationLayout from '@/lib/PushNotificationLayout';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
    <PushNotificationLayout>
      <UserProvider>
        <QueryClientProvider client={client}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </UserProvider>
    </PushNotificationLayout>
  );
}
