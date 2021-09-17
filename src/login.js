import fetch from 'isomorphic-fetch'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import * as storage from './storage'
import {getUrl, TOKEN_CONSTANT, URL_CONSTANT} from './constant'

const login = async () => {
    console.log('login')
    const codeVerifier = generateRandomString(43)
    const state = generateRandomString(12)
    const codeChallenge = base64UrlEncode(sha256(codeVerifier))

    storage.setItem(TOKEN_CONSTANT.LOGIN_TMP, {codeVerifier: codeVerifier})
    storage.setItem(TOKEN_CONSTANT.LOGIN_STATE, state)
    console.log(`code_verifier=${codeVerifier}, code_charlenge=${codeChallenge}`)
    const query = new URLSearchParams({
        "response_type": "code",
        "client_id": "1234",
        "state": state,
        "code_challenge": codeChallenge,
        "code_challenge_method": "S256"
    }).toString()
    const response = await fetch(getUrl(URL_CONSTANT.AUTH) + "?" + query)
    const data = await response.json()
    const redirectUrl = data.redirect_url
    window.location.href = redirectUrl
}

const base64UrlEncode = (str) => {
    return str
        .toString(Base64)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

const generateRandomString = (length) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export default login