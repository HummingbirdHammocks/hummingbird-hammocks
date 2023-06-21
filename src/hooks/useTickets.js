import { useQuery } from '@tanstack/react-query';

import { getUserTickets } from '../utils';

const getTickets = async (email) => {
  const data = await getUserTickets(email);

  if (data.data?._embedded?.conversations) {
    return data.data._embedded.conversations;
  }
};

export function useTickets(email) {
  return useQuery(
    ['tickets', email],
    () => getTickets(email),
    { staleTime: 1000 * 600 },
    { enabled: !!email }
  );
}
