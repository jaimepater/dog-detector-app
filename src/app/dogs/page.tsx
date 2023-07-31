import getQueryClient from '@/lib/get-query-client';
import { dehydrate } from '@tanstack/react-query';
import Hydrate from '@/lib/hydrate-client';
import { fetchDogs } from '@/lib/api';
import { DogsType } from '@/types/dogs';
import DogTable from '@/app/components/DogTable/DogTable';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import ToastNotification from '@/app/components/ToastNotification/ToastNotification';

export default withPageAuthRequired(async function Dogs() {
  const session = await getSession();
  const token = session?.accessToken || '';
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['dog'], () =>
    fetchDogs({ type: DogsType.BIG_DOG }, token),
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ToastNotification token={token} />
      <DogTable token={token} />
    </Hydrate>
  );
});
