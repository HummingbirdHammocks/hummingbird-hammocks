import { useQuery } from '@tanstack/react-query';
//firebase
import {
  findInCollection
  /* , deleteDocument  */
} from 'utils/firebase';

const getNotifications = async (email) => {
  if (!email || email === '' || email === undefined) return null;

  const data = await findInCollection('bargain_bin_notifications', 'email', email);

  return data;
};

/* const deleteNotification = async (id) => {

    const res = await deleteDocument("restock_notifications", id)

    return res;
}; */

export default function useBargainBinNotifications(email) {
  return useQuery(
    ['bargain_bin_notifications', email],
    () => getNotifications(email),
    { staleTime: 1000 * 600 },
    { enabled: !!email }
  );
}
