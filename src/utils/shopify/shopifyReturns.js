import axios from "axios";
import { toast } from "react-toastify";

export const getReturnEligible = async ({ order, overrideDate }) => {
    if (!order) return null;

    const timestamp = new Date().getTime() + (90 * 24 * 60 * 60 * 1000)

    const url = process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/shopifyAdmin/check_return_eligible';

    if (Date.parse(order.node.createdAt) > timestamp || overrideDate) {
        return await axios.post(url, { orderId: order.node.id })
            .then((res) => {
                if (res.data) {
                    return res;
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error getting order return elgibility, please try again")
            });
    } else {
        return null;
    }
};