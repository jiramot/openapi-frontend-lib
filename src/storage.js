import _ from "lodash"
import {isInClient} from "./sdk";

const setItem = (clientId, attribute, value) => {
    if (!_.isString()) {
        value = JSON.stringify(value)
    }
    const key = `SDK:${clientId}:${attribute}`
    console.log("SET " + key)
    if (!isInClient()) {
        window.localStorage.setItem(key, value)
    } else {
        window.sessionStorage.setItem(key, value)
    }
}

const getItem = (clientId, attribute) => {
    const key = `SDK:${clientId}:${attribute}`
    console.log("GET " + key)
    let value = ""
    if (!isInClient()) {
        value = window.localStorage.getItem(key)
    } else {
        value = window.sessionStorage.getItem(key)
    }
    if (!_.isString()) {
        value = JSON.parse(value)
    }
    return value
}
const removeItem = (clientId, attribute) => {
    const key = `SDK:${clientId}:${attribute}`
    if (!isInClient()) {
        window.localStorage.removeItem(key)
    } else {
        window.sessionStorage.removeItem(key)
    }
}
const clear = () => {
    if (!isInClient()) {
        window.localStorage.clear()
    } else {
        window.sessionStorage.clear()
    }
}

export {setItem, getItem, removeItem, clear}