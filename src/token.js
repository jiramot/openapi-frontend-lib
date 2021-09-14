import fetch from "isomorphic-fetch";

const getAccessToken = async (code, clientId, codeVerifier) => {
    const details = {
        grant_type: 'authorization_code',
        client_id: clientId,
        code: code,
        code_verifier: code
    };

    let formBody = [];
    for (const property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const response = await fetch("http://192.168.1.114:8080/oauth2/token?",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
    return await response.json()
}

export default getAccessToken