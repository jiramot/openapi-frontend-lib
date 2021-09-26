import * as storage from './storage'
import {getOpenApiUrl, getUrl, OPEN_API_CONSTANT, TOKEN_CONSTANT, URL_CONSTANT} from './constant'
import Err from './error'
import getAccessToken from './token'
import * as cookie from './cookie'
import sha256 from "crypto-js/sha256";
import fetch from "isomorphic-fetch";
import Base64 from "crypto-js/enc-base64";

const Sdk = function () {
}

let clientId = ""

Sdk.prototype = {
    init: function () {
        const sdk1 = async function (data) {
            console.log("init with promise")
            await initContext(data)
        }

        const sdk2 = async function (data, resolve, reject) {
            console.log("init with callback")
            try {
                await initContext(data)
            } catch (err) {
                reject(err)
            } finally {
                resolve()
            }
        }

        if (arguments.length === 1) {
            return sdk1(arguments[0])
        } else {
            return sdk2(arguments[0], arguments[1], arguments[2])
        }
    }
}

const initContext = async (data) => {
    console.log("init data")
    clientId = data.clientId;

    if (clientId == null) {
        throw Err("INVALID_CONFIG", "You need to define `clientId` for sdk.login()")
    }
    storage.setItem(clientId, TOKEN_CONSTANT.CLIENT_ID, clientId)
    const search = window.location.search
    const fragment = window.location.hash
    const jsonFragment = toJSON(fragment)
    const loginTemp = storage.getItem(clientId, TOKEN_CONSTANT.LOGIN_TMP)

    if (cookie.get(clientId, TOKEN_CONSTANT.EXPIRES) == null) {
        storage.removeItem(clientId, TOKEN_CONSTANT.ACCESS_TOKEN)
    }
    if (jsonFragment.access_token != null && isInClient()) {
        console.log("have access token in fragment")
        storage.setItem(clientId, TOKEN_CONSTANT.ACCESS_TOKEN, jsonFragment.access_token)
    } else if (loginTemp != null) {
        console.log("have login temp")
        if (search != null) {
            console.log("case callback from auth code")
            console.log("search")
            const json = toJSON(search)
            console.log(json)
            const state = storage.getItem(clientId, TOKEN_CONSTANT.LOGIN_STATE)
            if (json.state !== state) {
                console.error("detect csrf, invalid state")
                return
            }
            const res = await getAccessToken(json.code, clientId, loginTemp.codeVerifier)
            storage.setItem(clientId, TOKEN_CONSTANT.ACCESS_TOKEN, res.access_token)
            const expiresAt = new Date(res.expires_at * 1000)
            cookie.set(clientId, TOKEN_CONSTANT.EXPIRES, res.expires_at, {expires: expiresAt, path: '/'})
            storage.removeItem(clientId, TOKEN_CONSTANT.LOGIN_TMP)
        }
    }
}

const clean = () => {
    Object.keys(TOKEN_CONSTANT).forEach((key) => {
        storage.removeItem(clientId, TOKEN_CONSTANT[key])
    })
    cookie.remove(clientId, TOKEN_CONSTANT.EXPIRES)

}

const toJSON = (query) => {
    const pairs = query.slice(1).split('&')
    const result = {};
    pairs.forEach(function (pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}
const isLoggedIn = () => {
    const accessToken = storage.getItem(clientId, TOKEN_CONSTANT.ACCESS_TOKEN)
    if (accessToken === null) {
        return false
    } else {
        return true
    }
}
const login = async () => {
    console.log('login')
    const codeVerifier = generateRandomString(43)
    const state = generateRandomString(12)
    const codeChallenge = base64UrlEncode(sha256(codeVerifier))

    storage.setItem(clientId, TOKEN_CONSTANT.LOGIN_TMP, {codeVerifier: codeVerifier})
    storage.setItem(clientId, TOKEN_CONSTANT.LOGIN_STATE, state)
    console.log(`code_verifier=${codeVerifier}, code_charlenge=${codeChallenge}`)
    const query = new URLSearchParams({
        "response_type": "code",
        "client_id": clientId,
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

const getProfile = async () => {
    const accessToken = storage.getItem(clientId, TOKEN_CONSTANT.ACCESS_TOKEN)
    const authorizationHeader = `Bearer ${accessToken}`
    const url = getOpenApiUrl(OPEN_API_CONSTANT.PROFILE);
    console.log(url)
    const response = await fetch(url,
        {
            method: 'GET',
            headers: {
                Authorization: authorizationHeader
            }
        })
    const data = await response.json()
    console.log(data)
    return data
}

const getClientId = () => {
    return clientId
}

const isInClient = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    return /authz/.test(userAgent)
}

const sdk = new Sdk()
export default sdk.init
export {isLoggedIn, clean, login, getProfile, getClientId, isInClient}
