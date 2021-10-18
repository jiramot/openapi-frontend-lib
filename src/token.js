import fetch from "isomorphic-fetch";
import {getUrl, URL_CONSTANT} from "./constant";

const getToken = async (code, clientId, codeVerifier) => {
    const details = {
        grant_type: 'authorization_code',
        client_id: clientId,
        code: code,
        code_verifier: codeVerifier
    };

    let formBody = [];
    for (const property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const response = await fetch(getUrl(URL_CONSTANT.TOKEN),
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
    return await response.json()
}

export default getToken