import { toast } from 'react-toastify';
import { remoteConfig } from './firebase-config';
import { fetchAndActivate, getValue } from "firebase/remote-config";

remoteConfig().settings.minimumFetchIntervalMillis = 3600000;
/* remoteConfig.settings.minimumFetchIntervalMillis = 43200000; */

remoteConfig().defaultConfig = {
    "top_banner": "{\"description\":\"USPS Service Suspension in select countries. Alternate shipping service is recommended\",\"buttonText\":\"CURRENT SUSPENSION LIST\",\"buttonLink\":\"https://about.usps.com/newsroom/service-alerts/international/?utm_source\u003dresidential\u0026utm_medium\u003dlink\u0026utm_campaign\u003dres_to_intl\"}"
}

export function fetchConfig() {

    return fetchAndActivate(remoteConfig())
        .then((response) => {
            console.log(response)
            return response
        })
        .catch((error) => {
            console.log(error)
            toast.error(error.message)
            return false
        });
}

export async function getRemoteValue(value) {
    if (remoteConfig()) {
        return await getValue(remoteConfig(), value)
    }
}