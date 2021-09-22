import Cookies from "js-cookie";
import {PREFIX} from "./constant";

const get = (clientId, attribute) => {
    const key = `${PREFIX}_${clientId}_${attribute}`
    return Cookies.get(key)
}

const set = (clientId, attribute, value, expires) => {
    const key = `${PREFIX}_${clientId}_${attribute}`
    Cookies.set(key, value, expires)
}

const remove = (clientId, attribute) => {
    const key = `${PREFIX}_${clientId}_${attribute}`
    Cookies.remove(key)
}

export {get, set, remove}