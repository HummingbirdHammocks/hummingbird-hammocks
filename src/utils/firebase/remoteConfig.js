import { remoteConfig } from './firebase-config';
import { fetchAndActivate, getValue } from "firebase/remote-config";

export function fetchConfig() {

    return fetchAndActivate(remoteConfig())
        .then((response) => {
            console.log(response)
            return response
        })
        .catch((error) => {
            console.log(error)
            return false
        });
}

export async function getRemoteValue(value) {
    fetchConfig();

    if (remoteConfig()) {
        return await getValue(remoteConfig(), value)
    }
}