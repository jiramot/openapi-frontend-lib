import _ from "lodash"

const setItem = (clientId, attribute, value) => {
    if (!_.isString()) {
        value = JSON.stringify(value)
    }
    const key = `SDK:${clientId}:${attribute}`
    window.localStorage.setItem(key, value)
}

const getItem = (clientId, attribute) => {
    const key = `SDK:${clientId}:${attribute}`
    let value = window.localStorage.getItem(key)
    if (!_.isString()) {
        value = JSON.parse(value)
    }
    return value
}
const removeItem = (clientId, attribute) => {
    const key = `SDK:${clientId}:${attribute}`
    window.localStorage.removeItem(key)
}
const clear = () => {
    window.localStorage.clear()
}

export {setItem, getItem, removeItem, clear}