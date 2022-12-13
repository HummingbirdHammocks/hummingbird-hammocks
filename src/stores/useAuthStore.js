import makeStore from './makeStore'
import { toast } from 'react-toastify';

const initialState = {
    customerAccessToken: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "setCustomerAccessToken":
            return {
                ...state,
                customerAccessToken: action.customerAccessToken,
            };
        case "setLogout":
            toast.success("Logged Out")
            return {
                ...state,
                customerAccessToken: null,
            };
        default:
            throw new Error("Unknown action!"/*  + action */);
    }
};

const [
    AuthProvider,
    useAuthDispatch,
    useAuthStore
] = makeStore(reducer, initialState, "authStore")

export { AuthProvider, useAuthDispatch, useAuthStore }