import fetch from 'isomorphic-fetch'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import * as storage from './storage'
import {TOKEN_CONSTANT} from './constant'

const login = async () => {
    debugger;
    console.log('login')
    const codeVerifier = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" // generateRandomString(43)
    const state = generateRandomString(12)
    const codeChallenge = base64UrlEncode(sha256(codeVerifier))

    storage.setItem(TOKEN_CONSTANT.LOGIN_TMP, {codeVerifier: codeVerifier})
    console.log(`code_verifier=${codeVerifier}, code_charlenge=${codeChallenge}`)
    const query = new URLSearchParams({
        "response_type": "code",
        "client_id": "1234",
        "stage": state,
        "code_challenge": codeChallenge,
        "code_challenge_method": "S256"
    }).toString()
    const response = await fetch("http://192.168.1.114:8080/oauth2/auth?" + query)
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