import { useQuery } from "react-query";
//firebase
import { findInCollection, deleteDocument } from 'utils/firebase';

const getNotifications = async (email) => {

    const data = await findInCollection("restock_notifications", "email", email)

    return data;
};

const deleteNotification = async (id) => {

    const res = await deleteDocument("restock_notifications", id)

    return res;
};

export default function useRestockNotifications(email) {
    return useQuery(
        ["restock_notifications", email],
        () => getNotifications(email),
        { staleTime: 1000 * 600 },
        { enabled: !!email });
}