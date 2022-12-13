import makeStore from './makeStore'
import { toast } from 'react-toastify';

const initialState = {
    customerAccessToken: null,
    user: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "setCustomerAccessToken":
            return {
                ...state,
                customerAccessToken: action.customerAccessToken,
            };
        case "setUser":
            return {
                ...state,
                user: action.user,
            };
        case "setLogout":
            toast.success("Logged Out")
            return {
                ...state,
                customerAccessToken: null,
                user: null
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