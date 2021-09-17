import * as storage from './storage'
import {TOKEN_CONSTANT} from './constant'
import Err from './error'
import getAccessToken from './token'
import Cookies from 'js-cookie'

const Sdk = function () {

}

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
    if (data.clientId == null) {
        throw Err("INVALID_CONFIG", "You need to define `clientId` for sdk.login()")
    }
    storage.setItem(TOKEN_CONSTANT.CLIENT_ID, data.clientId)
    const search = window.location.search
    const fragment = window.location.hash
    const jsonFragment = toJSON(fragment)
    const loginTemp = storage.getItem(TOKEN_CONSTANT.LOGIN_TMP)
    if (Cookies.get(TOKEN_CONSTANT.EXPIRES) == null) {
        storage.removeItem(TOKEN_CONSTANT.ACCESS_TOKEN)
    }
    if (jsonFragment.access_token != null) {
        console.log("have access token in fragment")
        storage.setItem(TOKEN_CONSTANT.ACCESS_TOKEN, jsonFragment.access_token)
    } else if (loginTemp != null) {
        console.log("have login temp")
        if (search != null) {
            console.log("case callback from auth code")
            console.log("search")
            const json = toJSON(search)
            console.log(json)
            const state = storage.getItem(TOKEN_CONSTANT.LOGIN_STATE)
            if (json.state !== state) {
                console.error("detect csrf, invalid state")
                return
            }
            const clientId = storage.getItem(TOKEN_CONSTANT.CLIENT_ID)
            const res = await getAccessToken(json.code, clientId, loginTemp.codeVerifier)
            storage.setItem(TOKEN_CONSTANT.ACCESS_TOKEN, res.access_token)
            const expiresAt = new Date(res.expires_at * 1000)
            Cookies.set(TOKEN_CONSTANT.EXPIRES, res.expires_at, {expires: expiresAt, path: '/'})
            storage.removeItem(TOKEN_CONSTANT.LOGIN_TMP)
        }
    }
}

const clean = () => {
    Object.keys(TOKEN_CONSTANT).forEach((key) => {
        storage.removeItem(TOKEN_CONSTANT[key])
    })
    Cookies.remove(TOKEN_CONSTANT.EXPIRES)
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
    const accessToken = storage.getItem(TOKEN_CONSTANT.ACCESS_TOKEN)
    if (accessToken === null) {
        return false
    } else {
        return true
    }
}

const sdk = new Sdk()
export default sdk.init
export {isLoggedIn, clean}
